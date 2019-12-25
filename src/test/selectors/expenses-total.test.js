import getTotalExpenses from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expense',()=>{
    const total = getTotalExpenses([]);
    expect(total).toBe(0);
})

test('should correctly add up a single expense',()=>{
    const total = getTotalExpenses([expenses[0]]);
    expect(total).toBe(expenses[0].amount);
})

test('should correctly add all expenses',()=> {
    const total = getTotalExpenses(expenses);
    const manualTotal = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    expect(total).toBe(manualTotal);
})
