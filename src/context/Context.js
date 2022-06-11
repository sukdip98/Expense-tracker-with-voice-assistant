import React,{useContext,createContext, useReducer} from "react";
import contextReducer from "./contextReducer";
const initialState=JSON.parse(localStorage.getItem('transaction')) || [{"type":"Income","category":"Salary","amount":25000,"date":"2022-06-11","id":"53edc3b5-69dd-4ec2-813a-c6331e312849"}];

const Expense=createContext();

const ExpenseContext=({children})=>{
    const name="sukdip";
    const [transactions,dispatch]=useReducer(contextReducer,initialState);
    const deleteTransaction=(id)=>dispatch({type:"DELETE_TRANSACTION",payload:id});
    const addTransaction=(transaction)=>dispatch({type:"ADD_TRANSACTION",payload:transaction});
    const balance=transactions.reduce((acc,cur)=>{
        return (cur.type==="Expense"?acc-cur.amount:acc+cur.amount);
    },0)
    return(
        <Expense.Provider value={{deleteTransaction,addTransaction,transactions,name,balance}}>{children}</Expense.Provider>
    )
}
export default ExpenseContext;
export const ExpenseState=()=>{
    return useContext(Expense);
}