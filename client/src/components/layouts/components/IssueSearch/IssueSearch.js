import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./IssueSearch.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import ListResultSearchIssues from "../../../shares/ListResultSearchIssues";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-toastify";
const cx = className.bind(styles);
const IssueSearch = ({ popup, queryParameter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();

  const handleClosePopupModal = () => {
    const newSearch = new URLSearchParams(location.search);
    newSearch.delete(queryParameter);
    navigate(`${location.pathname}?${newSearch.toString()}`);
  };
  const searchIssue = () => {
    axiosInstance
      .get(
        `/issuesSearch?project_id=${localStorage.getItem(
          "current_project"
        )}&searchValue=${inputValue}`
      )
      .then((response) => {
        if (response.data.success) {
          setSearchResult(response.data.result);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    searchIssue();
  }, [inputValue]);
  return (
    <div className={cx("wrapper", popup ? "popup-search" : "")}>
      <div className={cx("button-close")} onClick={handleClosePopupModal}>
        <IoCloseOutline size={30} color={"color: rgb(94, 108, 132)"} />
      </div>
      <div className={cx("input-search-wrapper")}>
        <input
          className={cx("input-search")}
          placeholder={"Search issues by summary, description..."}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <FiSearch
          size={22}
          color={"rgb(94, 108, 132)"}
          className={cx("icon-search")}
        />
      </div>
      <div className={cx("title-search")}>RECENT ISSUES</div>
      <ListResultSearchIssues listResults={searchResult} />
    </div>
  );
};

IssueSearch.propTypes = {};

export default IssueSearch;
