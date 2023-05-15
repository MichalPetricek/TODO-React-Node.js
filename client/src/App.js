import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import axios from "axios";
import ListItem from "./components/ListItem";

function App() {
    const userEmail = "michal@test.cz"
    const [tasks,setTasks] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/todos/${userEmail}`);
      const data = await response.data;
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => getData, [])
    
  console.log(tasks);
  const sortedTask = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="App">
      <ListHeader ListName={"Tasks"} getData={getData}></ListHeader>
      {sortedTask?.map((task) => <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
    </div>
  );
}

export default App;
