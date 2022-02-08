import * as React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { useStyles } from '../hooks';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

export default function Query ({queryType, queryString, setQueryType, setQueryString, handleQuery}) {
    const classes = useStyles();
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };
    return(
        <Row>
              <StyledFormControl>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={queryType}
                    onChange={handleChange(setQueryType)}
                  >
                    <FormControlLabel
                      value="name"
                      control={<Radio color="primary" />}
                      label="Name"
                    />
                    <FormControlLabel
                      value="subject"
                      control={<Radio color="primary" />}
                      label="Subject"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio color="secondary" />}
                      label="All"
                    />
                  </RadioGroup>
                </FormControl>
              </StyledFormControl>
              <TextField
                disabled={queryType === 'all'}
                placeholder="Query string..."
                value={queryString}
                onChange={handleChange(setQueryString)}
                style={{ flex: 1 }}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!queryString && queryType !== 'all'}
                onClick={handleQuery}
              >
                Query
              </Button>
            </Row>
    );
}