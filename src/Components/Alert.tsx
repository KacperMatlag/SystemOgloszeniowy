import React from "react";
import "../CSS/ComponentsCSS/Alert.css";
const Alert: React.FC<any> = (data: any) => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {/* <strong>{data.data}</strong> */}
      {data.data}
    </div>
  );
};

export default Alert;
