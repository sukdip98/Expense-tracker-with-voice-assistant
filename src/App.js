import logo from './logo.svg';
import './App.css';
import React from 'react';
import Details from './Components/Details/Details';
import {Grid} from "@material-ui/core"
import useStyles from "./styles";
import Main from './Components/Main/Main';
import {PushToTalkButton,PushToTalkButtonContainer,ErrorPanel} from "@speechly/react-ui";
function App() {
  const classess=useStyles();
  return (
    <div>
      <Grid className={classess.grid} container spacing={0} alignItems="center" justifyContent="center" style={{height:"100vh"}}>
       <Grid item xs={12} sm={4} className={classess.mobile}>
       <Details title="Income"/>
       </Grid>
       <Grid item xs={12} sm={3} className={classess.main}>
       <Main/>
       </Grid>
       <Grid item xs={12} sm={4} className={classess.desktop}>
       <Details title="Income"/>
       </Grid>
       <Grid item xs={12} sm={4} className={classess.last}>
<Details title="Expense"/>
       </Grid>
       
      </Grid>
      <PushToTalkButtonContainer >
        <PushToTalkButton style={{marginTop:"35vh"}}/>
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
