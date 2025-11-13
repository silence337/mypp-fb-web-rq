export interface BoardItem {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ListProps {
  board: BoardItem[];
  currentPage: number;
  listsPerPage: number;
}

export interface ViewProps {
  boardView: BoardItem | null;
}

export interface PaginationProps {
  totalItems: number; // 전체 글 개수
  itemsPerPage: number; // 페이지당 글 수
  currentPage: number; // 현재 페이지
  pageLimit?: number;
  onPageChange: (page: number) => void; // 페이지 변경 함수
}

export type BoardWrite = Pick<BoardItem, 'title' | 'content'>;
export type BoardUpdate = Partial<BoardItem> & { id: string };
