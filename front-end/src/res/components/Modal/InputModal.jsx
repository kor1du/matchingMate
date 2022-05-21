import { React, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/home-board/homeBoardCreate.css";
import { axiosPost } from "../axios/Axios";
import ChattingAddressModal from "../chatting/YH/ChattingAddressModal";

export default function InputModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const roomId=props.roomId;
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const postData=()=>{
    const data={
      chattingRoomId:roomId,
      matchingTime:time,
      place:address,
    }
    console.log(data.matchingTime);
    axiosPost("/chat/in/complete",data).then((res)=>{
      console.log(res);
    });
  }
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (props.show) {
      setShow(true);
    }
  }, [props.show]);
  return (
    <>
      <Modal show={show} centered={true} className="input-modal">
        <Modal.Header>
          <p>시간과 장소를 입력해주세요!</p>
        </Modal.Header>
        <Modal.Body>
          <span>시간 : </span>
          <input type="time" value={time} onChange={(e)=>setTime(e.target.value)}/>
          <br></br>
          <span>장소 : </span>
          <input
            type="text"
            readOnly
            value={address}
            className="address-input"
          />
          <Button
            onClick={() => {
              setModalOpen(() => true);
            }}
          >
            <p>주소찾기</p>
          </Button>
          <ChattingAddressModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setAddress={setAddress}
          ></ChattingAddressModal>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={()=>postData()}><p>전송</p></Button>
          <Button variant="secondary" onClick={handleClose}>
           <p>닫기</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
