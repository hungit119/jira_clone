import className from "classnames/bind";
import React from "react";
import { AiOutlineProject, AiOutlineUnorderedList } from "react-icons/ai";
import { BiTask, BiUser } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.scss";

const cx = className.bind(styles);
const SideBar = () => {
  return (
    <div className={cx("wrapper")}>
      <NavLink
        to={"/dashboard/list-project"}
        className={(nav) => cx("sidebar-item", nav.isActive ? "is-active" : "")}
      >
        <AiOutlineUnorderedList size={20} color="white" /> List Project
      </NavLink>
      <NavLink
        to={"/dashboard/create-project"}
        className={(nav) => cx("sidebar-item", nav.isActive ? "is-active" : "")}
      >
        <IoAdd size={20} color="white" /> Create Project
      </NavLink>
      <NavLink
        to={"/dashboard/page-viewer?sid=users"}
        className={cx("sidebar-item")}
      >
        <BiUser size={20} color="white" /> Users
      </NavLink>
      <NavLink
        to={"/dashboard/page-viewer?sid=projects"}
        className={cx("sidebar-item")}
      >
        <AiOutlineProject size={20} color="white" /> Projects
      </NavLink>
      <NavLink
        to={"/dashboard/page-viewer?sid=issues"}
        className={cx("sidebar-item")}
      >
        <BiTask size={20} color="white" /> Issues
      </NavLink>
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
