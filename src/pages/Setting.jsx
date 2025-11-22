import './setting.css';
import Navbar from "../components/Navbar";
import { useTaskForm } from "../Context/TaskFormContext";

const Setting = () => {
  const { projects, tasks, loading, error } = useTaskForm();
  console.log(projects, tasks, "chedkfdatkjaj");

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
              <button className="delBtn">Delete</button>
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
              <button className="delBtn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Setting;
