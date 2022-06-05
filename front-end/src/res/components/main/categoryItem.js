import React from 'react';
import styles from './categoryItem.module.css'
import { motion } from 'framer-motion';

const CategoryItem = (props) => {

    const {id,name , img, changeCategory} = props;

    return (
        <motion.div className={styles.container}
            style={{"cursor" : "pointer"}}
            whileHover={{scale: 1.1}}
            onClick={() => changeCategory(id)}    
        >
            <div className={styles.imgBox}>
                <img className={styles.img} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOUBbLZUo5Gif0fPiDwf80LSh-IRbGNy_Zg&usqp=CAU' alt='img'/>
            </div>
            <div className={styles.nameBox}>
                <span>{name}</span>
            </div>
        </motion.div>
    );
};

export default CategoryItem;