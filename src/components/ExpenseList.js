import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getFilteredExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ?
            (
                <p>No Expenses</p>
            ):(
                props.expenses.map((expense)=> (
                <ExpenseListItem
                    key={expense.id}
                    id={expense.id} 
                    description={expense.description} 
                    amount={expense.amount}
                    createdAt={expense.createdAt}
                />))
            ) 
        }
    </div>
);

const mapStateToProps = (state) => ({
    expenses: getFilteredExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList);