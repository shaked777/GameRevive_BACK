import React, { useState } from "react";
import {  Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Search() {
  
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <Form onSubmit={submitHandler} inline="true">
        <Form.Control
          placeholder="Search"
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
      </Form>
    </div>
  );
}

export default Search;
