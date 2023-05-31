import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Header.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  projectUserJoinedSelector,
  titleProjectSelector,
  userIdSelector,
} from "../../../../../../app/selector";
import SelectSearch from "react-select";
import axiosInstance from "../../../../../../utils/axiosInstance";
import Avatar from "../../../../../shares/Avatar";
import { Button } from "antd";
import { setProject } from "../../../../../../app/reducers/project/projectSlice";
import { toast } from "react-toastify";
const cx = className.bind(styles);
const Header = ({ className, title, notRepo = false }) => {
  const dispatch = useDispatch();
  const classes = cx("wrapper", {
    [className]: className,
    notRepo,
  });
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const titleProject = useSelector(titleProjectSelector);
  const users_joined = useSelector(projectUserJoinedSelector);
  const user_current = useSelector(userIdSelector);

  const fetchUsers = () => {
    axiosInstance
      .get(`/api/allUsers`)
      .then((response) => {
        setUsers(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleClickAddUser = () => {
    const user_join = [...users_joined.map((user) => user.id), user.value];
    axiosInstance
      .put(`/api/project?id=${localStorage.getItem("current_project")}`, {
        project: {
          users_joined: user_join,
        },
      })
      .then((response) => {
        dispatch(
          setProject({
            project: response.data.result,
          })
        );
        toast.success("Add user to project done");
        setUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={classes}>
      <div className={cx("path")}>
        Projects <span className={cx("check-mark")}>/</span>
        {titleProject} <span className={cx("check-mark")}>/</span> {title}
      </div>
      <div className={cx("header")}>
        <h4 style={{ margin: "0" }}>{title}</h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SelectSearch
            className={cx("search-user")}
            options={users
              .filter(
                (us) =>
                  us.id !== user_current &&
                  !users_joined.map((u) => u.id).includes(us.id)
              )
              .map((u) => ({
                value: u.id,
                label: (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={u.avatar} username={u.username} width={24} />
                    {u.username}
                  </span>
                ),
              }))}
            placeholder="Select color"
            value={user}
            onChange={(data) => {
              setUser(data);
            }}
            isSearchable={true}
          />
          <Button
            type="primary"
            style={{ marginLeft: "4px", height: "38px" }}
            onClick={handleClickAddUser}
            disabled={user === {}}
          >
            Add
          </Button>
        </div>
        <button className={cx("button", notRepo ? "display-none" : "")}>
          <AiFillGithub size={18} color={"#42526e"} /> Github Repo
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
