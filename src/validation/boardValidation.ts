import { type RegisterOptions } from 'react-hook-form';
import { type BoardFormValues } from '@/types/boardTypes';

type BoardRulesType = Record<
  keyof BoardFormValues,
  RegisterOptions<BoardFormValues>
>;

export const BoardRules: BoardRulesType = {
  title: {
    required: '제목을 입력하세요.',
    validate: (v) => v.trim() !== '' || '제목은 공백만 입력할 수 없습니다.',
  },
  content: {
    required: '내용을 입력하세요.',
    validate: (v) => v.trim() !== '' || '내용은 공백만 입력할 수 없습니다.',
  },
  //author: {},
};
