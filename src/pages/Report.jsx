import "./report.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
  const [completedTasks, setCompletedTasks] = useState();
  console.log(completedTasks, "completedTasks");

  const [allTasks, setAllTasks] = useState();
  const [pendingTask, setPendingTask] = useState();
  const [closedTask, setClosedTask] = useState();

  async function getCompleteTasks() {
    try {
      const compTasks = await axios.get(
        "https://asna-backend.vercel.app/tasks/report/completedTasks"
      );
      console.log(compTasks.data, "khdkjdf");
      setCompletedTasks(compTasks.data.totalCompletedTasks);
      console.log(completedTasks, "data");
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  }

  useEffect(() => {
    getCompleteTasks();
  }, []);

  async function fetchTotalAllTasks() {
    try {
      const res = await axios.get(
        "https://asna-backend.vercel.app/tasks/report/allTasks"
      );
      console.log(res.data, "respopnse");
      setAllTasks(res.data.totalAllTasks);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
    }
  }

  useEffect(() => {
    fetchTotalAllTasks();
  }, []);

  async function getPendingTasks() {
    try {
      const pendingTasks = await axios.get(
        "https://asna-backend.vercel.app/tasks/report/pendingTasks"
      );
      console.log(pendingTasks.data, "khdkjdf");
      setPendingTask(pendingTasks.data.totalPendingTasks);
      console.log(completedTasks, "data");
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  }

  useEffect(() => {
    getPendingTasks();
  }, []);

  async function getBlockedTasks() {
    try {
      const blockedTasks = await axios.get(
        "https://asna-backend.vercel.app/tasks/report/blockedTasks"
      );
      console.log(blockedTasks.data, "khdkjdf");
      setClosedTask(blockedTasks.data.totalBlockedTasks);
      console.log(completedTasks, "data");
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  }

  useEffect(() => {
    getBlockedTasks();
  }, []);

  return (
    <main className="OuterCon">
      <div className="projTasksCon">
        <h1 className="headText">Report Overview</h1>
        <h2>Total Work Done Last Week:</h2>

        <div>
          <div className="chartCon">
            <div style={{ width: "25rem", height: "25rem" }}>
              <Doughnut
                data={{
                  labels: ["Total Completed Tasks", "All Tasks"],
                  datasets: [
                    {
                      label: "Tasks",
                      data: [completedTasks, allTasks],
                      backgroundColor: [
                        "rgba(9, 153, 249, 0.6)",
                        "rgba(7, 250, 250, 0.6)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
          <br />

          <h2>Total Days of Work Pending: </h2>
          <div className="chartCon">
            <div style={{ width: "25rem", height: "25rem" }}>
              <Doughnut
                data={{
                  labels: ["Pending Tasks", "All Tasks"],
                  datasets: [
                    {
                      label: "Tasks",
                      data: [pendingTask, allTasks],
                      backgroundColor: [
                        "rgba(249, 169, 9, 0.6)",
                        "rgba(7, 250, 250, 0.6)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>

          <br />

          <h2>Tasks Closed by Team:</h2>
          <div className="chartCon">
            <div style={{ width: "25rem", height: "25rem" }}>
              <Doughnut
                data={{
                  labels: ["Blocked Tasks", "All Tasks"],
                  datasets: [
                    {
                      label: "Tasks",
                      data: [closedTask, allTasks],
                      backgroundColor: [
                        "rgba(185, 187, 185, 0.6)",
                        "rgba(7, 250, 250, 0.6)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Report;
