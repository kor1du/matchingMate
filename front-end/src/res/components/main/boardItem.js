import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './boardItem.module.css'
import { AiOutlineEye } from 'react-icons/ai';


const BoardItem = (props) => {

    const { board, categorys } = props;
    const navigate = useNavigate();


    return (
    <motion.div
        className={styles.box}
        style={{"cursor" : "pointer"}}
        whileHover={{scale: 1.1,  ease: "easeIn", duration: 0.2 }}
        onClick={() => {
            navigate(`/post/${board.id}`, {
                state: { categorys }
            });
        }}
    >
        <div className={styles.summaryInfo}>
                <span>시작 예정일 |</span>
                <span>{board.matchingDate}</span>
            </div>
            <div className={styles.summaryInfo}>
                <span>운동 장소 |</span>
                <span>{board.place}</span>
            </div>
            <div className={styles.summaryInfo}>
                <span>시간 |</span>
                <span>{board.matchingTime}</span>
            </div>
            <div className={styles.summaryInfo}>
                <span>모집 인원 |</span>
                <span>{board.maxNumberOfPeople}</span>
            </div>
            <div className={styles.summaryInfo}>
                <span>추천 실력 |</span>
                <span>{board.recommendedSkill}</span>
            </div>
            <h1 className={styles.title}>{board.postName}</h1>
            <div className={styles.categoryImg}>
                <img className={styles.userImg} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOUBbLZUo5Gif0fPiDwf80LSh-IRbGNy_Zg&usqp=CAU" alt='img'/>
                    <div className={styles.waviy}>
                        <span>{board.inChatNumber} 명 참여중 !</span>
                    </div>
            </div>
            <section className={styles.itemInfo}>
                <div className={styles.userBox}>
                    <img className={styles.userImg} src={board.profileImgAddress} alt='img'/>
                    <div>{board.nickname}</div>
                </div>
                <div className={styles.subInfo}>
                    <div className={styles.infoItem}>
                        <AiOutlineEye
                            size="28px"
                            color="rgb(153,153,153)"
                        />
                        <span>{board.views}</span>
                    </div>
                </div>
            </section>
    </motion.div>
    );
};

export default BoardItem;