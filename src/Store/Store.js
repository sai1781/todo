import {configureStore} from "@reduxjs/toolkit"
// import {todoReducers} from '../Slice/Slice.js'
import { addTodo, removeTodo } from '../Slice/Slice.js';
// import {todoReducers}
import todoReducers from "../Slice/Slice.js"

const Store = configureStore({
    reducer:todoReducers
})

export {Store};