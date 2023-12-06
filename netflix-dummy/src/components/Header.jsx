import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "Signup")}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </Container>
  );
}

const Container = styled.div`
padding: 0.4 rem;
.logo{
  img{
    height: 0.5 rem;
  }
}
button{
  padding: 0.5rem;
  background-color:#e50914;
  border: none;
  cursor:pointer
  color:white
  border-radius: 0.2 rem
  font-weight: bolder;
  font-size: 1.05 rem
}`;
