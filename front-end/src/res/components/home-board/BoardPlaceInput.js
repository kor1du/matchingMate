import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const BoardPlaceInput = (props) => {
  const { postInfo, setPostInfo, setModalOpen } = props;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let jibunAddress = data.jibunAddress;
    let autoJibunAddress = data.autoJibunAddress

    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log("이건 도로명 주소::::::", fullAddress);
    console.log("지번 주소는 ?? :::::::", jibunAddress);
    console.log("예상 지번 주소는 ?? :::::::", autoJibunAddress);
    setPostInfo({ ...postInfo, place: jibunAddress ? jibunAddress : autoJibunAddress });
    setModalOpen(false);
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return (<DaumPostcode onComplete={handleComplete} className="post-code" />);

};

export default BoardPlaceInput;