import React from 'react';
import styles from './category.module.css';
import Link from '@mui/material/Link';
// import InputCategory from "./inputCategory";

function noCategory(props) {

    const goInputCategory = () => {
        props.setState("input");
    }

    return (
        <div className={styles.noCategory_container}>
            
            <img src="https://i.ibb.co/9G4hw6C/oops.png" alt="oops" border="0"/>
            <h3>관심 카테고리가 없습니다.</h3>
            <h3>추가하실려면  <Link onClick={goInputCategory}>여기</Link>를 눌러주세요!</h3>
            {/* <button onClick={goInputCategory}>입력하기</button> */}
            {/* <div>
                <InputCategory />
            </div> */}
        </div>
    );
}

export default noCategory;