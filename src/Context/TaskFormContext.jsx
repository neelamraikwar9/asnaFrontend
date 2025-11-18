import { createContext, useContext } from "react";
import axios from 'axios';
import { useState } from 'react';

const TaskFormContext = createContext();

export const useTaskForm = () => useContext(TaskFormContext);

export const TaskFormProvider = ( { children }) => {
  
const [tForm, setTForm] = useState({
  name: "",
  project: "",
  team: "",
  owners: "",
  tags: "",
  timeToComplete: "",
  status: "",
  createdAt: ""
});


function handleTaskOnChange(e){
  const {name, value} = e.target; 
  setTForm((prev) => ({...prev, [name] : value}))
}


async function handleTaskSubmit(e){
  e.preventDefault();
  console.log(tForm, "submitting form...")

  const subTForm = {...tForm, tags: tForm.tags ? [tForm.tags] : [] };
  console.log(subTForm, "checkignsubtform")

  try{
    const res = await axios.post("https://asna-backend.vercel.app/tasks", JSON.stringify(subTForm), {
      headers: {"content-Type" : "application/json"}
    });
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
      createdAt: ""
    })
  }  catch(error){
  console.log(error, "Error Submitting Task.")

  if(error.response){
    console.error("Server error:", error.response.data);
    console.error("Status:", error.response.status);
    alert(` Error: ${error.response.data.message || "Failed to add lead"}`);
  } else if(error.request){
    console.error("Network error:", error.request);
    alert("Network error: Please check your internet connection.");
  }  else {
        console.error("Error:", error.message);
        alert(` Error: ${error.message}`);
      }
}
}





  return (
    <TaskFormContext value={{ tForm, handleTaskOnChange, handleTaskSubmit}}>
        {children}
    </TaskFormContext>
  )
}
