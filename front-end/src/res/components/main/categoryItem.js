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
                <img className={styles.img} src={img} alt='img'/>
            </div>
            <div className={styles.nameBox}>
                <span className={styles.jua}>{name}</span>
            </div>
        </motion.div>
    );
};

export default CategoryItem;