import React from 'react'
import { Card,CardContent,CardHeader,Divider,Typography,Grid } from '@material-ui/core'
import useStyles from "./styles"
import Form from './Form/Form';
import List from './List/List';
import { ExpenseState } from '../../context/Context';
const Main = () => {
    const classes=useStyles();
    const {balance}=ExpenseState();
  return (
    <Card className={classes.root}>
        <CardHeader title="Expense Tracker" subheader="Powered by Speechly"/>
        <CardContent>
            <Typography align="center" variant='h5'>Current Balance <span style={{color:balance>0?"green":"red"}}>&#8377;</span>
            <span style={{color:balance>0?"green":"red"}}>
            {balance}
            </span>
            </Typography>
            <Typography variant="subtitle1" style={{lineHeight:"1.5em",marginTop:"20px",color:"red",fontStyle:"italic",textAlign:"center"}}>
                Try Saying: Add Income for <span>&#8377;</span>100 in Category Salary for Monday ...
            </Typography>
            <Divider className={classes.divider}/>
            <Form/>
        </CardContent>
        <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <List/>
            </Grid>
        
        </Grid>
        </CardContent>
    </Card>
  )
}

export default Main