import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react'
import { ExpenseState } from '../../../context/Context';
import useStyles from "./styles"
import { v4 as uuidv4 } from 'uuid';
import { expenseCategories,incomeCategories } from '../../../constants/Constants';
import formatDate from '../../../utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';
import SnackbarReact from '../../snackbar/SnackbarReact';
const Form = () => {
    const classes=useStyles();
    const initialState={
        type:"Income",
        category:"",
        amount:"",
        date:formatDate(new Date())
    }
    const {deleteTransaction, addTransaction,transactions,name}=ExpenseState();
    const [formData,setData]=useState(initialState);
    const selectedCategories=formData.type==="Income"?incomeCategories:expenseCategories;
    const {segment}=useSpeechContext();
    const [open,setOpen]=useState(false);
    const createTransaction=()=>{
        if(Number.isNaN(Number(formData.amount))) return;
        if(Number(formData.amount>0)){
           
                const transaction={...formData,amount:Number(formData.amount),id:uuidv4()};
                addTransaction(transaction);
                setOpen(true);
             
                setData(initialState);
            
        }
   
    }
    useEffect(()=>{
        if(segment){
            console.log(segment.intent.intent);
            if(segment.intent.intent==="add_expense"){
                setData({...formData,type:"Expense"});
            }else if(segment.intent.intent==="add_income"){
                setData({...formData,type:"Income"});
            }
            else if(segment.isFinal && segment.intent.intent==="create_transaction" ){
                return createTransaction();

            }
            else if(segment.isFinal&&segment.intent.intent==="cancel_transaction"){
                setData(initialState);
            }
    segment.entities.forEach((e)=>{
        const category=`${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
        console.log(e.type);

        switch(e.type){
            case "amount":
                setData({...formData,amount:e.value});
                break;
                case "date":
                    setData({...formData,date:(e.value)});
                    break;
                case "category":
                    setData({...formData,category:category});
                    break;
                default:
                    break;        
        }
    });
    if(segment.isFinal && formData.amount&& formData.category && formData.date&& formData.type){
        createTransaction();
    }
        }
    },[segment]);
  return (
    <Grid container spacing={2}>
        <SnackbarReact open={open} setOpen={setOpen}/>
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle2" gutterBottom style={{color:"green",fontStyle:"italic"}}>
           {
               segment?
               <>
               {segment.words.map((w)=>w.value).join(" ")}
               </>:null
           }
          </Typography>
        </Grid>
        <Grid item xs={6}>
         <FormControl fullWidth>
         <InputLabel>Type</InputLabel>
         <Select value={formData.type} onChange={(e)=>setData({...formData,type:e.target.value})}>
             <MenuItem value="Income">Income</MenuItem>
             <MenuItem value="Expense">Expense</MenuItem>
         </Select>
         </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={(e)=>setData({...formData,category:e.target.value})} >
                    {
                        selectedCategories.map((c)=><MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField type="number" fullWidth value={formData.amount} label="Amount" onChange={(e)=>setData({...formData,amount:e.target.value})} />
        </Grid>
        <Grid item xs={6}>
         <TextField type="date" label="Date" value={formData.date} onChange={(e)=>setData({...formData,date:formatDate(e.target.value)})} fullWidth/>
        </Grid>
        <Button color='primary' className={classes.button} variant="outlined" fullWidth onClick={createTransaction}>Create</Button>

    </Grid>
  )
}

export default Form