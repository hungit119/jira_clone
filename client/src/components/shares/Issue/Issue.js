import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import { IoMdCheckbox, IoMdBookmark } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import {} from "react-icons/hi";
import styles from "./Issue.module.scss";
import Avatar from "../Avatar";
import avatarDefault from "../../../assets/images/avatar.png";
import { useDispatch } from "react-redux";
import {
  BugIcon,
  HighestIcon,
  HighIcon,
  LowestIcon,
  MediumIcon,
  StoryIcon,
  TaskIcon,
} from "../../../assets/icons";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { setModalShow } from "../../../app/reducers/issue/issueSlide";
const cx = className.bind(styles);

const Issue = ({ issue, status, id, onClick }) => {
  const [userAvatar, setUserAvatar] = useState([]);
  const dispatch = useDispatch();
  const updateIssue = async () => {
    await axiosInstance
      .put(`/api/issue?id=${id}`, {
        status,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    axiosInstance
      .post("/api/users", {
        userIds: issue.assignees,
      })
      .then((response) => {
        setUserAvatar(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [issue]);
  useEffect(() => {
    updateIssue();
  }, [status]);
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <div>
        <div className={cx("title")}>{issue.title}</div>
        <div className={cx("meta")}>
          <div className={cx("options")}>
            <div className={cx("type")}>
              {issue.type === "task" ? (
                <TaskIcon />
              ) : issue.type === "bug" ? (
                <BugIcon />
              ) : (
                <StoryIcon />
              )}
            </div>
            <div className={cx("priority")}>
              {issue.priority === "low" ? (
                <LowestIcon />
              ) : issue.priority === "lowest" ? (
                <LowestIcon />
              ) : issue.priority === "high" ? (
                <HighIcon />
              ) : issue.priority === "highest" ? (
                <HighestIcon />
              ) : (
                <MediumIcon />
              )}
            </div>
          </div>
          <div className={cx("avatars")}>
            {userAvatar.map((userInfor, index) => (
              <Avatar
                width={26}
                src={userInfor.avatar}
                key={index}
                username={userInfor.username}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Issue.propTypes = {};

export default Issue;
