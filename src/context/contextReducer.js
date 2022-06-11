const  contextReducer=(state,action)=>{
    let transactions;
    switch (action.type) {
        case "DELETE_TRANSACTION":
             transactions=state.filter((transaction)=>transaction.id!==action.payload)
            localStorage.setItem("transaction",JSON.stringify(transactions));
            return transactions;

        case "ADD_TRANSACTION":
            localStorage.setItem("transaction",JSON.stringify([action.payload, ...state]));
            return[action.payload, ...state];

        //    return transactions;
    
        default:
           return state;
    }
}
export default contextReducer;