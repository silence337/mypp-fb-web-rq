import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import type { BoardItem, BoardCreate } from '@/types/boardTypes';
import { BoardRules } from '@/validation/boardValidation';
//import { useCurrentUser } from '@/hooks/useAuthQuery';
import { useAuthStore } from '@/store/authStore';

interface Props {
  onSubmit: (data: BoardCreate) => void | Promise<void>;
  editValues?: BoardItem | undefined;
  isPending?: boolean;
}

const BoardForm = ({ onSubmit, editValues, isPending }: Props) => {
  //const { data: user } = useCurrentUser();
  const { user } = useAuthStore();
  const rules = BoardRules;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardCreate>({
    mode: 'onSubmit',
    defaultValues: {
      title: editValues?.title || '',
      content: editValues?.content || '',
      //author: user?.displayName || '',
    },
  });

  const onValid = (data: BoardCreate) => {
    if (editValues) {
      const confirm = window.confirm('게시글을 수정하시겠습니까?');
      if (!confirm) return;
    }
    onSubmit(data);
  };

  return (
    <article className=''>
      <ul className='board-form'>
        <li>
          <strong>제목</strong>
          <span>
            <Controller
              name='title'
              control={control}
              rules={rules.title}
              render={({ field }) => (
                <Input
                  label='제목'
                  type='text'
                  placeholder='제목'
                  error={errors.title}
                  {...field}
                />
              )}
            />
          </span>
        </li>
        <li>
          <strong>작성자</strong>
          <span>{user?.displayName}</span>
        </li>
        <li>
          <strong>내용</strong>
          <span className='content'>
            <Controller
              name='content'
              control={control}
              rules={rules.content}
              render={({ field }) => (
                <Textarea
                  label='내용'
                  placeholder='내용'
                  error={errors.content}
                  {...field}
                />
              )}
            />
          </span>
        </li>
      </ul>
      <div className='button_wrap'>
        <button
          type='submit'
          onClick={handleSubmit(onValid)}
          disabled={isPending}
          className='button -flower'
        >
          {editValues ? '수정' : '등록'}
        </button>
      </div>
    </article>
  );
};

export default BoardForm;
