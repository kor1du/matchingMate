import React, { useEffect, } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChattingMemberList from './ChattingMemberList';

function ChatMemberList(props) {
    const { myChattingMemberId, newMessage, sockJS, stomp, maxNumberOfPeople, numberOfPeople, memberList, myId, isCompleted, setIsCompleted, setShowMessage, roomId, roomHost, disconnectWS, isDarkMode} = props;

    const token = "Bearer " + sessionStorage.getItem("jwtToken");

    const navigate = useNavigate();

    useEffect(() => {
    },[isCompleted, newMessage])

    const outRoom = () => {

        if (confirm("정말 채팅방을 나가시겠습니까?")) {
            axios.post("http://kor1du.gonetis.com:8080/chat/out/" + myChattingMemberId, 
                null,
                {headers:{Authorization:token}})
            .then((res) => {
                console.log(res.data);
                
            })
            navigate("/chat")
        }
    }

    function SetMode (props) {
        const isDarkMode = props.isDarkMode;
        const isCompleted = props.isCompleted;

        
        if (isDarkMode) {
          return (
              <div className='chatting-member-dark'>
                <div className="chatting-left-side">
                    <ArrowBackIcon className="hvr_grow" onClick={() => {setShowMessage(false); disconnectWS();} }/>

                    <div style={{textAlign:"center"}}>
                    {
                        isCompleted === 0 
                        ?
                            <h4>{numberOfPeople} / {maxNumberOfPeople}</h4>
                        :
                            <h4>완료된 매칭입니다.</h4>
                    }
                    </div>

                    <div className="chatting-member-list">
                    {memberList.length > 0
                        ? memberList.map((member) => {
                            return (
                            <ChattingMemberList
                                setIsCompleted={setIsCompleted}
                                newMessage={newMessage}
                                stomp={stomp}
                                sockJS={sockJS}
                                maxNumberOfPeople={maxNumberOfPeople}
                                numberOfPeople={numberOfPeople}
                                key={member.memberId}
                                roomId={roomId}
                                roomHost={roomHost}
                                member={member}
                                isCompleted={isCompleted}
                                myId={myId}
                            />
                            );
                        })
                        : null}
                    </div>

                    
                </div>
            </div>
          );
    
        } else {
          return (
              <div className='chatting-member-light'>
            <div className="chatting-left-side">
                <ArrowBackIcon className="hvr_grow" onClick={() => {setShowMessage(false); disconnectWS(); } }/>

                <div style={{textAlign:"center"}}>
                {
                    isCompleted === 0 
                    ?
                        <h4>{numberOfPeople} / {maxNumberOfPeople}</h4>
                    :
                    <h4>완료된 매칭입니다.</h4>
                }
                
                </div>

                <div className="chatting-member-list">
                { memberList.length > 0
                    ? memberList.map((member) => {
                        return (
                        <ChattingMemberList
                            setIsCompleted={setIsCompleted}
                            newMessage={newMessage}
                            stomp={stomp}
                            sockJS={sockJS}
                            maxNumberOfPeople={maxNumberOfPeople}
                            numberOfPeople={numberOfPeople}
                            key={member.memberId}
                            roomId={roomId}
                            roomHost={roomHost}
                            member={member}
                            isCompleted={isCompleted}
                            myId={myId}
                        />
                        );
                    })
                    : null}
                </div>

                {/* <button  onClick={() => { outRoom(); }}> */}
                    <div className="chatting-out-container" onClick={outRoom}>
                        <h3>나가기</h3>
                    </div>
                {/* </button> */}
            </div>
            </div>
          );
        }
    
      }

    
    return (
        <div>
            <SetMode isCompleted={isCompleted} isDarkMode={isDarkMode}/>
            
        </div>
    );
}

export default ChatMemberList;