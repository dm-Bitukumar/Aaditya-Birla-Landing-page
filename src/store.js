import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers here

const store = configureStore({
    reducer: rootReducer,
});

export default store;
