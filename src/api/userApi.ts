import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import type { AuthUser } from '@/types/authTypes';

export const fetchUser = async (uid: string): Promise<AuthUser | null> => {
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    return {
      uid: docSnap.id,
      email: userData.email,
      displayName: userData.displayName,
    } as AuthUser;
  } else {
    console.error(uid);
    return null;
  }
};
