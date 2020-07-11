import React from 'react';
import {Container, Image, Menu} from 'semantic-ui-react';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({children}) => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          <Image size="mini" src="/om.png" style={{marginRight: '1.5em'}} />
          Bootcut
        </Menu.Item>
        <Menu.Item as="a">Lobby</Menu.Item>
      </Container>
    </Menu>
    <Container style={{marginTop: '7em'}}>{children}</Container>
  </div>
);

export default AppLayout;
