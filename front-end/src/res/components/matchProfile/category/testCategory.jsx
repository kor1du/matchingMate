import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Link from "@mui/material/Link";
import Modal from "react-modal";
import InputCategory from "./inputCategory";

const TestCategory = (props) => {
  const { categorys, categoryDelete, setInterestCategory, interestCategory } =
    props;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, [interestCategory]);

  return (
    <>
      <p>관심 카테고리</p>
      <Button variant="dark" onClick={() => setModalOpen(true)}>
        <p>추가하기</p>
      </Button>

      {interestCategory !== null
        ? interestCategory.map((category) => (
            <div key={category.id} className="category">
              <img src={category.categoryImgAddress} alt="" />
              <p>{category.categoryName}</p>
              <Button
                onClick={() => categoryDelete(category.id)}
                variant="danger"
              >
                <p>삭제</p>
              </Button>
            </div>
          ))
        : null}

      <Modal
        isOpen={modalOpen}
        ariaHideApp={false}
        shouldFocusAfterRender={true}
        className={"interest-category-input-modal"}
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
      </Modal>
    </>
  );
};

export default TestCategory;
