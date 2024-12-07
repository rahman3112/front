import React from "react";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        margin: 0,
        backgroundColor: "#0B0C10",
        color: "#C5C6C7",
        fontFamily: '"Arial", sans-serif',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          color: "#66FCF1",
          marginBottom: "20px",
        }}
      >
        Choose an Option
      </h1>
      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#C5C6C7",
          marginBottom: "40px",
        }}
      >
        Experience the power of AI-driven solutions for image generation and rating predictions. Choose a path to get started.
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => navigate("/gan")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#0B0C10",
            backgroundColor: "#66FCF1",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45A29E")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#66FCF1")}
        >
          GAN (Image Generation)
        </button>
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#0B0C10",
            backgroundColor: "#C5C6C7",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#A1A3A5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#C5C6C7")}
        >
          ML (Rating Prediction)
        </button>
      </div>
    </div>
  );
};

export default Choose;
