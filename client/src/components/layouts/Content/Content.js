import className from "classnames/bind";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Settings from "./components/Settings";
import styles from "./Content.module.scss";
const cx = className.bind(styles);
const Content = (props) => {
  return (
    <div className={cx("wrapper")}>
      <Routes>
        <Route path="/board" element={<Board />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

Content.propTypes = {};

export default Content;
