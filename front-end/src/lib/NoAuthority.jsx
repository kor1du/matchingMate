import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

function NoAuthority() {
    return (
        <div style={{textAlign:"center", paddingTop:"100px"}}>
            
            <h1> <ErrorIcon sx={{fontSize:"100px", color:"red"}} /> 접근 권한이 없습니다!!</h1>
        </div>
    );
}

export default NoAuthority;