import React,{useContext,createContext, useReducer} from "react";
import contextReducer from "./contextReducer";
const initialState=[];

const Expense=createContext();

const ExpenseContext=({children})=>{
    const name="sukdip";
    const [transactions,dispatch]=useReducer(contextReducer,initialState);
    const deleteTransaction=(id)=>dispatch({type:"DELETE_TRANSACTION",payload:id});
    const addTransaction=(transaction)=>dispatch({type:"ADD_TRANSACTION",payload:transaction});
    return(
        <Expense.Provider value={{deleteTransaction,addTransaction,transactions,name}}>{children}</Expense.Provider>
    )
}
export default ExpenseContext;
export const ExpenseState=()=>{
    return useContext(Expense);
}