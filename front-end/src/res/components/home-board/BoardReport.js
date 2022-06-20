import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import styles from './BoardReport.module.css';


const BoardReport = (props) => {

  const { reportInfo, setReportInfo } = props;



  return (
    <div className={styles.reportBox}>
      <ul className={styles.ul}>
        <li className={styles.infoItem}>
          <label>신고 분류</label>
          <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
            <FormControl sx={{ width: 350, marginTop: 2 }} >
              <InputLabel id="recruitSelect" style={{ zIndex: "-1" }}>어떤 문제가 있나요?</InputLabel>
              <Select
                labelId="recruitSelect"
                id="maxNumberOfPeopleSelect"
                value={reportInfo.reportClassify}
                name="maxNumberOfPeople"
                label="recruitSelect2"
                onChange={(e) => setReportInfo({ ...reportInfo, reportClassify: e.target.value })}
              >
                <MenuItem value={"욕설"}>욕설/혐오를 포함하고 있습니다.</MenuItem>
                <MenuItem value={"음란성"}>음란성 게시글입니다.</MenuItem>
                <MenuItem value={"불법"}>불법정보를 포함하고 있습니다.</MenuItem>
                <MenuItem value={"개인정보"}>개인정보를 노출하고 있습니다.</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </li>
        <li>
          <label>상세 내용</label>
          <Box sx={{ width: "100%", height: "400px" }}>
            <TextField
              id="outlined-basic"
              label="상세내용"
              variant="outlined"
              value={reportInfo.contents}
              name="reportContents"
              onChange={(e) => setReportInfo({ ...reportInfo, contents: e.target.value })}
              className={styles.contents}
              multiline
              rows={3}
            />
          </Box>
        </li>
      </ul>
    </div>
  );
};

export default BoardReport;