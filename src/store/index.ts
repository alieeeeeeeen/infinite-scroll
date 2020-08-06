import { configureStore } from '@reduxjs/toolkit';
import countReducer from './reducer';

const store = configureStore(countReducer);

export default store;

