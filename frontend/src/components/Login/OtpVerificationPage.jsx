import "./OtpStyling.css";
import { useState } from "react";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(0);

  const submitHandler = () => {};

  return (
    <div
      className="w-[100vw] h-[100vh]"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="card">
        <span className="card__title">Verify your OTP</span>
        <p className="card__content">
          We send a verification otp to your email.
        </p>
        <div className="card__form">
          <input
            placeholder="Your OTP"
            type="text"
            value={otp === 0 ? "" : otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="sign-up" onClick={submitHandler}>
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
