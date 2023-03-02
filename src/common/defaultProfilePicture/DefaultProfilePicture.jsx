import React from "react";
import profileImageColor from "../../utils/profileImageColor.json";

const DefaultProfilePicture = ({
  firstName,
  lastName,
  style,
}) => {
  //   console.log(profileImageColor[firstName.toUpperCase()[0]], "firstName");
  return firstName ? (
    <div
      style={{
        height: "50px",
        width: "50px",
        borderRadius: "25px",
        backgroundColor: `${
          firstName[0] ? profileImageColor[firstName[0].toUpperCase()] : "red"
        }`,
        color: "white",
        fontWeight: "700",
        display: "grid",
        placeItems: "center",
        fontSize: "20px",
        ...style,
      }}
    >
      {firstName[0].toUpperCase()}
      {lastName[0].toUpperCase()}
    </div>
  ) : (
    []
  );
};

export default DefaultProfilePicture;
