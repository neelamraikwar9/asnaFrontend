import { useParams } from "react-router-dom";


const TaskDetail = () => {
    const { taskId } = useParams();
    console.log(taskId);
  return (
    <div></div>
  )
}

export default TaskDetail;