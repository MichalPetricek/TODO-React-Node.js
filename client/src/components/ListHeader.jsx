import Modal from "./Modal";
import { useState } from "react";

const ListHeader = ({ListName, getData}) => {
    const [modalShow, setModalShow] = useState(false);
    return(
        <>
            <div className="list-header">
                <h1>{ListName}</h1>
                <div className="button-container">
                    <button className="create" onClick={() => setModalShow(true)}>ADD NEW</button>
                </div>
                {modalShow && <Modal mode={"Create"} getData={getData} setModalShow={setModalShow}></Modal>}
            </div>
        </>
    );
}
export default ListHeader;