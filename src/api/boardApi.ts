import { db, auth } from '@/firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import type { BoardItem, BoardCreate, BoardUpdate } from '@/types/boardTypes';

//게시글 리스트
export const fetchBoardList = async (): Promise<BoardItem[]> => {
  const q = query(collection(db, 'board'), orderBy('createdAt', 'desc')); // date 유형을 timestamp 로 변경해야함.또는 timestamp 필드로~
  const docSnapshot = await getDocs(q);

  return docSnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id,
      title: docData.title || '',
      content: docData.content || '',
      author: docData.author || '',
      createdAt:
        docData.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
    } as BoardItem;
  });
};

//게시글 상세
export const fetchBoardById = async (id: string): Promise<BoardItem> => {
  const boardDoc = doc(db, 'board', id);
  const docSnapshot = await getDoc(boardDoc);
  if (docSnapshot.exists()) {
    // exists = db 에 존재하는지 여부 확인하는것.
    return {
      ...docSnapshot.data(),
      id: docSnapshot.id,
      createdAt:
        docSnapshot.data().createdAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        docSnapshot.data().updatedAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
    } as BoardItem;
  } else {
    throw new Error('게시글을 찾을 수 없습니다.');
  }
};

//게시글 쓰기
export const createBoard = async (
  newBoard: BoardCreate
): Promise<BoardItem> => {
  const user = auth.currentUser; // Firebase 에서 현재 로그인 유저 가져오기

  const docRef = await addDoc(collection(db, 'board'), {
    ...newBoard,
    author: user?.displayName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const docSnapshot = await getDoc(docRef);
  return {
    ...docSnapshot.data(),
    id: docSnapshot.id,
  } as BoardItem;
};

//게시글 수정
export const updateBoard = async (
  updatedBoard: BoardUpdate
): Promise<BoardItem> => {
  const boardDoc = doc(db, 'board', updatedBoard.id);
  await updateDoc(boardDoc, {
    ...updatedBoard,
    updatedAt: serverTimestamp(),
  });
  const docSnapshot = await getDoc(boardDoc);
  return {
    ...docSnapshot.data(),
    id: docSnapshot.id,
  } as BoardItem;
};

//게시글 삭제
export const deleteBoard = async (id: string): Promise<{ id: string }> => {
  const boardDoc = doc(db, 'board', id);
  await deleteDoc(boardDoc);
  return { id };
};
