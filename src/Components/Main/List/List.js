import React from 'react'
import useStyles from './styles';
import {Avatar, IconButton, List as MuiList, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Slide} from "@material-ui/core";
import { Delete, MoneyOff } from '@material-ui/icons';
import { ExpenseState } from '../../../context/Context';
const List = () => {
    const classes=useStyles();
    const {transactions,deleteTransaction}=ExpenseState();
   
  return (
    <MuiList dense={false} className={classes.list}>
        {
            transactions.map((transaction)=>(
<Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={transaction.type==="Income"?classes.avatarIncome:classes.avatarExpense}>
                 <MoneyOff/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={transaction.category} secondary={`$${transaction.amount}-${transaction.date}`}/>
                <ListItemSecondaryAction>
                    <IconButton edge="end" arial-label="delete" onClick={()=>deleteTransaction(transaction.id)} >
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </Slide>
            ))
        }
        
    </MuiList>
  )
}

export default List