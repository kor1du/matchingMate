import React from 'react';
import styles from './userProfile.module.css';

const UserProfile = (props) => {
  const {member} = props;
  return (
    <div className={styles.profile}>
            <div>
              <div>
                <span>[프로필]</span>
              </div>
              <div>
                <span>닉네임 :  {member.nickname}</span>
              </div>
              <div>
                <span>관심 카테고리 : 축구</span>
              </div>
            </div>
            
          </div>
  );
};

export default UserProfile;