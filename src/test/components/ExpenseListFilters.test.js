import React from 'react';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { shallow } from 'enzyme';
import { filters, filters2 } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=>{
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters = {filters} 
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
        />
    )
})

test('should render ExpenseListFilters with default filters',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alternate props',()=>{
    wrapper.setProps({
        filters: filters2
    });
    expect(wrapper).toMatchSnapshot();
})

test('should handle onTextChange',()=>{
    const value = 'rent';
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

test('should handle sortByDate',()=>{
    const value = 'date';
    wrapper.setProps({
        filters: filters2
    });
    wrapper.find('select').simulate('change',{
        target: {value}
    });
    expect(sortByDate).toHaveBeenCalled();
})

test('should handle sortByAmount',()=>{
    const value = 'amount';
    wrapper.setProps({
        filters: filters
    });
    wrapper.find('select').simulate('change',{
        target: {value}
    });
    expect(sortByAmount).toHaveBeenCalled();
})

test('should handle date changes',()=>{
    const startDate = moment(0);
    const endDate = moment(0).add(5, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

test('should handle sortByDate',()=>{
    
})