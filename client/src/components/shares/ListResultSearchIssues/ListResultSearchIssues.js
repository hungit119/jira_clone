import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./ListResultSearchIssues.module.scss";
import ResultSearchIssue from "../ResultSearchIssue/ResultSearchIssue";
import { useDispatch } from "react-redux";
import {
  setIssueId,
  setModalShow,
} from "../../../app/reducers/issue/issueSlide";
import { useNavigate } from "react-router-dom";
const cx = className.bind(styles);

const ListResultSearchIssues = ({ listResults }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickIssueResult = (issue) => {
    dispatch(
      setIssueId({
        id: issue,
      })
    );
    dispatch(setModalShow({ show: true }));
    navigate("/project/board");
  };
  return (
    <div className={cx("wrapper")}>
      {listResults.map((issue) => (
        <ResultSearchIssue
          type={issue.type}
          id={issue.id}
          title={issue.title}
          onClick={() => handleClickIssueResult(issue)}
        />
      ))}
    </div>
  );
};

ListResultSearchIssues.propTypes = {};

export default ListResultSearchIssues;
