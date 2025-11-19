import './taskDetail.css';
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react';




const TaskDetail = () => {
    const { taskId } = useParams();
    console.log(taskId);
    const [task, setTask] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    async function getTask(){
      try{
      const res = await axios.get(`https://asna-backend.vercel.app/tasks/taskById/${taskId}`);
      console.log(res.data, "res")
      setTask(res.data);
      } catch(error){
        throw error; 
      }
    }

    useEffect(() => {
      getTask();
    }, []);


  return (
    <main className="OuterCon">
    <div className="navbar">
        <Navbar/>
     </div>
     
      <div className="projTasksCon">
      <div className="detailHeadTitle">
      <h2 className="headText">Task Details</h2>
      </div>
      
      <div className="detailHeadTitle">
      <div className="detailContainer">
      {loading && <p>Task Detail is Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <h2>{task?.name}</h2>
      
      <p><strong>Project: </strong> {task?.project.name}</p> 
      <p><strong>Team: </strong> {task?.team?.name}</p>
      <p><strong>Owners: </strong> {task?.owners.map((owner) => owner.name)}</p>                                                                                                                                                                                                                                                                                                                                                                                                                    
      <p><strong>Due Date: </strong> {task?.createdAt}</p>
      <p><strong>Status: </strong> {task?.status}</p>
      <p><strong>Time Remaining: </strong> {task?.timeToComplete} Days</p>
      <br/>
      <div>
      <input type="checkbox" />
      <label>Mark as completed</label>
      </div>
      </div>
      </div>
      </div>
    </main>
  )
}

export default TaskDetail;