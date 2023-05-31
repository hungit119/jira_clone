import React, { useRef } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Register.module.scss";
import logoImage from "../../../../assets/images/logoImage.png";
import { FcAddressBook, FcGoogle } from "react-icons/fc";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loadUser } from "../../../../app/reducers/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_LOCALSTORAGE,
  REFRESH_TOKEN_LOCALSTORAGE,
} from "../../../../custom";
const cx = className.bind(styles);
const Register = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const handleClickRegister = async (data) => {
    try {
      const { email, username, password, confirmPassword } = data;
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:1337/api/auth/register",
        {
          email,
          username,
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
        toast.success("Register Successfull");
        dispatch(
          loadUser({
            isLoading: false,
            isAuthenticated: true,
            user: response.data.result.user,
          })
        );
      } else {
        toast.error("Error:" + response.data.message);
      }
    } catch (error) {
      toast.error("Error:" + error.message);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("logo")}>
          <img src={logoImage} width={70} />
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
            <Form.Label>Username</Form.Label>
            <Form.Control
              type={"text"}
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={"password"}
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={"password"}
              placeholder="Enter your confirm password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
          </Form.Group>
          <div className={cx("optional")}>
            <a href="/auth/login">Already have an account?</a>
          </div>
          <Form.Group className={cx("btn-group")}>
            <Button
              className={cx("btn-submit")}
              onClick={handleSubmit(handleClickRegister)}
            >
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
