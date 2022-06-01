import React, {useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import Link from '@mui/material/Link';
import Modal from "react-modal";
import InputCategory from "./inputCategory";


const TestCategory = (props) => {

  const {categorys,categoryDelete,setInterestCategory,interestCategory} = props;


  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    
  }, [interestCategory])

  return (
    <div>
      <div>
            
            { 

              interestCategory===null  ?  
              <div>
                <img src="https://i.ibb.co/9G4hw6C/oops.png" alt="oops" border="0"/>
                <h3>관심 카테고리가 없습니다.</h3>
                <h3>추가하실려면  <Link onClick={()=> setModalOpen(true)}>여기</Link>를 눌러주세요!</h3>
              </div> 
              : 
                interestCategory.map((category)=> 
                    <div key={category.id}>
                        <h2>{category.categoryName}</h2>
                        <h2>{category.region1}</h2>
                        <h2>{category.region2}</h2>
                        <h2>{category.region3}</h2>
                        <Button onClick={()=> categoryDelete(category.id)}>삭제</Button>
                        <Button onClick={()=> setModalOpen(true)}>추가 하기</Button>
                    </div>
                )
            }
        </div>
        <Modal
              isOpen={modalOpen}
              ariaHideApp={false}
              shouldFocusAfterRender={true}
              onRequestClose={() => setModalOpen(false)}
              style={{
              overlay: {
                  position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(126, 147, 149, 0.83)",
                  },
                  content: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #ccc",
                    background: "#fff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px",
                    width: "600px",
                    height: "600px",
                  },
                }}
              >
                <InputCategory 
                  categorys={categorys} 
                  interestCategory={interestCategory} 
                  setInterestCategory={setInterestCategory} 
                  setModalOpen={setModalOpen}
                />
                <button onClick={() => setModalOpen(false)}>닫기</button>
        </Modal>
    </div>
    
  );
};

export default TestCategory;