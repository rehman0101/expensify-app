import React from 'react';
import getFilteredExpenses from '../selectors/expenses';
import getTotalExpense from '../selectors/expenses-total';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const total = numeral(getTotalExpense(props.expenses)/100).format('$0,0.00');
    return(
        <div>
        <h1>
            Viewing {props.expenses.length===0 ? 0: props.expenses.length} expenses totalling {total}
        </h1>
        </div>
    );
}

const mapStateToProps = (state) => ({
    expenses: getFilteredExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);