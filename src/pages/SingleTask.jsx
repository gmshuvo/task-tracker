import { useParams } from "react-router-dom";
import WeeklyBarChart from "../components/WeeklyBarChart";
import FetchData from "../utils/FetchData";
import { useEffect, useState } from "react";

const SingleTask = () => {
  const {id} = useParams();

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await FetchData(`http://localhost:3010/tasks/${id}`);
        if (error) {
          console.error("Error fetching tasks:", error);
          return;
        }
        setTask(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
   
    fetchTasks();
    return () => {
      setTask(null);
    }
  }, [id]);

  return (
    <>
    <div className=' w-full h-full flex flex-col items-center justify-center'>
      <h1 className='mt-10 text-2xl font-semibold '>Total activity in last 7 days</h1>
    </div>
    <WeeklyBarChart task={task}/>
    </>
    
  );
}

export default SingleTask;