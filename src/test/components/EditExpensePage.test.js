import React from 'react';
import { EditExpensePage } from '../../components/EditExpensePage';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, wrapper, history;

beforeEach(()=>{
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage 
                                expense={expenses[0]} 
                                editExpense={editExpense} 
                                startRemoveExpense={startRemoveExpense}
                                history={history}/>);
})

test('should render edit expense page correctly',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense action',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
})

test('should handle removeExpense action',()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id)
})
