import expensesReducer from '../../reducers/expensesReducer';
import expenses from '../fixtures/expenses';

test('should set default state',()=>{
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
})

test('should remove expense by id',()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '2'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[2]]);
})

test('should not remove expense if id not found',()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should add an expense',()=>{
    const expense = {
        id: '1065',
        description: 'laptop',
        amount: 35500,
        createdAt: 20000,
        note: ''
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
})

test('should edit an expense',()=>{
    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates: {
            amount: 5000
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[0].amount).toBe(5000);
})

test('should not edit expense if id not found',()=>{
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount: 5000
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[0]).toEqual(expenses[0]);
})

test('should set expenses',()=>{
    const action = {
        type: 'SET_EXPENSES',
        expenses
    }
    const state = expensesReducer([], action);
    expect(state).toEqual(expenses);
})