import React  from 'react';
function MessageItem(props) {
    const { message, isDarkMode, myId, scrollRef } = props;

    console.log("메세지 :: ",props.message);

    function SetMode() {
        
        if (isDarkMode) {
            if(message.memberId === null) {
              return (
                <div className="message-server">
                  <span>{message.message}</span>
                </div>
              );
            } else if (myId === message.memberId) {
              return (
                <div  className="message-me">
                  <div className="message-text" >
                    <span > {message.registerDatetime.split(" ")[1]}</span>
                    <span className="balloon">{message.message}</span>
                  </div>
                </div>
              );
            } else {
              return (
                <div  className="message">
                  <div className="profile">
                    <img src={message.profileImgAddress} className='messageProfileImage-dark' alt="" />
                    <span>{message.nickname}</span>
                    </div>
                    <div className="message-text" >
                    <span className="balloon">{message.message}</span>
                    <span> {message.registerDatetime.split(" ")[1]}</span>
                  </div>

                </div>
              );
            }
            
        } else {
          if(message.memberId === null) {
            return (
              <div className="message-server">
                <span>{message.message}</span>
              </div>
            );
          } else if (myId === message.memberId) {
                return (
                  <div className="message-me">

                    <div className="message-text">
                      <span > {message.registerDatetime.split(" ")[1]}</span>
                      <span className="balloon">{message.message}</span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="message">
                    <div className="profile">
                      <img src={message.profileImgAddress} className='messageProfileImage-light' alt="" />
                      <span>
                        {message.nickname} 
                      </span>
                    </div>
                    <div className="message-text">
                      <span className="balloon">{message.message}</span>
                      <span> {message.registerDatetime.split(" ")[1]}</span>
                    </div>

                  </div>
                );
              }
        }
    }

    return (
        <div ref={scrollRef}>
            <SetMode isDarkMode={isDarkMode} />

        </div>
    );
}

export default MessageItem;