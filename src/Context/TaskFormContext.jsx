import { createContext, useContext, useState } from "react";

const tskFormContext = createContext();

export const useTaskForm = () => useContext(tskFormContext);

export const TaskFormContext = () => {
  return (
    <div>TaskFormContext</div>
  )
}

export default TaskFormContext