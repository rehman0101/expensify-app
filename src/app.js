import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/style.scss';
import './firebase/firebase'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));