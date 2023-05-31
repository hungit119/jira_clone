import React, { Children } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Modal.module.scss";
import IssueSearch from "../../layouts/components/IssueSearch";
import { useLocation, useNavigate } from "react-router-dom";

const cx = className.bind(styles);

const Modal = ({ children, popup, queryParameter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClosePopupModal = () => {
    const newSearch = new URLSearchParams(location.search);
    newSearch.delete(queryParameter);
    navigate(`${location.pathname}?${newSearch.toString()}`);
  };
  return (
    <div className={cx("wrapper", popup ? "popup-modal" : "")}>
      <div
        className={cx("modal-overlay")}
        onClick={handleClosePopupModal}
      ></div>
      {children}
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
