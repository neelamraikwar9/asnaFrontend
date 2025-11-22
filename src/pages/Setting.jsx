import './setting.css';
import Navbar from "../components/Navbar";
import { useTaskForm } from "../Context/TaskFormContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Setting = () => {
  const { projects, setProjects, tasks, setTasks, loading, error } = useTaskForm();
  console.log(projects, tasks, "chedkfdatkjaj");

 

  async function handleDeleteProjects(e){
    const projId = e.target.value; 
    console.log(projId, "pronkdf");
    try{
      await axios.delete(`https://asna-backend.vercel.app/projects/${projId}`);
      setProjects((prev) => prev.filter((proj) => proj._id !== projId));
      console.log(projects, "kdfkljdfkjdfjkl");

      toast.success("Project deleted successfully!", {
      autoClose: 3000,
      });
    } catch(error){
       console.error("Failed to delete project:", error);
      toast.error("Failed to delete project. Please try again.", {
        autoClose: 3000,
      });
    }
  }



  async function handleDeleteTasks(e) {
  const taskId = e.target.value;
  console.log(taskId, "Task ID to delete");

  try {
    await axios.delete(`https://asna-backend.vercel.app/tasks/${taskId}`);
    // setTasks((prev) => {
    //   const updated = prev.filter((tas) => tas._id !== taskId);
    //   console.log(updated, "Filtered tasks after delete");
    //   return updated;
    // });

     setTasks((prev) => prev.filter((tas) => tas._id !== taskId));
      console.log(tasks, "kdfkljdfkjdfjkl");

    toast.success("Task deleted successfully!", { autoClose: 3000 });
  } catch (error) {
    console.error("Failed to delete task:", error);
    toast.error("Failed to delete Task. Please try again.", { autoClose: 3000 });
  }
}


  return (
    <main className="OuterCon">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="projTasksCon">
      <h1 className="headText">Setting</h1>
      <h2>Manage Projects and Tasks</h2>
         <br/>

      <h2>All Projects({projects.length})</h2>
        <div className="projsCon">
          {loading && <p>Projects are Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}


          {projects.map((proj) => (
            <div className="projCard " key={proj._id} style={{height: '20rem'}}>
              <p
                style={{
                  backgroundColor:
                    proj.status === "Completed"
                      ? "oklch(95% 0.052 163.051)"
                      : proj.status === "In Progress"
                      ? "oklch(97.3% 0.071 103.193)"
                      : "oklch(86.9% 0.022 252.894)",
                }}
              >
                {proj.status}
              </p>
              <h3>{proj.name}</h3>
              <p style={{ fontSize: "0.8rem" }}>{proj.description}</p>
              <div className="delBtnCon">
              <button className="delBtn" value={proj._id} onClick={handleDeleteProjects}>Delete</button>
              </div>
            </div>
          ))}
        </div>
         <br/>
         <br/>
         <br/>


      <h2>All Tasks({tasks.length})</h2>
        <div className="projsCon">
          {loading && <p>Tasks are Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
         
          {tasks.map((tasks) => (
            <div className="projCard tasksCard" key={tasks._id}>
              <p
                style={{
                  backgroundColor:
                    tasks.status === "Completed"
                      ? "oklch(95% 0.052 163.051)"
                      : tasks.status === "In Progress"
                      ? "oklch(97.3% 0.071 103.193)"
                      : "oklch(98.5% 0.002 247.839)",
                }}
              >
                {tasks.status}
              </p>
              <h3>{tasks.name}</h3>

              <p>{new Date(tasks.createdAt).toLocaleDateString()}</p>

               <div className="delBtnCon">
              <button className="delBtn" value={tasks._id} onClick={handleDeleteTasks}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default Setting;
