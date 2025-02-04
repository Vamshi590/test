import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase";

const PhoneSignup: React.FC = () => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<string>("");

  const setupRecaptcha = (number: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(
        auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
      
    );

    signInWithPhoneNumber(auth, number, recaptchaVerifier)
      .then((result) => {
        setConfirmationResult(result);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedNumber = phoneNumber.trim();

    // Validate phone number format
    const phoneRegex = /^\+\d{1,3}\d{1,14}$/; // Example regex for E.164 format
    if (!phoneRegex.test(formattedNumber)) {
      setError("Invalid phone number format. Please use E.164 format.");
      return;
    }

    setupRecaptcha(formattedNumber);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationResult) {
      confirmationResult
        .confirm(verificationCode)
        .then((result: { user: unknown; }) => {
          const user = result.user;
          console.log("User  signed in:", user);
          setError("");
        })
        .catch((error: { message: React.SetStateAction<string>; }) => {
          setError(error.message);
        });
    }
  };

  return (
    <div>
      <h2>Phone Authentication</h2>
      <div id="recaptcha-container"></div>
      <form onSubmit={handleSendCode}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Send Code</button>
      </form>

      {confirmationResult && (
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify Code</button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PhoneSignup;