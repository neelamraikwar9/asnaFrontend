import './dashboard.css';
import Navbar from '../components/Navbar'
import axios from 'axios';
import {useState,  useEffect } from 'react';



const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks, "checkign")
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
        <div className="searchBarCon">
          <input type="search" placeholder='search' className="searchInp"/>
          <img src="./icons/searchbar.png" alt="searchbar icon" style={{width: '1.6rem', height: "1.6rem", position: 'absolute', left: '73rem'}}/>
        </div>

        <div>

          <div className="container">
          <h1>Projects</h1>

          <div className="filCon">
          <label>Filter</label>
          <select className="select">
            {/* <option value=""></option> */}
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
            {/* <option value=""></option> */}
          </select>
          </div>

          <button className="newProjBtn"> + New Project</button>
          </div>

          <div className='projsCon'>
            {projects.slice(0, 3).map((proj) => 
            <div className="projCard"  key={proj._id}>
            
            <p
            style={{backgroundColor: proj.status === "Completed" ? "oklch(95% 0.052 163.051)" : proj.status === "In Progress" ? "oklch(97.3% 0.071 103.193)" : "oklch(98.5% 0.002 247.839)"}}>
            {proj.status}</p>
            <h2>{proj.name}</h2>
            <p>{proj.description}</p>
            </div>)}
          </div>

        </div>




        <div>

          <div className="container">
          <h1>My Tasks</h1>

          <div className="filCon">
          <label>Filter</label>
          <select className="select">
            {/* <option value=""></option> */}
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
            {/* <option value=""></option> */}
          </select>
          </div>

          <button className="newProjBtn"> + New Task</button>
          </div>

          <div className='projsCon'>
            {tasks.slice(0, 3).map((task) => 
            <div className="projCard tasksCard"  key={task._id}>
            
            <p
            style={{backgroundColor: task.status === "Completed" ? "oklch(95% 0.052 163.051)" : task.status === "In Progress" ? "oklch(97.3% 0.071 103.193)" : "oklch(98.5% 0.002 247.839)"}}>
            {task.status}</p>
            <h2>{task.name}</h2>
            <p>Due On: {task.createdAt}</p>
            <p>Team Name:{task.team.name}</p>
            </div>)}
          </div>

        </div>

      </div>   
    </main>
    
  )
}

export default Dashboard