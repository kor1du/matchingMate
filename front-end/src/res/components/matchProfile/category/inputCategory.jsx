import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import styles from './category.module.css';
import axios from 'axios';


function InputCategory(props) {

    const {categorys,setModalOpen, setInterestCategory  } = props;
    const [interestData, setInterestData] = useState({
        categoryId: ''
    });

    const token = "Bearer " + sessionStorage.getItem("jwtToken");

    const saveInterest = async () => {
    
        let rsp = (await axios.post("http://localhost:8050/profile/interestCategory/create", interestData, {headers:{'Authorization': token}})).data;
        setModalOpen(false);
        setInterestCategory(rsp.data);

    }

    return (
        <div className={styles.input_container}>
            <Box sx={{ minWidth: 120 }} >
                <FormControl sx={{ width: 350, marginTop: 2 }} >
                    <InputLabel id="interestSelect">종목</InputLabel>
                    <Select
                        labelId="interestSelect"
                        id="demo-simple-select"
                        value={interestData.categoryId}
                        name="interestId"
                        label="interest"
                        onChange={(e) => {
                            setInterestData({ ...interestData, categoryId: e.target.value});
                        }
                        }
                        sx={{marginBottom:5, textAlign:'left'}}
                    >
                        { categorys.map((category) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={()=> saveInterest()} variant="contained">저장</Button>
                </FormControl>
            </Box>
        </div>
    );
}

export default InputCategory;