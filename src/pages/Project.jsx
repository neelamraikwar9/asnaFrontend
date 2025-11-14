import './project.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Project = () => {
   
   const [tasks, setTasks] = useState([]);
  // console.log(tasks, "checkign")
  const [projects, setProjects] = useState([]);

  async function getTasks(){
  try{
  const resTasks = await axios.get('https://asna-backend.vercel.app/tasks');
  const resProjs = await axios.get('https://asna-backend.vercel.app/projects');
  console.log(resTasks.data);
  setTasks(resTasks.data);
  console.log(tasks, "checking tasks")

  console.log(resProjs.data);
  setProjects(resProjs.data);
  } catch(error){
    console.log("Error message: ", error.message);
  }
}

useEffect(() => {
  getTasks();
}, [])


  return (
    <main className="OuterCon">
    <div className="navbar">
        <Navbar/>
     </div>

     <div className="projTasksCon">
        <div>
          {projects.slice(0, 1).map((project) => 
          <div>
            <h1>{project.name}</h1>
            <p style={{fontSize:'1.5rem', padding: '1rem'}}>{project.description}</p>
          </div>
          )}
        </div>

        <div className="sortFilContainer">
        <div className="sortByCon">
          <label className="text">Sort by:</label>
          <div className="prioritiesNameCon">
          <button className="butn">Priority Low-High</button>
          <button className="butn">Priority High-Low</button>
          <button className="butn">Newest First</button>
          <button className="butn">Oldest First</button>
          </div>


            <div className="filCon  filterCon">
          <label className="text">Filter</label>
          <select className="select seleBox">
            {/* <option value=""></option> */}
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
          </select>
          </div>
          
          <div className="taskBtnCon">
          <button className="btn taskBtn">+ New Task</button>
          </div>
          </div>
        </div>





<div className="tasksInfoTable">

        <div className="box">
        <h3 className='tableTitle'>TASKS</h3>
        {tasks?.map((task) =>
        <div className="tsk">
          <p>{task.name}</p>
        </div>)}
        </div>
        

        <div className="box">
        <h3 className='tableTitle'>OWNER</h3>
        {tasks.map((task) =>
        <div className="tsk">
          <p>{task.owners.map((owner) => owner.name)}</p>
        </div>)}
        </div>
        
        

        <div className="box">
        <h3 className='tableTitle'>DUE ON</h3>
        {tasks?.map((task) =>
        <div className="tsk">
        {/* <p>{task.createdAt}</p> */}
    <p>{new Date(task.createdAt).toLocaleDateString()}</p>
        
        </div>)}
        </div>
       
          
        <div className="box">
        <h3 className='tableTitle'>STATUS</h3>
        {tasks?.map((task) =>
        <div className="tsk">
          <p>{task.status}</p>
        </div>)}
        </div>

        

        <div className="box">
        <h3 className='tableTitle'>TimeTo Complete</h3>
        {tasks?.map((task) =>
        <div className="tsk">
          <p>{task.timeToComplete} Days</p>
        </div>)}
        </div>



          </div>


          </div>
          </main>
  )
}

export default Project;