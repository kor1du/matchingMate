import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChattingMemberList from '../../components/chatting/YH/ChattingMemberList'

function ChatMemberList(props) {
    const {memberList, myId, isCompleted, setShowMessage, roomId, roomHost, disconnectWS, isDarkMode} = props;

    function SetMode (props) {
        const isDarkMode = props.isDarkMode;
    
        if (isDarkMode) {
          return (
              <div className='chatting-member-dark'>
                <div className="chatting-left-side">
                    <ArrowBackIcon className="hvr_grow" onClick={() => {setShowMessage(false); disconnectWS()} }/>
                    <div className="chatting-member-list">
                    {memberList.length > 0
                        ? memberList.map((member) => {
                            return (
                            <ChattingMemberList
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
                <ArrowBackIcon className="hvr_grow" onClick={() => {setShowMessage(false); disconnectWS()} }/>
                <div className="chatting-member-list">
                {memberList.length > 0
                    ? memberList.map((member) => {
                        return (
                        <ChattingMemberList
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
        }
    
      }

    
    return (
        <div>
            <SetMode isDarkMode={isDarkMode}/>
        </div>
    );
}

export default ChatMemberList;