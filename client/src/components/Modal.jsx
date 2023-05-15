import { useState } from "react";
import axios from "axios";

const Modal = ({mode, setModalShow, task, getData}) => {
    const editMode = mode === "Edit"? true : false;
    const [data,setData] = useState({
        userEmail: 'michal@test.cz',
        title: editMode? task.title : "",
        progress: editMode? task.progress : "50",
        date: editMode ? task.date : new Date()
    });
    //ADD
    const postData = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/todos", data, {
            headers: { "Content-Type": "application/json" }
          });
          if (response.status === 200) {
            console.log("success");
            setModalShow(false);
            getData();
          }
        } catch (err) {
          console.error(err);
          console.log("error");
        }
      };
    //EDIT
    const editData = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:8000/todos/${task.id}`, data, {
            headers: { "Content-Type": "application/json" }
          });
          if (response.status === 200) {
            console.log("success");
            setModalShow(false);
            getData();
          }
        } catch (err) {
          console.error(err);
          console.log("error");
        }
      };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
          ...data,
            [name] : value
        });
    }
    return(
        <>
            <div className="overlay">
                <div className="modal">
                    <div className="form-title-container">
                        <h3>{mode} new task</h3>
                        <button onClick={() => setModalShow(false)}>X</button>
                    </div>
                    <form>
                        <input 
                        required
                        maxLength={30}
                        placeholder="Your task"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        />
                        <br/>
                        <label for="range">Select your progress</label>
                        <input 
                        required
                        type="range"
                        id="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={data.progress}
                        onChange={handleChange}
                        />
                        <input id="add" className={mode} type="submit"  onClick={editMode? editData : postData}/>

                    </form>
                </div>
            </div>
        </>
    );
}
export default Modal;