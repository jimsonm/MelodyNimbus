import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = () => {
    setCredential("demo@user.io");
    setPassword("password");
    dispatch(sessionActions.login({ credential, password }))
  }

  return (
    <form onSubmit={handleSubmit} className='LoginForm'>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='block smallMargin'>
        <label >
          {/* Email */}
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className='block wide smallMargin'
            placeholder='Email'
          />
        </label>
        <label>
          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='block wide'
            placeholder='Password'
          />
        </label>
      </div>
      <div className='smallMargin'>
        <button className='LoginButton2' onClick={demoLogin}>Login as Demo User</button>
      </div>
      <div className='smallMargin'>
        <button type="submit" className='LoginButton2'>Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;
