import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Content.module.scss";
import ProjectItem from "../ProjectItem";
import Line from "../../../shares/Line";
import { VscProject } from "react-icons/vsc";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import ListProject from "./components/ListProject";
import CreateProject from "./components/CreateProject";
import PageView from "../../../PageView/PageView";
const cx = className.bind(styles);
const Content = () => {
  return (
    <div className={cx("wrapper")}>
      <Line />
      <div className={cx("content")}>
        <div className={cx("content")}>
          <Routes>
            <Route path="/list-project" element={<ListProject />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/page-viewer" element={<PageView />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Content;
