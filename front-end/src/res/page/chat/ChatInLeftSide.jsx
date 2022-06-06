import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChattingMemberList from '../../components/chatting/YH/ChattingMemberList'
// import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function ChatInLeftSide(props) {
    // eslint-disable-next-line no-unused-vars
    const { stomp, sockJS, myChattingMemberId, newMessage, maxNumberOfPeople, numberOfPeople, memberList, myId, isCompleted, setIsCompleted, roomId, roomHost, disconnectWS, isDarkMode } = props;


    const token = "Bearer " + sessionStorage.getItem("jwtToken");

    const navigate = useNavigate();

    function waitForConnection(ws, callback) {
        setTimeout(
          function () {
            // 연결되었을 때 콜백함수 실행
            if (sockJS.readyState === 1) {
              callback();
              // 연결이 안 되었으면 재호출
            } else {
              waitForConnection(stomp, callback);
            }
          },
          1 // 밀리초 간격으로 실행
        );
      }

    const outRoom = () => {

        if (confirm("정말 채팅방을 나가시겠습니까?")) {
          

          waitForConnection(stomp, function () {
            stomp.send(
              "/pub/chat/out",
              { Authorization: token },
              JSON.stringify({ chattingRoomId:roomId, chattingMemberId:myChattingMemberId })
            );
          }).then(() => {
            navigate("/chat", {state:{isDarkMode:isDarkMode}});
          });

              
        }
    }

    useEffect(() => {
      console.log(newMessage);
    },[isCompleted, newMessage])

    function SetMode (props) {
        const isDarkMode = props.isDarkMode;
        const isCompleted = props.isCompleted;

        
        if (isDarkMode) {
          return (
              <div className='chatting-member-dark'>
                <div className="chatting-left-side">
                    <ArrowBackIcon className="hvr_grow" onClick={() => { navigate("/chat", {state:{isDarkMode:isDarkMode}}); disconnectWS();} }/>

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
                                key={member.memberId}

                                chattingMemberId={member.chattingMemberId}
                                setIsCompleted={setIsCompleted}
                                newMessage={newMessage}
                                numberOfPeople={numberOfPeople} maxNumberOfPeople={maxNumberOfPeople}
                                roomId={roomId}
                                roomHost={roomHost}
                                member={member}
                                isCompleted={isCompleted}
                                myId={myId}
                                stomp={stomp}
                                sockJS={sockJS}

                                isDarkMode={isDarkMode}
                            />
                            );
                        })
                        : null}
                    </div>
                    
                    <div className="chatting-out-container" onClick={outRoom}>
                        <h3>나가기</h3>
                    </div>
                </div>
            </div>
          );
    
        } else {
          return (
              <div className='chatting-member-light'>
            <div className="chatting-left-side">
                <ArrowBackIcon className="hvr_grow" onClick={() => {navigate("/chat"); disconnectWS(); } }/>

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
                            key={member.memberId}

                            chattingMemberId={member.chattingMemberId}
                            setIsCompleted={setIsCompleted}
                            newMessage={newMessage}
                            numberOfPeople={numberOfPeople} maxNumberOfPeople={maxNumberOfPeople}
                            
                            roomId={roomId} roomHost={roomHost}
                            member={member}
                            isCompleted={isCompleted}
                            myId={myId}

                            stomp={stomp}
                            sockJS={sockJS}

                            isDarkMode={isDarkMode}
                        />
                        );
                    })
                    : null}
                </div>

                <div className="chatting-out-container" onClick={outRoom} >
                    <h3>나가기</h3>
                </div>
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

export default ChatInLeftSide;