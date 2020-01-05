import authReducer from '../../reducers/auth';

test('should set login state correctly',()=>{
    const action = {
        type: 'LOGIN',
        uid: '123'
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ uid: action.uid });
})

test('should set logout state correctly',()=>{
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'abc'}, action);
    expect(state).toEqual({});
})