import React from 'react';
import { EditExpensePage } from '../../components/EditExpensePage';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, wrapper, history;

beforeEach(()=>{
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage 
                                expense={expenses[0]} 
                                startEditExpense={startEditExpense} 
                                startRemoveExpense={startRemoveExpense}
                                history={history}/>);
})

test('should render edit expense page correctly',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('should handle startEditExpense action',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
})

test('should handle removeExpense action',()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id)
})
