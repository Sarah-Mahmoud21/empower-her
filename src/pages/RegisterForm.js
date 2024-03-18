import React, { useState } from "react";
import "../stylePages/registerForm.css";

const RegisterForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob,setDOB] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:");
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div>
        <p className="register"> Sign up</p>
      </div>
      <div>
        <input
          type="text"
          id="fullname"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default RegisterForm;
