import React from 'react';
import getFilteredExpenses from '../selectors/expenses';
import getTotalExpense from '../selectors/expenses-total';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const total = numeral(getTotalExpense(props.expenses)/100).format('$0,0.00');
    return(
        <div className="page-header">
        <div className="content-container">
        <h1 className="page-header__title">
            Viewing <span>{props.expenses.length===0 ? 0: props.expenses.length}</span> expenses totalling <span>{total}</span>
        </h1>
        <div className="page-header__actions">
            <Link className="button" to="/create">Add Expense</Link>
        </div>
        </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    expenses: getFilteredExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);