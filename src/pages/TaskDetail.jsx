import "./taskDetail.css";
import "./dashboard.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTaskForm } from "../Context/TaskFormContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskDetail = () => {
  const { taskId } = useParams();
  console.log(taskId);
  const [task, setTask] = useState([]);
  const [error, setError] = useState();
  const { projects, tasks, loading, teams, owners } = useTaskForm();

  const [editFormModel, setEditFormModel] = useState(false);
  const [form, setForm] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: "",
    timeToComplete: "",
    status: "",
    createdAt: "",
  });

  function handleModifyTask(e) {
    const { name, value, options, multiple } = e.target;

    if (multiple) {
      // owners multi-select
      const selectedValues = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);

      setForm((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      // all other inputs and selects (project, team, status, etc.)
      setForm((prev) => ({
        ...prev,
        [name]: value, // project = "projectId", team = "teamId", etc.
      }));
    }
  }

  useEffect(() => {
    console.log(form, "Updated form");
  }, [form]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    console.log("Submitting form:", form);

    try {
      const res = await axios.put(
        `https://asna-backend.vercel.app/tasks/${taskId}`,
        form
        // {
        //   headers: { "Content-Type": "application/json" },
        // }
      );

      console.log("Update response:", res.data);

      getTask();
      setEditFormModel(false);
      toast.success("Task edited successfully.", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error, "error");
      toast.error("Failed to edit Task.");
    }
  }

  useEffect(() => {
    console.log(form, "djkfdkjf");
  });

  async function getTask() {
    try {
      const res = await axios.get(
        `https://asna-backend.vercel.app/tasks/taskById/${taskId}`
      );
      console.log(res.data, "res");
      setTask(res.data);

      setForm({
        name: res.data.name || "",
        project: res.data.project?._id || "",
        team: res.data.team?._id || "",
        owners: res.data.owners?.map((o) => o._id) || [],
        tags: res.data.tags?.join(", ") || "",
        timeToComplete: res.data.timeToComplete || "",
        status: res.data.status || "",
        createdAt: res.data.createdAt ? res.data.createdAt.slice(0, 10) : "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <main className="OuterCon">
      <div className="projTasksCon">
        <div className="detailHeadTitle">
          <h2 className="headText">Task Details</h2>
        </div>

        <div className="detailHeadTitle">
          <div key={task?._id} className="detailContainer">
            {loading && <p>Task Detail is Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h2>{task?.name}</h2>

            <p>
              <strong>Project: </strong> {task?.project?.name}
            </p>
            <p>
              <strong>Team: </strong> {task?.team?.name}
            </p>
            <p>
              <strong>Owners: </strong>{" "}
              {task?.owners?.map((owner) => owner.name)}
            </p>
            <p>
              <strong>Due Date: </strong> {task?.createdAt}
            </p>
            <p>
              <strong>Status: </strong> {task?.status}
            </p>
            <p>
              <strong>Tag: </strong>
              {task?.tags?.join(", ")}
            </p>
            <p>
              <strong>Time Remaining: </strong> {task?.timeToComplete} Days
            </p>
            <br />
            <div>
              <div>
                <button
                  onClick={() => setEditFormModel(true)}
                  className="editBtn"
                >
                  Edit
                </button>

                {editFormModel && (
                  <div className="modal-overlay">
                    <form className="modal-content" onSubmit={handleFormSubmit}>
                      {/* <div className="fieldCon"></div> */}
                      <div className="fieldCon fielStyl">
                        <label>Task Name: </label>

                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleModifyTask}
                          style={{ fontSize: "14px" }}
                        />
                      </div>
                      <div className="fieldCon fielStyl">
                        <label>Select Project</label>

                        <select
                          name="project"
                          value={form.project}
                          onChange={handleModifyTask}
                        >
                          {projects?.map((proj) => (
                            <option key={proj._id} value={proj._id}>
                              {proj.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="fieldCon fielStyl">
                        <label>Select Team</label>

                        <select
                          name="team"
                          value={form.team}
                          onChange={handleModifyTask}
                        >
                          {teams?.map((tem) => (
                            <option key={tem._id} value={tem._id}>
                              {tem.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="fieldCon fielStyl">
                        <label>Select Owners</label>

                        <select
                          name="owners"
                          value={form.owners}
                          multiple
                          onChange={handleModifyTask}
                        >
                          {owners?.map((own) => (
                            <option key={own._id} value={own._id}>
                              {own.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="fieldCon fielStyl">
                        <label>Due Date</label>

                        <input
                          type="date"
                          name="createdAt"
                          value={form.createdAt}
                          onChange={(e) => handleModifyTask(e)}
                        />
                      </div>

                      <div className="fieldCon fielStyl">
                        <label>Status</label>

                        <select
                          className=" selInp"
                          name="status"
                          value={form.status}
                          onChange={(e) => handleModifyTask(e)}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </div>

                      <div className="fieldCon fielStyl">
                        <label>Tag</label>

                        <input
                          type="text"
                          name="tags"
                          value={form.tags}
                          onChange={(e) => handleModifyTask(e)}
                          style={{ fontSize: "14px" }}
                        />
                      </div>

                      <div className="fieldCon fielStyl">
                        <label>Time Remaining</label>

                        <input
                          type="count"
                          name="timeToComplete"
                          value={form.timeToComplete}
                          onChange={(e) => handleModifyTask(e)}
                          style={{ fontSize: "14px" }}
                        />
                      </div>

                      <div className="projFormBtns">
                        <button type="submit" className="cBtn creatBtn">
                          Save
                        </button>

                        <button
                          type="button"
                          className="cBtn cancelBtn"
                          onClick={() => setEditFormModel(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetail;
