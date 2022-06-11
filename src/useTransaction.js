import { expenseCategories,incomeCategories,resetCategories } from "./constants/Constants";
import { ExpenseState } from "./context/Context";
const useTransaction=(title)=>{
    resetCategories();

const {transactions}=ExpenseState();
const transactionPerType=transactions.filter((t)=>t.type===title);
const total=transactionPerType.reduce((acc,cur)=>acc+cur.amount,0);
const categories=title==="Income"?incomeCategories:expenseCategories;
transactionPerType.forEach((t)=>{
    const category=categories.find((c)=>c.type===t.category);
    if(category)
    category.amount=category.amount+t.amount;
})
console.log(transactionPerType);
const filterCategories=categories.filter((t)=>t.amount>0);
console.log(filterCategories);

const chartData={
    labels:filterCategories.map((c)=> {return c.type;}),

    datasets:[{
        data:filterCategories.map((c)=>c.amount),
        backgroundColor:filterCategories.map((c)=>c.color)
    }],
}
return {filterCategories,total,chartData};
}
export default useTransaction;