import {combineReducers} from 'redux';
import { customerReducer, fetchedCustomerReducer, selectedCustomerReducer } from './CustomerReducer';

export const  reducers=combineReducers({
    allCustomers:customerReducer,
    selectedCustomer:selectedCustomerReducer,
    fetchedData:fetchedCustomerReducer
});
export default reducers;
