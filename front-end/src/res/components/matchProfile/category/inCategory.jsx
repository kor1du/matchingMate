import { Button } from 'react-bootstrap';
import React from 'react';
import { axiosDelete } from '../../axios/Axios';



const InCategory = (props) => {
    const {interestCategory, setInterestCategory, setModalOpen} = props;

    
    console.log(interestCategory);
    
  

    return (
        <div>
            <h1>관심카테고리 목록</h1>
            {
                interestCategory.map((category)=> 
                    <div key={category.id}>
                        <h2>{category.categoryName}</h2>
                        <h2>{category.region1}</h2>
                        <h2>{category.region2}</h2>
                        <h2>{category.region3}</h2>
                        <Button onClick={()=> categoryDelete(category.id)}>삭제</Button>
                    </div>
                )
            }
            <Button onClick={()=> setModalOpen(true)}>추가 하기</Button>
        </div>
    );
}

export default InCategory;