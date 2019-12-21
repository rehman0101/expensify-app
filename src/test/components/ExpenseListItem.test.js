import React from 'react';
import ExpenseListItem from '../../components/ExpenseListItem';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should render expense list item with given data',()=>{
    const {id, description, amount, createdAt} = expenses[1];
    const wrapper = shallow(<ExpenseListItem
        id={id}
        description = {description}
        amount = {amount}
        createdAt = {createdAt}
     />);
     expect(wrapper).toMatchSnapshot();
})