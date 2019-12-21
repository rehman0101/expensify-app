import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = ()=> (
    <div>
        <h1>Expensify</h1>
        <br/>
        <NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
        <NavLink to='/create' activeClassName='is-active'>Add Expense</NavLink>
        <NavLink to='/edit' activeClassName='is-active'>Edit Expense</NavLink>
    </div>
);

export default Header;