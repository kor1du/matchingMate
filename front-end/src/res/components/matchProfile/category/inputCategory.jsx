import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { Button } from "react-bootstrap";

function InputCategory(props) {
  const { categorys, setModalOpen, setInterestCategory } = props;
  const [interestData, setInterestData] = useState({
    categoryId: "",
  });

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const saveInterest = async () => {
    console.log(interestData);
    let rsp = (
      await axios.post("http://localhost:8080/profile/interestCategory/create", interestData, {
        headers: { Authorization: token },
      })
    ).data;
    setModalOpen(false);
    setInterestCategory(rsp.data);
  };

  return (
    <>
      <div className="list">
        <label>
          <p>종목</p>
        </label>
        <Select
          labelId="interestSelect"
          id="demo-simple-select"
          value={interestData.categoryId}
          name="interestId"
          label="interest"
          onChange={(e) => {
            setInterestData({ ...interestData, categoryId: e.target.value });
          }}
          sx={{ marginBottom: 5, textAlign: "left" }}
        >
          {categorys.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button onClick={() => saveInterest()}>
        <p>저장</p>
      </Button>
    </>
  );
}

export default InputCategory;
