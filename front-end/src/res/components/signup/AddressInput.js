import React from "react";
import DaumPostcode from "react-daum-postcode";

const AddressInput = (props) => {
  const { setAddress, setModalOpen } = props;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(fullAddress);
    setAddress(fullAddress);
    setModalOpen(false);
  };
  return <DaumPostcode onComplete={handleComplete} className="post-code" />;
};
export default AddressInput;
