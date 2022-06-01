import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { axiosGet } from "../../components/axios/Axios";
// import AddressModal from "../../components/Modal/AddressModal";
// import CheckNickname from "../../components/signup/CheckNickname";
// import styles from './memberProfile.module.css'
// import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddressModal from "../../components/Modal/AddressModal";
import CheckNickname from "../../components/signup/CheckNickname";
import styles from './memberProfile.module.css'
import { useNavigate } from "react-router";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function MemberEdit() {
  const [member, setMember] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const navigate = useNavigate();

  const getMember = () => {
    const header = {
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
    };
    axiosGet("/myAccount", header).then((res) => {
      console.log(res.data.data);
      setMember(res.data.data);
      setNickname(res.data.data.nickname);
      setBirthday(res.data.data.birthday);
      setPhoneNum(res.data.data.phone);
      setAddress(res.data.data.address);
    });
  };

  const updateMember = () => {
    const token =   "Bearer " + sessionStorage.getItem("jwtToken");
    
    if (address == "" || birthday == "" || phoneNum=="" || password=="") 
        alert("빈값 존재함")
    else {

        const data = {
        address: address,
        birthday: birthday,
        name: member.name,
        nickname: nickname,
        phone: phoneNum,
        sex: member.sex,
        userPw: password,
        };

        axios({
            method: "put",
            url: `http://localhost:8080/myAccount/update`,
            data: data,
            headers: {
                Authorization: token,
                "Content-Type": "application/JSON",
            },
        });
    }
  };
  useEffect(() => {
    getMember();
  }, []);

  
    return (
        
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={10}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <ArrowBackIcon className={styles.hvr_grow}  onClick={() => navigate(-1)}/>
            <Typography sx={{paddingLeft:3}} variant="h5" color="inherit" noWrap>
              계정 수정
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={styles.pullDown} component="main" maxWidth="sm" sx={{ mb: 4, boxShadow: 10  }}>
          <Paper style={{marginTop:"50px", marginBottom:"0px"}}  variant="outlined" sx={{ my: { xs: 3, md: 20  }, p: { xs: 2, md: 3 }  }}>
            
                <Typography sx={{paddingTop:3, paddingBottom:8}} component="h1" variant="h4" align="center">
                    <span>{member.name}</span> 님의 계정 정보
                </Typography>

                <Typography sx={{  borderTopColor:'primary.#202020', borderBottom:1, paddingTop:2, paddingBottom:2, marginBottom:10}} component="h5" variant="h6" align="center">
                    <p>아이디 : <span style={{fontSize:35}}>{member.userId}</span></p>
                </Typography>
            
        <React.Fragment>
              
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} sx={{textAlign:"left"}}>
          <TextField
            required
            id="nickname"
            name="nickname"
            label="별명"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            autoFocus
            InputProps={{
                readOnly: true,
              }}
            value={nickname}
            
            onChange={ (e) => {e.preventDefault(); setNickname(e.target.value)}}
          />
          <CheckNickname setNickname={setNickname}></CheckNickname>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="생년월일"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="date"
            value={birthday}

            onChange={ (e) => {e.preventDefault(); setBirthday(e.target.value)}}
          />
        </Grid>
        <Grid  item xs={12}>
          <TextField
            required
            label="새 비밀번호"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="password"
            value={password}

            onChange={ (e) => {e.preventDefault(); setPassword(e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="휴대전화"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"

            value={phoneNum}

            onChange={ (e) => {e.preventDefault(); setPhoneNum(e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="주소"
            name="주소"
            label="주소"
            fullWidth
            InputProps={{
                readOnly: true,
              }}
            autoComplete="shipping address-line1"
            variant="standard"
            value={address}
            onChange={ (e) => {e.preventDefault(); setPassword(e.target.value)}}
          />
          <AddressModal setAddress={setAddress}></AddressModal>
        </Grid>

      </Grid>

                  <Box sx={{  paddingTop:4, display: 'flex', justifyContent: 'flex-end' }}>
                   
                    <Button
                      variant="contained"
                      onClick={updateMember}
                      sx={{ fontSize:15, height:50, mt: 3, ml: 1 }}
                      className={styles.hvr_trim}
                    >
                        수정
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{ fontSize:15, height:50, mt: 3, ml: 1 }}
                      className={styles.hvr_trim}
                    >
                        취소
                    </Button>
                  </Box>
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
      
    );
}