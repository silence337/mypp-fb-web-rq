import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ViewProps } from '@/types/boardTypes';
//import { useCurrentUser } from '@/hooks/useAuthQuery';
import { useDeleteBoard } from '@/hooks/useBoardQuery';
import { useAuthStore } from '@/store/authStore';

const BoardDetail = ({ boardView }: ViewProps) => {
  const navigate = useNavigate();
  //const { data: user } = useCurrentUser();
  const user = useAuthStore((state) => state.user);
  const deleteMutation = useDeleteBoard();

  const isAuthor = boardView && user && boardView.author === user.displayName;

  // 게시판 수정
  const editPage = (boardId: string) => {
    if (!boardId) return;
    navigate(`/FreeBoard/edit/${boardId}`);
  };

  // 게시판 삭제
  const deletePage = (boardId: string) => {
    if (!boardId) return;

    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;

    deleteMutation.mutate(boardId, {
      onSuccess: () => {
        alert('게시글이 삭제되었습니다.');
        navigate('/FreeBoard');
      },
      onError: (error) => {
        console.error('삭제 실패:', error);
        alert('게시글 삭제에 실패했습니다.');
      },
    });
  };

  if (!boardView) return <p>게시글이 없습니다.</p>;
  return (
    <article className=''>
      <ul className='board-detail'>
        <li>
          <strong>제목</strong>
          <span>{boardView.title}</span>
        </li>
        <li>
          <strong>작성자</strong>
          <span>{boardView.author}</span>
        </li>
        <li>
          <strong>날짜</strong>
          <span>{new Date(boardView.createdAt).toLocaleString()}</span>
        </li>
        <li>
          <strong>내용</strong>
          <span className='content'>{boardView.content}</span>
        </li>
      </ul>
      {isAuthor && (
        <div>
          <button type='button' onClick={() => editPage(boardView.id)}>
            수정
          </button>
          <button
            type='button'
            onClick={() => deletePage(boardView.id)}
            disabled={deleteMutation.isPending}
          >
            삭제
          </button>
        </div>
      )}
    </article>
  );
};

export default BoardDetail;
