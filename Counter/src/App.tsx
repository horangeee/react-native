import React from 'react';
import Styled from 'styled-components/native';
import Counter from './screens/counter';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

interface Props {}

const App = ({}: Props) => {
  return (
    <Container>
      <Counter title="This is a Counter App" initValue={5}></Counter>
    </Container>
  );
};

export default App;
