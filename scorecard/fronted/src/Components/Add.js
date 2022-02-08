import * as React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../hooks';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 1em;
`;

export default function Add ({name, subject, score, handleAdd, setName, setSubject, setScore}) {
    const classes = useStyles();
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    return(
        <Row>
              <TextField
                className={classes.input}
                placeholder="Name"
                value={name}
                onChange={handleChange(setName)}
              />
              <TextField
                className={classes.input}
                placeholder="Subject"
                style={{ width: 240 }}
                value={subject}
                onChange={handleChange(setSubject)}
              />
              <TextField
                className={classes.input}
                placeholder="Score"
                value={score}
                onChange={handleChange(setScore)}
                type="number"
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!name || !subject || !score}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Row>
    );
}