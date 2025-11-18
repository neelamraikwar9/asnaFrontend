import './project.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTaskForm } from '../Context/TaskFormContext';


const Project = () => {
   
   const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const {tForm, handleTaskOnChange, handleTaskSubmit, taskForm, setTaskForm, teams, owners} = useTaskForm();



  async function getTasks(){
  try{
  const resTasks = await axios.get('https://asna-backend.vercel.app/tasks');
  const resProjs = await axios.get('https://asna-backend.vercel.app/projects');
  console.log(resTasks.data);
  setTasks(resTasks.data);
  setLoading(false);
  console.log(tasks, "checking tasks")

  console.log(resProjs.data);
  setProjects(resProjs.data);
  setLoading(false);
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
          {loading && <p>Project name with description is Loading...</p>}
          {error && <p style={{color: 'red'}}>{error}</p>}
          {projects.slice(0, 1).map((project) => 
          <div>
            <h2 className="headText">{project.name}</h2>
            <p style={{fontSize:'1rem', padding: '1rem 0'}}>{project.description}</p>
          </div>
          )}
        </div>

        <div className="sortFilContainer">
        <div className="sortByCon">
          <div className="prioritiesNameCon">
          <label className="">Sort by:</label>
          <button className="butn">Due Date Low-High</button>
          <button className="butn">Due Date High-Low</button>
          </div>


            <div className="filCon  filterCon">
          <label className="">Filter</label>
          <select className="select seleBox">
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
          </select>
          </div>
          
          <div className="taskBtnCon">
          <button className="taskBtn" onClick={() => setTaskForm(true)}>+ New Task</button>
          </div>

          {taskForm &&  
          <div className="modal-overlay">
            <div className="modal-content">
             <h2>Create New Task</h2>
            <form className="taskForm" onSubmit={handleTaskSubmit}>
            <div className="field">
             <label>Select Project</label>
             <br/>
             <select className="inpField" name="project" value={tForm?.project} onChange={handleTaskOnChange}>
             {loading && <p>projects are loading...</p>}
             {error && <p style={{color: 'red'}}>{error}</p>}
              {projects.map((project) => 
              <option key={project._id} value={project._id}>{project.name}</option>
              )}
             </select>
             </div>
             
             <div className="field">
             <label>Task Name</label>
             <br/>
             <input type="text" placeholder="Enter Task Name" className="userInpfield" name="name" value={tForm?.name} onChange={handleTaskOnChange}/>
             </div>

             <div className="field">
             <label>Select Team</label>
             <br/>
             <select className="inpField" name="team" value={tForm?.team} onChange={handleTaskOnChange}>
             {loading && <p>projects are loading...</p>}
             {error && <p style={{color: 'red'}}>{error}</p>}
             {teams.map((team) => 
             <option key={team._id} value={team._id}>{team.name}</option>)}
             </select>
             </div>

             <div className="field">
              <label>Select Owner</label>
              <br/>
              <select className="inpField" name="owners" value={tForm?.owners} onChange={handleTaskOnChange}>
              {loading && <p>projects are loading...</p>}
              {error && <p style={{color: 'red'}}>{error}</p>}
                {owners.map((owner) => 
                <option key={owner._id} value={owner._id}>{owner.name}</option>)}
              </select>
             </div>

             <div className="field">
              <label>Select Status</label>
              <br/>
          <select className="inpField"  name="status" value={tForm?.status} onChange={handleTaskOnChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
             </div>

             <div className="field">
              <label>Tags</label>
              <input type="text" placeholder="Enter Tag Name" className="userInpfield" name="tags" value={tForm?.tags} onChange={handleTaskOnChange}/>
             </div>

             <div className="field">
              <label>Select Due Date</label>
              <input type="date" placeholder="Select date" className="userInpfield" name="createdAt" value={tForm?.createdAt} onChange={handleTaskOnChange}/>
             </div>

             <div className="field">
              <label>Estimated Time</label>
              <input type="number" placeholder="Enter Time in Days." className="userInpfield" name="timeToComplete" value={tForm?.timeToComplete} onChange={handleTaskOnChange}/>
             </div>

            <div className="projFormBtns leftSide">
            <button className="cBtn cancelBtn" 
            onClick={() => setTaskForm(false)}
            >
            Cancel</button>
            <button className="cBtn creatBtn" type="submit">Create</button>
          </div>
            </form>
            </div>
          </div>
          }

          </div>
        </div>





<div className="tasksInfoTable">

        <div className="box">
        <h3 className='tableTitle'>TASKS</h3>
        <hr className="boxesBorder"/>
        {tasks?.map((task) =>
        <div className="tsk">
          <p className="boxCont">{task.name}</p>
          <hr className="boxesBorder"/>
        </div>)}
        </div>
        

        <div className="box">
        <h3 className='tableTitle'>OWNER</h3>
        <hr className="boxesBorder"/>
        {tasks.map((task) =>
        <div className="tsk">
          <p className="boxCont">{task.owners.map((owner) => owner.name)}</p>
        <hr className="boxesBorder"/>
        </div>)}
        </div>
        
        

        <div className="box">
        <h3 className='tableTitle'>DUE ON</h3>
        <hr className="boxesBorder"/>
        {tasks?.map((task) =>
        <div className="tsk">
        {/* <p>{task.createdAt}</p> */}
    <p className="boxCont">{new Date(task.createdAt).toLocaleDateString()}</p>
    <hr className="boxesBorder"/>
        
        </div>)}
        </div>
       
          
        <div className="box">
        <h3 className='tableTitle'>STATUS</h3>
        <hr className="boxesBorder"/>
        {tasks?.map((task) =>
        <div className="tsk">
          <p className="boxCont" style={{backgroundColor: task.status === "Completed" ? "oklch(95% 0.052 163.051)" : task.status === "In Progress" ? "oklch(97.3% 0.071 103.193)" : "oklch(86.9% 0.022 252.894)"}}>{task.status}</p>
          <hr className="boxesBorder"/>
        </div>)}
        </div>

        

        <div className="box">
        <h3 className='tableTitle'>TimeTo Complete</h3>
        <hr className="boxesBorder" style={{width:'9.9rem'}}/>
        {tasks?.map((task) =>
        <div className="tsk">
          <p className="boxCont">{task.timeToComplete} Days</p>
        <hr className="boxesBorder" style={{width:'9.8rem'}}/>
        </div>)}
        </div>
          </div>


          </div>
          </main>
  )
}

export default Project;