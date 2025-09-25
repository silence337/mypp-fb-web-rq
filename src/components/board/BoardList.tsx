import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { ListProps } from '@/types/boardTypes';

const List = ({ board, currentPage, listsPerPage }: ListProps) => {
  // sort 순서 변경, 최적화를 위한 useMemo 사용 (메모이제이션)
  const sortedList = useMemo(() => {
    return [...board].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [board]);

  // 글 목록 클라이언트 페이징 처리 , 최적화를 위한 useMemo 사용 (메모이제이션)
  const currentLists = useMemo(() => {
    const indexOfLast = currentPage * listsPerPage;
    const indexOfFirst = indexOfLast - listsPerPage;
    return sortedList.slice(indexOfFirst, indexOfLast);
  }, [sortedList, currentPage, listsPerPage]);

  //console.log(board);

  return (
    <article>
      <header className='board-header'>
        <span>번호</span>
        <span>제목</span>
        <span>작성자</span>
        <span>작성일</span>
      </header>
      <ul className='board-list'>
        {currentLists.map((list, index) => {
          const number =
            board.length - (currentPage - 1) * listsPerPage - index;
          return (
            <li key={index}>
              <span>{number}</span>
              <span>
                <Link to={`/FreeBoard/post/${list.id}`}>
                  <em>{list.title}</em>
                </Link>
              </span>
              <span>{list.author}</span>
              <span>
                {new Date(list.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default List;
