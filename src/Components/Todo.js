import React, {  useRef, useState } from "react";
import "./Todo.scss"
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo,updateTodo } from "../Slice/Slice";


const Todo = () => {
  const [values, setValues] = useState([]);
  const[bt,setBt] = useState(false);
  const[backGroundColor,setBackgroungColor] = useState(-1);
  const redux_state = useSelector((state)=>state.todos);
  const dispatch = useDispatch();
  // const sai = redux_state.filter((e,idx)=>e.id === )
  // console.log(redux_state[0].id);
  const ref = useRef();
  const input_ref = useRef();
  let edit_ref = useRef(-1);

  // const adding = (value)=>{
  //     setInputValue(value.target.value);
  //     // console.log(inputValue);
  // }

  const clicking = (value) => {
    const user_input = ref.current.value.trim();
    console.log(user_input);
    if(user_input !== ""){
        if(edit_ref.current === -1){
            // setValues([...values, user_input]); //By using the Spread operator we are adding new values to the array

            dispatch(addTodo(user_input)); //Here i am implemeting the concept of adding this to the redux store instead of creating the normal state in the web page..

        }else{
            //edit an Existing item...
            // const updateValues = [...values];
            // const updateValues = values;
            // updateValues[edit_ref.current] = user_input;
            // setValues(updateValues);
            dispatch(updateTodo({ id: edit_ref.current, updatedTodo: { ...redux_state, text: user_input ,} }));
            edit_ref.current = -1;
            setBackgroungColor(-1);
            input_ref.current.className = "map";
            setBt(false);
        }
    }
    ref.current.value = "";
  }
  const update = (index) => {
    edit_ref.current = index;
    console.log(index + " update indexing values ");
    setBackgroungColor(index);
    const edited  = redux_state.find((todo) => todo.id === index);
    console.log(edited.text);
    ref.current.value = edited.text;
    setBt(true);
  };
  // console.log(redux_state.id);
  const deleteItem = (index) => {
    // const updatedValues = values.filter((_, idx) => idx !== index); //Filter will return the array idx !== index...Incase the array index matches here it
    //it will not return that is what all i want also...
    dispatch(removeTodo(index));
    // setValues(updatedValues);
    setBackgroungColor(-1);
  }
  //Here we are implementing the button state to check for the edit is trigger or not if it is triggered then we are updating the value inside the 
  //setBt function so we can track the variable according to that we change the button like save and add buttons...
  console.log(edit_ref.current);
  return (
    <div className="main">
      <label>TODO</label>
      <div className="input_field">
        <input type="text" ref={ref} />
        {bt === true ? (<>
            <button onClick={(val) => clicking(val)}>Update</button>
        </>):(<>
            <button onClick={(val) => clicking(val)}>add</button>
        </>)}
      </div>
      {redux_state.length !== 0 ? (
        <ol>
          {redux_state?.map((e, idx) => {
            return (
              <div className={`map ${e.id===backGroundColor ? ("editing"):("")}`} ref={input_ref} key={idx} value={e.id}>
                <li>{e.text}</li>
                <div className="insideMap">
                  <button onClick={()=>deleteItem(e.id)}>delete</button>
                  <button onClick={()=>update(e.id)}>update</button>
                </div>
              </div>
              
            );
          })}
        </ol>
      ) : (
        <h2>No Todos are available</h2>
      )}
    </div>
  );
};

export default Todo;
