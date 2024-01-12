
import './App.css';
import Card from "@material-ui/core/Card";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [taskname, setTaskname] = useState('');
  const [taskDesc, setTaskDecs] = useState('');
  const [edit, setEditDecs] = useState(true);
  const [editValue,SetCurrentEdit] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const countries = [
    { value: "0", text: "Not-Completed" },
    { value: "1", text: "Completed" }
  ]
  const options = countries.map((option) => {
    return <option value={option.value}>{option.text}</option>
  })
  const [todos, setTodos] = useState([
    { id: '', name: '', enableBtn: '', description: '', status: '' }
  ])
  const handleTaskName = (event) => {
    setTaskname(event.target.value);
  }
  const handleTaskDesc = (event) => {
    setTaskDecs(event.target.value);
  }

  const removeFields = (index) => {
    let data = [...todos];
    data.splice(index, 1)
    setTodos(data)
  }
  const editField = (value,e)=>{
    setTaskname(value.name);
    SetCurrentEdit(value.id);
    setEditDecs(false)
    setTaskDecs(value.description);
    e.preventDefault();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(taskname === "" || taskDesc === ""){
      notify();
      return
    }
    else{
      if(edit === false){
        var filval = todos.filter((val)=>val.id === editValue)
        filval[0].name=taskname
        filval[0].description=taskDesc
        setTodos(todos)
        setEditDecs(true)
      }
      else{
        addTodo(taskname, taskDesc);
      }
    setTaskname("");
    setTaskDecs("");
    }
 
  }
  const clear =(e) => {
    e.preventDefault();
    setEditDecs(true)
    setTaskname("");
    setTaskDecs("");
  }
  const addTodo = (text, Desc) => {
    const newTodoList = {
      id: Date.now(),
      name: text,
      enableBtn: true,
      description: Desc
    };
    setTodos([...todos, newTodoList]);
    setCountryValue('0');
  };
  const notify = () => toast.error("Please Fill Title and Description");
  return (

    <div style={{ width: 1008, padding: 30, border: '1px solid black', display: 'flex', marginLeft: 168, marginTop: 60 }}>
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <Card style={{ width: 950, height: 40, padding: 30, border: 'none', boxShadow: 'none', display: 'flex', marginRight: 20, marginLeft: 15, borderRadius: 14 }}>
          <div style={{ marginLeft: 20 }}>
            <input type="text" name="name" placeholder='Task' value={taskname} onChange={handleTaskName} />
          </div>
          <div style={{ marginLeft: 20 }}>
            <input type="text" name="name" placeholder='Description' value={taskDesc} onChange={handleTaskDesc} />
          </div>


          <button type='submit' style={{ width: 100, height: 24, background: '#9ACD32', borderRadius: 6, border: '1px solid #9ACD32', marginRight: 10, marginLeft: 20 }} onClick={onSubmit} >{edit === true ? 'Add Task':'Edit Task'}</button>
          <button type='submit' style={{ width: 100, height: 24, background: '#cccc', borderRadius: 6, border: '1px solid #cccc', marginRight: 10, marginLeft: 20 }} onClick={clear} >Clear</button>
        </Card>
        <div className='flex_Align'>
          {todos.map((input, index) => {
            return (input.enableBtn === true) && (

              <Card style={{ width: 279, height: 150, background: '#ADDFAD', marginLeft: 45, padding: 6 ,marginBottom :13 }} >
                <form>

                  <div key={index} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {(input.enableBtn === true) && (<div style={{ marginLeft: 20, display: 'flex' }}>Name :{input.name === '' ? ' - ' : input.name}</div>)}
                      {(input.enableBtn === true) && (<div style={{ marginLeft: 20, display: 'flex' }}>Description :{input.description === '' ? ' - ' : input.description}</div>)}
                      {(input.enableBtn === true) && (<div style={{ width: 192, display: 'flex', marginLeft: 20, marginTop: 5 }}> Status:
                        <select style={{ background: 'red', border: '1px solid red', height: 25, marginLeft: 8, borderRadius: 5 }} value={countryValue} onChange={(e) => setCountryValue(e.target.value)}>
                          {options}
                        </select>
                      </div>)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 21, justifyContent: 'end', marginTop: 30, marginRight: 18 }}>
                      <div>
                        {(input.enableBtn === true) && (
                          <button style={{ width: 62, height: 28, marginRight: 20, background: 'darkgreen', border: '1px solid darkgreen', borderRadius: 5 }} onClick={(e) => editField(input,e)}
                          >Edit</button>
                        )}
                      </div>
                      <div>
                        {(input.enableBtn === true) && (
                          <button style={{ width: 62, height: 28, background: 'red', border: '1px solid red', borderRadius: 5 }} onClick={() => removeFields(index)}
                          >Delete</button>
                        )}
                      </div>
                    </div>

                  </div>

                </form>
              </Card>

            )
          })}
        </div>
      </form>

    </div>

  );

}

export default App;
