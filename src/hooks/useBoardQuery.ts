import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { BoardWrite, BoardItem, BoardUpdate } from '@/types/boardTypes';
import {
  fetchBoardList,
  fetchBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from '@/api/boardApi';

/** hook
 * useQuery : 데이터 조회 - 서버에 데이터를 가져오고, 캐시에 저장. (상태관리- loading/error/data)
 *    - queryKey : 배열로 지정하며 해당 값을 기반으로 캐싱
 *    - queryFn  : promise 를 반환하는 함수를 넣어야함.
 *    - staleTime : 1000 * 60 - 최신(fresh) 상태의 데이터가 오래된(stale) 상태의 데이터로 간주되는 시간
 *
 * useMutation : 데이터 변경 - 서버에 데이터를 변경 후 캐시에 저장.
 * setQueryData : 클라이언트 캐시
 * invalidateQueries : 서버 데이터 재요청
 *
 *
 */

export const useBoardList = () => {
  return useQuery<BoardItem[]>({
    queryKey: ['boards'],
    queryFn: fetchBoardList,
    staleTime: 1000 * 60, // 기본적으로 queryClient.ts 의 defaultOptions 으로도 적용해둠.
  });
};

export const useBoard = (id: string | undefined) => {
  return useQuery<BoardItem>({
    queryKey: ['board', id],
    queryFn: () => fetchBoardById(id!),
    enabled: !!id, // id 값이 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 상세 페이지는 5분으로 설정
    //만약에 게시글을 수정하여 invalidateQueries 로 동기화를 하게되면 staleTime 의 남은 시간은 리셋되어 다시 시작됨.
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  // useMutation 타입 <BoardItem:서버 반환데이터, Error, BoardCreate: newBoard로 넘기는 입력데이터>
  return useMutation<BoardItem, Error, BoardWrite>({
    mutationFn: createBoard,
    onSuccess: (newBoard) => {
      // 리스트 캐시에 반영
      queryClient.setQueryData<BoardItem[]>(['boards'], (old) =>
        old ? [newBoard, ...old] : [newBoard]
      );
      // 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });
};

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation<BoardItem, Error, BoardUpdate>({
    mutationFn: updateBoard,
    onSuccess: (updatedBoard) => {
      // 게시글 수정 캐시 업데이트
      queryClient.setQueryData<BoardItem>(
        ['board', updatedBoard.id],
        updatedBoard
      );
      // 리스트 캐시 업데이트
      queryClient.setQueryData<BoardItem[]>(['boards'], (old) =>
        old ? old.map((b) => (b.id === updatedBoard.id ? updatedBoard : b)) : []
      );

      //서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      queryClient.invalidateQueries({ queryKey: ['board', updatedBoard.id] });
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: ({ id }) => {
      // 리스트 캐시에서 제거
      queryClient.setQueryData<BoardItem[]>(['boards'], (old) =>
        old ? old.filter((b) => b.id !== id) : []
      );
      // 단건 캐시 제거
      queryClient.removeQueries({ queryKey: ['board', id] });

      //서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });
};
