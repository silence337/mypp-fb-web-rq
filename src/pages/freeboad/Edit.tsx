import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardForm from '@/components/board/BoardForm';
import type { BoardCreate } from '@/types/boardTypes';
import { useUpdateBoard, useBoard } from '@/hooks/useBoardQuery';
import { Loading } from '@/components/Loading';

const BoardEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // useBoard 훅으로 게시글 데이터를 가져옵니다.
  const { data: board, isLoading, isError } = useBoard(id);
  const { mutate, isPending } = useUpdateBoard();

  const handleSubmit = (data: BoardCreate) => {
    if (!id) return;

    mutate(
      { id, ...data },
      {
        onSuccess: () => {
          alert('게시글이 수정되었습니다.');
          navigate('/FreeBoard');
        },
        onError: (error) => {
          console.error('게시글 수정 실패:', error);
          alert('게시글 수정에 실패했습니다.');
        },
      }
    );
  };

  if (isLoading) return <Loading />;
  if (isError || !board)
    return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <BoardForm
      onSubmit={handleSubmit}
      editValues={board}
      isPending={isPending}
    />
  );
};

export default BoardEdit;
