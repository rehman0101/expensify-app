import {addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

test('should setup remove expense action object',()=>{
    const result = removeExpense({id: '123abc'});
    expect(result).toEqual({
        id: '123abc',
        type: 'REMOVE_EXPENSE'
    })
});

test('should setup edit expense action object',()=>{
    const result = editExpense('123abc',{note:'new note'});
    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note'
        }
    })
});

test('should setup add expense action object with provided values',()=>{
    const result = addExpense(expenses[1]);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    })
});

// test('should setup add expense object with default values',()=>{
//     const result = addExpense();
//     expect(result).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: ''
//         }
//     })
// })