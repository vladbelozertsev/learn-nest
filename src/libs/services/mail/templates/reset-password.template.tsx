import * as Cmp from '@react-email/components';
import * as React from 'react';

export type ResetPasswordProps = {
  password: string;
};

export const ResetPasswordTpl = (props: ResetPasswordProps) => {
  return (
    <Cmp.Tailwind>
      <Cmp.Html>
        <Cmp.Body className="text-black">
          <Cmp.Heading>Сброс пароля</Cmp.Heading>
          <Cmp.Text>Ваш новый пароль: {props.password}</Cmp.Text>
        </Cmp.Body>
      </Cmp.Html>
    </Cmp.Tailwind>
  );
};
