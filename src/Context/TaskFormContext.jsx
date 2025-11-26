import { createContext, useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TaskFormContext = createContext();

export const useTaskForm = () => useContext(TaskFormContext);

export const TaskFormProvider = ({ children }) => {
  const [taskForm, setTaskForm] = useState(false);
  const [teams, setTeams] = useState([]);
  const [owners, setOwners] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filStatus, setFilStatus] = useState([]);
  

  const [tForm, setTForm] = useState({
    name: "",
    project: "",
    team: "",
    owners: "",
    tags: "",
    timeToComplete: "",
    status: "",
    createdAt: "",
  });

  function handleTaskOnChange(e) {
    const { name, value } = e.target;
    setTForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleTaskSubmit(e) {
    e.preventDefault();
    console.log(tForm, "submitting form...");

    const subTForm = { ...tForm, tags: tForm.tags ? [tForm.tags] : [] };
    console.log(subTForm, "checkignsubtform");

    try {
      const res = await axios.post(
        "https://asna-backend.vercel.app/tasks",
        JSON.stringify(subTForm),
        {
          headers: { "content-Type": "application/json" },
        }
      );
      console.log(res.data, "Details added successfully");
      toast.success("Task Added successfully.");

      setTForm({
        name: "",
        project: "",
        team: "",
        owners: "",
        tags: "",
        timeToComplete: "",
        status: "",
        createdAt: "",
      });

      setTaskForm(false);
      getTasks();
    } catch (error) {
      console.log(error, "Error Submitting Task.");

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

  async function fetchData() {
    try {
      const resTeam = await axios.get("https://asna-backend.vercel.app/teams");
      setTeams(resTeam.data);
      setLoading(false);

      const resOwner = await axios.get("https://asna-backend.vercel.app/users");
      setOwners(resOwner.data);
      setLoading(false);

      const resProjs = await axios.get(
        "https://asna-backend.vercel.app/projects"
      );
      console.log(resProjs.data);
      setProjects(resProjs.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message, "Error message");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getTasks() {
    try {
      const resTasks = await axios.get("https://asna-backend.vercel.app/tasks");
      console.log(resTasks.data);
      setTasks(resTasks.data);
      console.log(tasks, "checking tasks... ");

      setFilStatus(resTasks.data);
      setLoading(false);
      console.log(tasks, "checking tasks");
    } catch (error) {
      console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskFormContext
      value={{
        tForm,
        handleTaskOnChange,
        handleTaskSubmit,
        taskForm,
        setTaskForm,
        teams,
        setTeams,
        loading,
        setLoading,
        owners,
        setOwners,
        projects,
        setProjects,
        getTasks,
        tasks,
        setTasks,
        filStatus,
        setFilStatus,
      }}
    >
      {children}
    </TaskFormContext>
  );
};
