import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardForm from '@/components/board/BoardForm';
import type { BoardWrite } from '@/types/boardTypes';
import { useCreateBoard } from '@/hooks/useBoardQuery';

const BoardCreate = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateBoard();

  const formSubmit = (data: BoardWrite) => {
    mutate(data, {
      onSuccess: () => {
        alert('게시글이 등록되었습니다.');
        navigate('/FreeBoard');
      },
      onError: (error) => {
        console.error('게시글 등록 실패:', error);
        alert('게시글 등록에 실패했습니다.');
      },
    });
  };

  return <BoardForm onSubmit={formSubmit} isPending={isPending} />;
};

export default BoardCreate;
