import React from 'react';
import { useParams } from 'react-router-dom';
import BoardDetail from '@/components/board/BoardDetail';
import { useBoard } from '@/hooks/useBoardQuery';
import { Loading } from '@/components/Loading';

const FreeBoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: board, isLoading, isError, error } = useBoard(id);

  if (isLoading) return <Loading />;

  if (isError) {
    console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
    return <p>게시글을 불러오는 중 오류가 발생했습니다.</p>;
  }

  if (!board) return <p>게시글이 존재하지 않습니다.</p>;
  return <BoardDetail boardView={board} />;
};

export default FreeBoardDetail;
