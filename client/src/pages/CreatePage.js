import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext);
  const [link, setlink] = useState("");
  const { request } = useHttp();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/links/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        navigate(`/detail/${data.link._id}`)
      } catch (e) {
        console.log(e)
      }
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Enter link"
            id="link"
            type="text"
            onChange={(e) => setlink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  );
};
