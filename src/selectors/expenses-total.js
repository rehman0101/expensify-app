export default (expensesArray)=> {
    return expensesArray.reduce((acc,cur)=> {
        return acc+cur.amount
    },0);
}