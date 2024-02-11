
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
    setCountryValue(value.status)
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
        filval[0].status=countryValue
        setTodos(todos)
        setEditDecs(true)
      }
      else{
        addTodo(taskname, taskDesc,countryValue);
      }
    setTaskname("");
    setTaskDecs("");
    setCountryValue("0")
    }
 
  }
  const clear =(e) => {
    e.preventDefault();
    setEditDecs(true)
    setTaskname("");
    setTaskDecs("");
    setCountryValue("0")
  }
  const addTodo = (text, Desc,statuesVal) => {
    const newTodoList = {
      id: Date.now(),
      name: text,
      enableBtn: true,
      description: Desc,
      status:statuesVal==='' ? "0":statuesVal
    };
    setTodos([...todos, newTodoList]);
    
  };
  const notify = () => toast.error("Please Fill Title and Description");
  return (

    <div style={{ border: '1px solid black', display: 'flex', marginLeft: 60, marginTop: 60 }} className='card_wdt'> 
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <div style={{ width: 'auto', height: 'auto', padding: 13, border: 'none', boxShadow: 'none', marginRight: 20, marginLeft: 15, borderRadius: 14 ,marginTop:30 }} className='card_fles'>
          <div style={{ marginLeft: 20 ,marginBottom:10 }}>
            <input type="text" name="name" placeholder='Task' value={taskname} onChange={handleTaskName} />
          </div>
          <div style={{ marginLeft: 20 ,marginBottom:10  }}>
            <input type="text" name="name" placeholder='Description' value={taskDesc} onChange={handleTaskDesc} />
          </div>
          <div className='mrgLft20' style={{marginBottom:10 }}> <span className='font_wt'>Status  </span></div>
          <div className='mrgLft20 '>
          <select  style={{ background: 'white', border: '1px solid black', height: 25, borderRadius: 5,marginBottom:10 }} value={countryValue} onChange={(e) => setCountryValue(e.target.value)}>
                          {options}
                        </select>
          </div>
    

          <button type='submit' style={{ width: 100, height: 24, background: '#9ACD32', borderRadius: 6, border: '1px solid #9ACD32', marginRight: 10, marginLeft: 20 ,marginBottom:10}} onClick={onSubmit} >{edit === true ? 'Add Task':'Edit Task'}</button>
          <button type='submit' style={{ width: 100, height: 24, background: '#cccc', borderRadius: 6, border: '1px solid #cccc', marginRight: 10, marginLeft: 20 ,marginBottom:10}} onClick={clear} >Clear</button>
        </div>
        <div className='flex_Align'>
          {todos.map((input, index) => {
            return (input.enableBtn === true) && (

              <div style={{ height: 147, background: '#ADDFAD', marginLeft: 45, padding: 6 ,marginBottom :13 ,marginRight:48}} className='inner_card_wdth'>
                <form>

                  <div key={index} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {(input.enableBtn === true) && (<div style={{ marginLeft: 20, display: 'flex' }}><span className='font_wt'>Name : </span><span className='sub_field txt_wrap'>{input.name === '' ? ' - ' : input.name}</span></div>)}
                      {(input.enableBtn === true) && (<div style={{ marginLeft: 20, display: 'flex' }}><span className='font_wt'>Description : </span>
                      <span className='sub_field desc_txt_wrap'>{input.description === '' ? ' - ' : input.description}</span>
                      </div>)}
                      {(input.enableBtn === true) && (<div style={{ width: 192, display: 'flex', marginLeft: 20, marginTop: 5 }}> <span className='font_wt'>Status : </span>
                     <span className='sub_field'>{input.status === '1' ? 'Completed ' : 'Not-Completed'}</span> 
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
              </div>

            )
          })}
        </div>
      </form>

    </div>

  );

}

export default App;
