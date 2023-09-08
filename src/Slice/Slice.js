import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    todos:[],
}
const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload,
            }    
            state.todos.push(todo);
            // return state; // To Return the Todo Object
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter((todo)=>
                todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, updatedTodo } = action.payload;
            const todoIndex  = state.todos.findIndex((todo) => todo.id === id);
            if (todoIndex !== -1) {
              state.todos[todoIndex] = updatedTodo;
            }
          },
    }
})



export const {addTodo,removeTodo,updateTodo} = todoSlice.actions;
export default todoSlice.reducer