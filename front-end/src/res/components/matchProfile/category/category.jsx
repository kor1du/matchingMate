import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosGet } from '../../axios/Axios';
import NoCategory from './noCategory';
import InCategory from './inCategory';
import InputCategory from './inputCategory';

const Category = () => {
  const [interestCategory, setInterestCategory] = useState({
    id:null,
    categoryId:null,
    categoryName:null,
    region1:null,
    region2:null,
    region3:null
  });
  const [state, setState] = useState("");
  const token = "Bearer " + sessionStorage.getItem("jwtToken");


  const readInterestCategory = async () => {
    const res = await (await axiosGet("/profile/interestCategory",{Authorization: token})).data; 

      console.log(res);

      setInterestCategory(res.data);

      res.data==null?
      setState("empty"):
      setState("exist");

  };

  const Show = () => {
    if (state=="empty") {
      return <NoCategory setState={setState}/>
    } else if (state=="exist") {
      return <InCategory interestCategory={interestCategory}/>
    } else if (state=="input") {
      return <InputCategory setState={setState} setInterestCategory={setInterestCategory}/>
    }
  };

  useEffect(() => {
    readInterestCategory();
  }, []);
  
  return (
    <div>
      <Show />
    </div>
  );
};

export default Category;