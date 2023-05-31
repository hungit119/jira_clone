import React, { useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Login.module.scss";
import { FcGoogle, FcAddressBook } from "react-icons/fc";
import logoImage from "../../../../assets/images/logoImage.png";
import { useGoogleLogin } from '@react-oauth/google';

import { Col, Row, Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../../app/reducers/auth/authSlice";
import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_LOCALSTORAGE,
  REFRESH_TOKEN_LOCALSTORAGE,
} from "../../../../custom";

const cx = className.bind(styles);
const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const handleClickLogin = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        "http://localhost:1337/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        localStorage.setItem(
          ACCESS_TOKEN_LOCALSTORAGE,
          response.data.result.accessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_LOCALSTORAGE,
          response.data.result.refreshToken
        );
        toast.success("Login successful");
        dispatch(
          loadUser({
            isLoading: false,
            isAuthenticated: true,
            user: response.data.result,
          })
        );
      } else {
        toast.error("Error:" + response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      const tokens = await axios.post('http://localhost:1337/api/auth/google-login',{
        codeResponse
      }) 
      if (tokens.data.success) {
        localStorage.setItem(
          ACCESS_TOKEN_LOCALSTORAGE,
          tokens.data.result.accessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_LOCALSTORAGE,
          tokens.data.result.refreshToken
        );
        toast.success("Login successful");
        dispatch(
          loadUser({
            isLoading: false,
            isAuthenticated: true,
            user: tokens.data.result,
          })
        );
      } else {
        toast.error("Error:" + tokens.data.message);
      }
    },
    flow: 'auth-code',
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("logo")}>
          <img src={logoImage} width={70} />
        </div>
        <div>
          <Button className="mb-4" onClick={() => login()}>Sign in with Google</Button>
        </div>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type={"email"}
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={"password"}
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
          </Form.Group>
          <div className={cx("optional")}>
            <a href="/auth/register">You don't have an account</a>
          </div>
          <Form.Group className={cx("btn-group")}>
            <Button
              className={cx("btn-login")}
              onClick={handleSubmit(handleClickLogin)}
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
