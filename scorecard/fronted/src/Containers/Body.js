import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import Add from '../Components/Add'
import Query from '../Components/Query'
import Table from '../Components/Table'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const ConsolePaper = styled(Paper)`
  width: 43%;
  height: 300px;
  padding: 1em;
  overflow: auto;
`;

const Body = () => {

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const [tab, setTab] = useState('add');

  const [queryResult, setQueryResult] = useState([]);

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else {
      addCardMessage(message);
      // get ${name}'s all scorecards
      const {
        data: { messages: allScoreCard },
      } = await axios.get('/api/query-cards', {
        params: {
          type: 'name',
          queryString: name,
        },
      });
      setQueryResult(allScoreCard.map(e => createRow(e.name, e.subject, e.score)));
    }
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/api/query-cards', {
      params: {
        type: queryType,
        queryString: queryString,
      },
    });

    if (!messages) {
      if (queryType === 'all') {
        addRegularMessage([`All - 0 results.`]);
        setQueryResult([]);
      } else {
        addErrorMessage(message);
      }
    }
    else if (queryType === 'all') {
      addRegularMessage([`All - ${messages.length} results.`]);
      setQueryResult(messages.map(e => createRow(e.name, e.subject, e.score)));
    }
    else {
      // addRegularMessage(...messages.map(e => `(${e.name}, ${e.subject}, ${e.score})`));
      addRegularMessage([`${queryType} (${queryString}) - ${messages.length} results.`]);
      setQueryResult(messages.map(e => createRow(e.name, e.subject, e.score)));
    }
    setQueryString('');
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  }

  const createRow = (nam, sub, sco) => {
    return { name: nam, subject: sub, score: sco };
  }

  return (
    <Wrapper>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="add" value="add" />
              <Tab label="query" value="query" />
            </TabList>
          </Box>
          <TabPanel sx={{ width: '100%' }} value="add">

            <Add name={name} subject={subject} score={score} handleAdd={handleAdd}
              setName={setName} setSubject={setSubject} setScore={setScore} />

          </TabPanel>
          <TabPanel sx={{ width: '100%' }} value="query">

            <Query queryType={queryType} queryString={queryString}
              setQueryType={setQueryType} setQueryString={setQueryString} handleQuery={handleQuery} />

          </TabPanel>
        </TabContext>
      </Box>

      <div className='paperWrapper'>
        <ConsolePaper variant="outlined">
          {messages.map((m, i) => (
            <Typography variant="body2" key={m + i} style={{ color: m.color }}>
              {m.message}
            </Typography>
          ))}
        </ConsolePaper>
        <Table queryResult={queryResult} />
      </div>
    </Wrapper>
  );
};

export default Body;
