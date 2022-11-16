import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import styles from "./notice.module.css";
import { axiosGet } from "../../components/axios/Axios";
import { Radio } from "./radio";

const Notice = () => {
  const [selected, setSelected] = useState("report");
  const [noticeList, setNoticeList] = useState([]);
  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const readNoticeList = async () => {
    const res = await (await axiosGet("/profile/notification/report", { Authorization: token })).data;
    console.log(res);

    setNoticeList(res.data);
  };

  const changeSelect = async (event, value) => {
    console.log(value);
    setSelected(value);
    event.preventDefault();

    if (value == "interest") {
      const res = await (await axiosGet("/profile/notification/interest", { Authorization: token })).data;

      console.log(res);

      setNoticeList(res.data);
    } else if (value == "report") {
      const res = await (await axiosGet("/profile/notification/report", { Authorization: token })).data;

      console.log(res);

      setNoticeList(res.data);
    }
  };

  useEffect(() => {
    readNoticeList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.radioBox}>
        <Radio
          value="report"
          selected={selected}
          text="신고 알림 내역"
          onChange={setSelected}
          onClick={(event, value) => changeSelect(event, value)}
        />
        <Radio
          value="interest"
          selected={selected}
          text="관심 공고 알림 내역"
          onChange={setSelected}
          onClick={(event, value) => changeSelect(event, value)}
        />
      </div>

      <Table className={styles.noticeTable} striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>알림 종류</th>
            <th>알림 내용</th>
            {selected == "interest" ? <th className={styles.url}>바로가기</th> : null}
          </tr>
        </thead>

        <tbody>
          {noticeList.map((notice, i) => (
            <tr key={notice.id}>
              <td>{i + 1}</td>
              <td>{notice.notificationType}</td>
              <td className={styles.message}>{notice.message}</td>
              {selected == "interest" ? <td className={styles.url}>{notice.url}</td> : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notice;

