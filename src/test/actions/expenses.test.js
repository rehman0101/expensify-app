import {addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
    const expensesData = {};
    expenses.forEach(({ id, description, amount, note, createdAt })=>{
        expensesData[id] = { description, amount, note, createdAt };
    })
    database.ref('expenses').set(expensesData).then(()=> done());
})

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

test('should setup setExpenses action object',()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
})

test('should fetch the expenses from firebase',(done)=>{
    const store = createMockStore();
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done();
    })
})

test('should remove expense from database and store',(done)=>{
    const store = createMockStore();
    store.dispatch(startRemoveExpense(expenses[1].id)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[1].id
        })
        return database.ref(`expenses/${expenses[1].id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    })
})

test('should edit expense from database and store',(done)=>{
    const store = createMockStore({});
    const updates = {
        description: 'headphones'
    }
    store.dispatch(startEditExpense(expenses[0].id, updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenses[0].id,
            updates
        })
        return database.ref(`expenses/${expenses[0].id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val().description).toBe(updates.description)
        done();
    })
})