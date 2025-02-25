import * as C from '@react-email/components';
import * as React from 'react';

export type VerifyEmailTplProps = {
  image: string;
};

export const VerifyEmailTpl = (props: VerifyEmailTplProps) => {
  return (
    <C.Tailwind>
      <C.Html style={{ WebkitPrintColorAdjust: 'exact' }}>
        <C.Body className="text-black">
          <C.Row style={{ marginBottom: 50 }}>
            <C.Column style={styles.col}>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
            </C.Column>
            <C.Column style={styles.col}>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
            </C.Column>
            <C.Column style={styles.col}>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
            </C.Column>
            <C.Column style={styles.col}>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
              <C.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit commodi quis optio maxime!
              </C.Text>
            </C.Column>
          </C.Row>
          <C.Row>
            <C.Column>A</C.Column>
            <C.Column>B</C.Column>
            <C.Column>C</C.Column>
          </C.Row>
          <C.Row>
            <C.Column>A</C.Column>
            <C.Column>B</C.Column>
            <C.Column>C</C.Column>
          </C.Row>
          <C.Row>
            <C.Column>A</C.Column>
            <C.Column>B</C.Column>
            <C.Column>C</C.Column>
          </C.Row>
          <C.Heading>Подтверждение почты</C.Heading>
          <C.Img src={props.image} />
          <C.Text>Чтобы подтвердить свой адрес электронной почты, пожалуйста, перейдите по ссылке: </C.Text>
          <C.Text>
            Эта ссылка действительна в течение 1 часа. Если вы не запрашивали подтверждение, просто
            проигнорируйте это сообщение.
          </C.Text>
        </C.Body>
      </C.Html>
    </C.Tailwind>
  );
};

const styles = {
  col: {
    // flex: 1,
    border: `2px solid yellow`,
    backgroundColor: '#F0E7D1',
    color: 'red',
    margin: 50,
  },
};
