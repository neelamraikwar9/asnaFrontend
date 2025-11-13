import './project.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Project = () => {
   
  const [projects, setProjects] = useState([]);
  console.log(projects, "projects")

  async function getTasks(){
  try{
  const resProjs = await axios.get('https://asna-backend.vercel.app/projects');
  
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
    // <div>Project</div>
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
          <label>Filter</label>
          <select className="select">
            {/* <option value=""></option> */}
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
            {/* <option value=""></option> */}
          </select>
          </div>

          </div>


        </div>

          </div>
          </main>
  )
}

export default Project;