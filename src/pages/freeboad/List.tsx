import React from 'react';
import { useSearchParams } from 'react-router-dom';
import List from '@/components/board/BoardList';
import Pagination from '@/components/board/Pagination';
import { useBoardList } from '@/hooks/useBoardQuery';
import { Loading } from '@/components/Loading';

const FreeBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');
  const listsPerPage = 10; // 페이지당 항목 수를 상수로 정의하거나 다른 방식으로 관리

  const { data: boards, isLoading, isError } = useBoardList();

  console.log(boards);

  const onPageChange = (pageNum: number) => {
    // uri에 페이징 쿼리 파라미터 추가
    setSearchParams({ page: pageNum.toString() });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <>
      <List
        board={boards || []}
        currentPage={currentPage}
        listsPerPage={listsPerPage}
      />
      <Pagination
        totalItems={boards?.length || 0}
        itemsPerPage={listsPerPage}
        currentPage={currentPage}
        pageLimit={5}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default FreeBoard;
