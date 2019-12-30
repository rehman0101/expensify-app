import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary correctly',()=>{
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
})