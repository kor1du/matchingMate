import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
// import styles from '../matchHistory/historyMateItem.module.css'
import axios from "axios";
import styles from "./ReportModal.module.css";

function ReportModal(props) {
  const { infoShow, setInfoShow, memberNickname, reportType, targetId } = props;

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const [contents, setContents] = useState("");
  const [reportClassify, setReportClassify] = useState("");

  const changeReportClassify = (e) => {
    e.preventDefault();

    setReportClassify(e.target.value);
  };

  const changeContents = (e) => {
    e.preventDefault();
    setContents(e.target.value);
  };

  const sendReport = () => {
    console.log(reportType);
    axios
      .post(
        " https://2adb-60-253-18-218.jp.ngrok.io/report/create",
        {
          targetMemberNickname: memberNickname,
          reportType: reportType,
          reportClassify: reportClassify,
          contents: contents,
          targetId: targetId,
        },

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        alert("처리완료되었습니다.");
      })
      .then(() => {
        setInfoShow(false);
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          alert(error.response.data.message);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Modal sx="500" sm="6" lg="10" show={infoShow} centered={true}>
      <Modal.Header>
        <p>신고하기</p>

        <p>신고대상 : {memberNickname}</p>
      </Modal.Header>
      <Modal.Body>
        <p>
          신고분류 :
          <Box>
            <FormControl sx={{ width: "100%", marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">신고분류</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reportClassify}
                label="신고분류"
                onChange={changeReportClassify}
              >
                <MenuItem value={"비매너"}>비매너</MenuItem>
                <MenuItem value={"욕설"}>욕설</MenuItem>
                <MenuItem value={"음란"}>음란</MenuItem>
                <MenuItem value={"광고"}>광고</MenuItem>
                <MenuItem value={"기타"}>기타</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </p>

        <Box sx={{ width: "100%", marginTop: 5 }}>
          <TextField
            id="outlined-basic"
            label="내용"
            variant="outlined"
            value={contents}
            name="postContents"
            onChange={changeContents}
            // className={styles.contents}
            multiline
            rows={10}
            maxRows={15}
            sx={{ width: "100%" }}
          />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.btnBox}>
          <Button
            onClick={() => {
              sendReport();
            }}
          >
            등록
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              setInfoShow(false);
            }}
          >
            닫기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;
