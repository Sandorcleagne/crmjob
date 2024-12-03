import React from "react";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <h1 style={{ fontSize: "70px", fontWeight: "bolder" }}>
        oops ! Page Not Found
      </h1>
    </div>
  );
};

export default ErrorPage;
