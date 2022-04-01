import React, {useContext, useEffect, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message(), clearError]);

  useEffect(()=>{
    window.M.updateTextFields()
  },[])

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
    } catch (e) {
      console.log(e.message);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token,data.userId)
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short Links</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div className="input-field">
              <input
                placeholder="E-mail"
                id="email"
                type="text"
                className="yellow-input"
                name="email"
                onChange={changeHandler}
                value={form.email}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                placeholder="Password"
                id="password"
                type="password"
                className="yellow-input"
                name="password"
                onChange={changeHandler}
                value={form.password}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button
                className="btn yellow darken-4"
                onClick={loginHandler}
                style={{ marginRight: 10 }}>
              Log in
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
