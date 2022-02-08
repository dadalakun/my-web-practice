import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  & button {
    margin-left: 2em;
  }
`;

const Header = () => {
  const { addRegularMessage, clearConsole } = useScoreCard();

  const handleClearDB = async () => {
    const {
      data: { message },
    } = await axios.delete('/api/clear-db');
    addRegularMessage(message);
  };

  const handleClearConsole = () => {
    clearConsole();
  }

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <div className="ClearBtnWrapper">
        <Button variant="contained" color="secondary" onClick={handleClearDB}>
          Clear DB
        </Button>
        <Button variant="contained" color="primary" onClick={handleClearConsole}>
          Clear Console
        </Button>
      </div>
    </Wrapper>
  );
};

export default Header;
