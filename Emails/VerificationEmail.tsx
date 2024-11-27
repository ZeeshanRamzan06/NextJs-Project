import React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({ username, otp }) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f9f9f9" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: "#333", textAlign: "center" }}>Email Verification</h1>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Hi <strong>{username}</strong>,
        </p>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Thank you for signing up. Please use the following verification code to complete your registration:
        </p>
        <div
          style={{
            margin: "20px 0",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#007BFF",
            border: "2px dashed #007BFF",
            padding: "10px",
            letterSpacing: "4px",
          }}
        >
          {otp}
        </div>
        <p style={{ fontSize: "16px", color: "#555" }}>
          If you did not request this, please ignore this email.
        </p>
        <p style={{ fontSize: "16px", color: "#555", textAlign: "center" }}>
          <strong>The Mystry Team</strong>
        </p>
      </div>
    </div>
  );
};

export default VerificationEmail;
