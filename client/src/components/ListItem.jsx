import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const ListItem = ({task, getData,}) => {
    const [modalShow, setModalShow] = useState(false);

        //DELETE
        const deleteData = async (e) => {
            e.preventDefault();
            try {
              const response = await axios.delete(`http://localhost:8000/todos/${task.id}`, {
                headers: { "Content-Type": "application/json" }
              });
              if (response.status === 200) {
                console.log("success");
                getData();
              }
            } catch (err) {
              console.error(err);
              console.log("error");
            }
          };
    return(
        <>
            <li className="list-item">
                <div className="info-container">
                    <TickIcon></TickIcon>
                    <p className="task-title">{task.title}</p>
                    <ProgressBar progress={task.progress}></ProgressBar>
                </div>
                <div className="button-container">
                    <button className="edit" onClick={() => setModalShow(true)}>EDIT</button>
                    <button className="delete" onClick={deleteData}>DELETE</button>
                </div>
                {modalShow && <Modal mode="Edit" getData={getData} setModalShow={setModalShow} task={task}></Modal>}
            </li>
        </>
    );
}
export default ListItem;