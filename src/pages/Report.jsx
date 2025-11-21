// import React from 'react'
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const Report = () => {
  const [task, setTask] = useState([]);
  // const [completedTasks, setCompletedTasks] = useState();
  // console.log(completedTasks, "completedTasks")


  const fetchTasks  = async() => {
    try{
      const res = await axios.get("https://asna-backend.vercel.app/tasks/byStatus/Completed");
      console.log(res.data, "getting tasks by status");
      setTask(res.data);
    } catch(error){
      throw error; 
    }
  }
  
  useEffect(() => {
    fetchTasks();
  }, []);

  // async function getCompleteTasks(){
  //   try{
  //   const compTasks = await axios.get("https://asna-backend.vercel.app/tasks/report/completedTasks");
  //   console.log(compTasks.data, "khdkjdf");
  //   setCompletedTasks(compTasks.data);
  //   console.log(completedTasks, "data")
  //   } catch(error){
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getCompleteTasks();
  // }, [])



  return (
    <main className="OuterCon">
    <div className="navbar">
        <Navbar />
    </div>
    <div className="projTasksCon">
      <h1 className="headText">Report Overview</h1>
      <h2>Total Work Done Last Week:</h2>
       
       <div>
        <div>
          {/* <Doughnut
            data={{
              labels: ["Total Completed Tasks", "All Tasks"],
              datasets: [
                {
                  label: "Tasks",
                  data: [completedTasks.totalCompletedTasks],
                  backgroundColor: [ "rgba(9, 153, 249, 0.6)", "rgba(7, 250, 250, 0.6)" ],
                  borderWidth: 1,
                },
              ],
            }}
          /> */}

           <Doughnut
            data={{
              labels: ["Total Completed Tasks", "All Tasks"],
              datasets: [
                {
                  label: "Tasks",
                  data: [task?.map((tas) => tas.status)],
                  backgroundColor: [ "rgba(9, 153, 249, 0.6)", "rgba(7, 250, 250, 0.6)" ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <br/>


        <div>

        </div>
        <br/>


        <div></div>
        
       </div>


    </div>
    
    </main>
  )
}

export default Report;