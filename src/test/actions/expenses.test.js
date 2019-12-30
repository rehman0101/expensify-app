import {addExpense, editExpense, removeExpense, startAddExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

test('should add expense to database and store',(done)=>{
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'this one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
})

test('should add expense to database and store with default values',()=>{
    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
})

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