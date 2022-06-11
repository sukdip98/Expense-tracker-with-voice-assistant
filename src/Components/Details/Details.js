import React, { useState } from 'react'
import {Card,CardHeader,CardContent,Typography} from '@material-ui/core'
import useStyles from "./style";
import { ExpenseState } from '../../context/Context';
import useTransaction from '../../useTransaction';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
const Details = ({title}) => {
  // const {}=ExpenseState();
    const classes=useStyles();
    const {total,chartData}=useTransaction(title);
    console.log(chartData.datasets.data);
const {transactions}=ExpenseState();
console.log(transactions);
  return (
      <Card className={title==="Income"?classes.income:classes.expense}>
         <CardHeader title={title}/>
         <CardContent>
             <Typography variant="h5"><span>&#8377;</span>{total}</Typography>
             
               <Doughnut data={chartData} style={{marginTop:"10vh"}}/>
             
             
             </CardContent> 
      </Card>
  )
}

export default Details