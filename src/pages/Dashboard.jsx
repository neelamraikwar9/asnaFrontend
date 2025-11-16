import './dashboard.css';
import Navbar from '../components/Navbar'
import axios from 'axios';
import {useState,  useEffect } from 'react';



const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  console.log(tasks, "checkign")
  const [projects, setProjects] = useState([]);

  const [filProjects, setFilProjects] = useState([]);
  const [filTasks, setFilTasks] = useState([]);

  const [projForm, setProjForm] = useState(false);

  async function getTasks(){
  try{
  const resTasks = await axios.get('https://asna-backend.vercel.app/tasks');
  const resProjs = await axios.get('https://asna-backend.vercel.app/projects');
  console.log(resTasks.data);
  setTasks(resTasks.data);
  setFilTasks(resTasks.data);
  console.log(tasks, "checking tasks");
  setLoading(false);


  console.log(resProjs.data);
  setProjects(resProjs.data);
  setFilProjects(resProjs.data);
  } catch(error){
    setError(error.message);
    console.log("Error message: ", error.message);
  }
}

useEffect(() => {
  getTasks();
}, [])


async function handleProjFilter(e){
  const statusOption = e.target.value; 
  
  try{
  const projStatus = await axios.get(`https://asna-backend.vercel.app/projects/status/${statusOption}`);
  console.log(projStatus.data, "proj");
  setFilProjects(projStatus.data);
  console.log(filProjects, "filProjects");

  } catch(error){
    console.log(error);
  }
}


async function handleTaskFilter(e){
const taskOption = e.target.value; 
try{
const taskStatus = await axios.get(`https://asna-backend.vercel.app/tasks/status/${taskOption}`);
console.log(taskStatus.data, "tasksstatus");
setFilTasks([taskStatus.data]);
} catch(error){
  console.log(error)
}
}
  return (
    <main className="OuterCon">
    <div className="navbar">
        <Navbar/>
     </div>

     <div className="projTasksCon">
        <div className="searchBarCon">
          <input type="search" placeholder='search' className="searchInp"/>
          <img src="./icons/searchbar.png" alt="searchbar icon" style={{width: '1.6rem', height: "1.6rem", position: 'absolute', left: '55rem', marginTop: '0.2rem'}}/>
        </div>

        <div>

          <div className="container">
          <h2 className="headText">Projects</h2>

          <div className="filCon">
          <label>Filter</label>
          <select className="select" onChange={handleProjFilter}>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
          </select>
          </div>

          <button className="newProjBtn" onClick={() => setProjForm(true)}> + New Project</button>

          {projForm && 
          <div className="modal-overlay">
          <form className='modal-content'>
          <h2>Create New Project</h2>
          <div>
          <label>Project Name</label>
          <input type="text" placeholder='Enter Project Name'/>
          </div>
          
          <div></div>
          <label>Project Description</label>
          <textarea type="text" placeholder='Enter Project Description'></textarea>
         
          <div>
            <button className="cancelBtn">Cancel</button>
            <button className="creatBtn">Create</button>
          </div>
          </form>
          </div>}
          </div>

          <div className='projsCon'>
            {loading && <p>Projects are Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}                                                                                                                                                                                                                                                                                                                                                                                                                              
            {/* {projects.slice(0, 3).map((proj) =>  */}  

            
            {filProjects.map((proj) =>   
            <div className="projCard"  key={proj._id}>
            
            <p
            style={{backgroundColor: proj.status === "Completed" ? "oklch(95% 0.052 163.051)" : proj.status === "In Progress" ? "oklch(97.3% 0.071 103.193)" : "oklch(98.5% 0.002 247.839)"}}>
            {proj.status}</p>
            <h3>{proj.name}</h3>
            <p>{proj.description}</p>
            </div>)}
          </div>

        </div>




        <div>

          <div className="container">
          <h2 className="headText">My Tasks</h2>
          <div className="filCon">
          <label>Filter</label>
          <select className="select" onChange={handleTaskFilter}>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
          </select>
          </div>

          <button className="newProjBtn"> + New Task</button>
          </div>

          <div className='projsCon'>
            {loading && <p>Tasks are Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* {tasks.slice(0, 3).map((task) =>  */}


            {/* //now it becomes object after filtering so it will not run on map. */}
            {filTasks.map((tasks) => 

            <div className="projCard tasksCard"  key={tasks._id}>
            
            <p
            style={{backgroundColor: tasks.status === "Completed" ? "oklch(95% 0.052 163.051)" : tasks.status === "In Progress" ? "oklch(97.3% 0.071 103.193)" : "oklch(98.5% 0.002 247.839)"}}>
            {tasks.status}</p>
            <h3>{tasks.name}</h3>
            {/* <p>Due On: {task.createdAt}</p> */}
            <p>{new Date(tasks.createdAt).toLocaleDateString()}</p>
            {/* <p><strong>Team Name: </strong>{task.team.map((t) => t.name)}</p> */}
            </div>
            )}
          </div>

        </div>

      </div>   
    </main>
    
  )
}

export default Dashboard;