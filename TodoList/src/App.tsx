import React from 'react';
import Styled from 'styled-components/native';

import {TodoListContextProvider} from '~/context/TodoListContext';

import Todo from './screens/Todo';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

const App = () => {
  return (
    <TodoListContextProvider>
      <Container>
        <Todo></Todo>
      </Container>
    </TodoListContextProvider>
  );
};

export default App;
