import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import type { FormValues } from '@/types/formTypes';
import type { AuthUser, AuthUserLogin } from '@/types/authTypes';

// 계정생성
export const signUp = async (data: FormValues): Promise<AuthUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredential.user;

  await Promise.all([
    updateProfile(user, { displayName: data.displayName }),
    setDoc(doc(db, 'users', user.uid), {
      displayName: data.displayName,
      displayNameLower: data.displayName.toLowerCase(),
      email: data.email,
      createdAt: serverTimestamp(),
    }),
  ]);

  return {
    uid: user.uid,
    email: user.email,
    displayName: data.displayName,
  };
};

// 로그인
export const userLogin = async (data: AuthUserLogin): Promise<AuthUser> => {
  await setPersistence(auth, browserLocalPersistence);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const user = userCredential.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};

// 로그아웃
export const userLogout = async (): Promise<void> => {
  await auth.signOut();
};

// 회원탈퇴
export const deleteCurrentUser = async (password: string): Promise<void> => {
  const user = auth.currentUser;

  if (user && user.email) {
    // 사용자 인증
    const credential = EmailAuthProvider.credential(user.email, password);
    // 자격 증명
    await reauthenticateWithCredential(user, credential);

    // 삭제
    await deleteDoc(doc(db, 'users', user.uid)); // firestore DB 에서도 삭제
    await deleteUser(user); // Auth user 삭제
  }
};
