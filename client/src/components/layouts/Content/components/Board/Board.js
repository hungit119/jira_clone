import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Board.module.scss";
import { CiSearch } from "react-icons/ci";
import Avatar from "../../../../shares/Avatar";
import Button from "../../../../shares/Button";
import Header from "./Header";
import Filter from "./Filter";
import ListIssues from "./ListIssues";
import ModalCenterContent from "../../../../shares/ModalCenterContent";
const cx = className.bind(styles);
const Board = (props) => {
  return (
    <div className={cx("wrapper")}>
      <Header title={"Kanban board"} />
      <Filter />
      <ListIssues />
    </div>
  );
};

Board.propTypes = {};

export default Board;
