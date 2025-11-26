import "./dashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTaskForm } from "../Context/TaskFormContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [error, setError] = useState();

  const [filProjects, setFilProjects] = useState([]);
  const [filTasks, setFilTasks] = useState([]);

  const [projForm, setProjForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tasks based on the search term (e.g., searching by task name)
  // const filteredTasks = tasks.filter((task) => {
  //   console.log(task.status.toLowerCase());

  //   return task.status.toLowerCase().includes(searchTerm.toLowerCase());
  // });
  // console.log(filteredTasks, "filteredTasks");

  // useEffect(() => {
  //   setFilTasks(filteredTasks);
  // }, [searchTerm]);

  // const filteredProjects = projects.filter((proj) =>
  //   proj.status.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // console.log(filteredProjects, "filteredProjects");

  // useEffect(() => {
  //   setFilTasks(filteredProjects);
  // }, [searchTerm]);

  function getSearchItem() {
    const filteredTasks = tasks.filter((task) =>
      // console.log(task.status.toLowerCase());
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProjects = projects.filter((proj) =>
      proj.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredProjects, "filteredProjects");

    const combineState = [...filteredTasks];
    console.log(combineState, "combineState");

    setFilTasks(combineState);
  }

  useEffect(() => {
    getSearchItem();
  }, [searchTerm]);

  const {
    tForm,
    handleTaskOnChange,
    handleTaskSubmit,
    taskForm,
    setTaskForm,
    teams,
    loading,
    setLoading,
    owners,
  } = useTaskForm();

  const [pForm, setpForm] = useState({
    name: "",
    description: "",
    technologies: "",
    status: "",
  });

  function handleProjOnChange(e) {
    const { name, value } = e.target;
    setpForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleProjSubmit(e) {
    e.preventDefault();

    console.log(pForm, "checkingpform");

    try {
      const response = await axios.post(
        "https://asna-backend.vercel.app/projects",
        JSON.stringify(pForm),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data, "Details added successfully");
      toast.success("Project Added successfully.");

      setpForm({
        name: "",
        description: "",
        technologies: "",
        status: "",
      });

      setProjForm(false);
      fetchProjects();
    } catch (error) {
      console.log(error, "Error Submitting Project.");

      if (error.response) {
        console.error("Server error:", error.response.data);
        console.error("Status:", error.response.status);
        alert(` Error: ${error.response.data.message || "Failed to add lead"}`);
      } else if (error.request) {
        console.error("Network error:", error.request);
        alert("Network error: Please check your internet connection.");
      } else {
        console.error("Error:", error.message);
        alert(` Error: ${error.message}`);
      }
    }
  }

  async function fetchProjects() {
    try {
      const resProjs = await axios.get(
        "https://asna-backend.vercel.app/projects"
      );
      console.log(resProjs.data);
      setProjects(resProjs.data);
      setFilProjects(resProjs.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function getTasks() {
    try {
      const resTasks = await axios.get("https://asna-backend.vercel.app/tasks");
      console.log(resTasks.data);
      setTasks(resTasks.data);
      setFilTasks(resTasks.data);
      console.log(tasks, "checking tasks");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function handleProjFilter(e) {
    const statusOption = e.target.value;

    try {
      const projStatus = await axios.get(
        `https://asna-backend.vercel.app/projects/status/${statusOption}`
      );
      console.log(projStatus.data, "proj");
      setFilProjects(projStatus.data);
      console.log(filProjects, "filProjects");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleTaskFilter(e) {
    const taskOption = e.target.value;
    try {
      const taskStatus = await axios.get(
        `https://asna-backend.vercel.app/tasks/status/${taskOption}`
      );
      console.log(taskStatus.data, "tasksstatus");
      setFilTasks([taskStatus.data]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="OuterCon">
      <div className="projTasksCon">
        <div className="searchBarCon">
          <input
            type="search"
            placeholder="Search..."
            className="searchInp"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="./icons/searchbar.png"
            alt="searchbar icon"
            style={{
              width: "1.6rem",
              height: "1.6rem",
              position: "absolute",
              left: "57rem",
              marginTop: "0.2rem",
            }}
          />
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
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div
              className="projBtnCon"
              style={{ width: "31rem", paddingLeft: "2rem" }}
            >
              <button className="newProjBtn" onClick={() => setProjForm(true)}>
                {" "}
                + New Project
              </button>
            </div>

            {projForm && (
              <div className="modal-overlay">
                <form className="modal-content" onSubmit={handleProjSubmit}>
                  <h2>Create New Project</h2>

                  <div className="fieldCon">
                    <div className="projName">
                      <label>Project Name</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Enter Project Name"
                        className="inp nameInp"
                        name="name"
                        value={pForm.name}
                        onChange={handleProjOnChange}
                      />
                    </div>

                    <div className="projDes">
                      <label>Project Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Enter Project Description"
                        className="inp desInp"
                        name="description"
                        value={pForm.description}
                        onChange={handleProjOnChange}
                      />
                    </div>

                    <div className="margtop">
                      <label>Technologies</label>
                      <input
                        type="text"
                        placeholder="write technologies included"
                        className="inp nameInp"
                        name="technologies"
                        value={pForm.technologies}
                        onChange={handleProjOnChange}
                      />
                    </div>

                    <div className="margtop">
                      <label>Select Status</label>
                      <select
                        className=" selInp"
                        name="status"
                        value={pForm.status}
                        onChange={handleProjOnChange}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                  </div>

                  <div className="projFormBtns">
                    <button
                      className="cBtn cancelBtn"
                      onClick={() => setProjForm(false)}
                    >
                      Cancel
                    </button>
                    <button className="cBtn creatBtn" type="submit">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="projsCon">
            {loading && <p>Projects are Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* {projects.slice(0, 3).map((proj) =>  */}

            {filProjects.map((proj) => (
              <div className="projCard" key={proj._id}>
                <p
                  style={{
                    backgroundColor:
                      proj.status === "Completed"
                        ? "oklch(95% 0.052 163.051)"
                        : proj.status === "In Progress"
                        ? "oklch(97.3% 0.071 103.193)"
                        : proj.status === "To Do"
                        ? "oklch(86.9% 0.022 252.894)"
                        : "oklch(80.8% 0.114 19.571)",
                  }}
                >
                  {proj.status}
                </p>
                <h3>{proj.name}</h3>
                <p style={{ fontSize: "0.8rem" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="container">
            <h2 className="headText">Tasks</h2>
            <div className="filCon">
              <label>Filter</label>
              <select className="select" onChange={handleTaskFilter}>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="To Do">To Do</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div className="projBtnCon">
              <button className="newProjBtn" onClick={() => setTaskForm(true)}>
                {" "}
                + New Task
              </button>
            </div>

            {taskForm && (
              <div className="modal-overlay">
                <div className="modal-content modConPadding">
                  <h2 className="createTskTitle">Create New Task</h2>
                  <form className="taskForm" onSubmit={handleTaskSubmit}>
                    <div className="field remSpace">
                      <label>Select Project</label>
                      <br />
                      <select
                        className="inpField"
                        name="project"
                        value={tForm?.project}
                        onChange={handleTaskOnChange}
                      >
                        {loading && <p>projects are loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {projects.map((project) => (
                          <option key={project._id} value={project._id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field remSpace">
                      <label>Task Name</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Enter Task Name"
                        className="userInpfield"
                        name="name"
                        value={tForm?.name}
                        onChange={handleTaskOnChange}
                      />
                    </div>

                    <div className="field remSpace">
                      <label>Select Team</label>
                      <br />
                      <select
                        className="inpField"
                        name="team"
                        value={tForm?.team}
                        onChange={handleTaskOnChange}
                      >
                        {loading && <p>projects are loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {teams.map((team) => (
                          <option key={team._id} value={team._id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field remSpace">
                      <label>Select Owner</label>
                      <br />
                      <select
                        className="inpField"
                        name="owners"
                        value={tForm?.owners}
                        onChange={handleTaskOnChange}
                      >
                        {loading && <p>projects are loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {owners.map((owner) => (
                          <option key={owner._id} value={owner._id}>
                            {owner.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field remSpace">
                      <label>Select Status</label>
                      <br />
                      <select
                        className="inpField remSpace"
                        name="status"
                        value={tForm?.status}
                        onChange={handleTaskOnChange}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>

                    <div className="field remSpace">
                      <label>Tags</label>
                      <input
                        type="text"
                        placeholder="Enter Tag Name"
                        className="userInpfield"
                        name="tags"
                        value={tForm?.tags}
                        onChange={handleTaskOnChange}
                      />
                    </div>

                    <div className="field remSpace">
                      <label>Select Due Date</label>
                      <input
                        type="date"
                        placeholder="Select date"
                        className="userInpfield"
                        name="createdAt"
                        value={tForm?.createdAt}
                        onChange={handleTaskOnChange}
                      />
                    </div>

                    <div className="field remSpace">
                      <label>Estimated Time</label>
                      <input
                        type="number"
                        placeholder="Enter Time in Days."
                        className="userInpfield"
                        name="timeToComplete"
                        value={tForm?.timeToComplete}
                        onChange={handleTaskOnChange}
                      />
                    </div>

                    <div className="projFormBtns leftSide">
                      <button
                        className="cBtn cancelBtn"
                        onClick={() => setTaskForm(false)}
                      >
                        Cancel
                      </button>
                      <button className="cBtn creatBtn" type="submit">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="projsCon">
            {loading && <p>Tasks are Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* {tasks.slice(0, 3).map((task) =>  */}

            {/* //now it becomes object after filtering so it will not run on map. */}
            {filTasks.map((tasks) => (
              <div className="projCard tasksCard" key={tasks._id}>
                <p
                  style={{
                    backgroundColor:
                      tasks.status === "Completed"
                        ? "oklch(95% 0.052 163.051)"
                        : tasks.status === "In Progress"
                        ? "oklch(97.3% 0.071 103.193)"
                        : tasks.status === "To Do"
                        ? "oklch(86.9% 0.022 252.894)"
                        : "oklch(80.8% 0.114 19.571)",
                  }}
                >
                  {tasks.status}
                </p>
                <h3>{tasks.name}</h3>
                {/* <p>Due On: {task.createdAt}</p> */}
                <p>{new Date(tasks.createdAt).toLocaleDateString()}</p>
                {/* <p><strong>Team Name: </strong>{task.team.map((t) => t.name)}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
