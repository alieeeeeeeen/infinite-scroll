import { createSlice } from '@reduxjs/toolkit';

const countReducer = createSlice({
    name: 'count',
    initialState: {
        arr: [1,2,3,4,5]
    },
    reducers: {
        add(state, action) {
            state.arr.push(action.payload)
        }
    }
})

export const { add }  = countReducer.actions;
export default countReducer;



