import * as Cmp from '@react-email/components';
import * as React from 'react';

export type VerifyEmailTplProps = {
  link: string;
  token?: string;
};

export const VerifyEmailTpl = (props: VerifyEmailTplProps) => {
  const token = props.token ? `?token=${props.token}` : '';
  const link = props.link + token;

  console.log('VerifyEmailTpl');

  return (
    <Cmp.Tailwind>
      <Cmp.Html>
        <Cmp.Body className="text-black">
          <Cmp.Heading>Подтверждение почты</Cmp.Heading>
          <Cmp.Text>
            Чтобы подтвердить свой адрес электронной почты, пожалуйста, перейдите по ссылке:{' '}
          </Cmp.Text>
          <Cmp.Link href={link}>Подтвердить почту</Cmp.Link>
          <Cmp.Text>
            Эта ссылка действительна в течение 1 часа. Если вы не запрашивали подтверждение, просто
            проигнорируйте это сообщение.
          </Cmp.Text>
        </Cmp.Body>
      </Cmp.Html>
    </Cmp.Tailwind>
  );
};
