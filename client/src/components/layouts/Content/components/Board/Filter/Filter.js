import className from "classnames/bind";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setListIssues } from "../../../../../../app/reducers/issue/issueSlide";
import {
  projectUserJoinedSelector,
  userAvatarSelector,
  userIdSelector,
  usernameSelector,
} from "../../../../../../app/selector";
import axiosInstance from "../../../../../../utils/axiosInstance";
import Avatar from "../../../../../shares/Avatar";
import Button from "../../../../../shares/Button";
import styles from "./Filter.module.scss";

const cx = className.bind(styles);
const Filter = () => {
  const projectUsersJoined = useSelector(projectUserJoinedSelector);
  const current_userId = useSelector(userIdSelector);
  const [isOnlyMyIssueSelected, setIsOnlyMyIssueSelected] = useState(false);
  const [isRecentlyUpdateSelected, setIsRecentlyUpdateSelected] =
    useState(false);
  const [searchCondition, setSearchCondition] = useState({
    searchInputIssues: "",
    onlyMyIssues: false,
    recentUpdateIssues: false,
    assignees: [],
  });

  const dispatch = useDispatch();
  const handleClickAvatar = (avataId) => {
    if (searchCondition.assignees.includes(avataId)) {
      setSearchCondition({
        ...searchCondition,
        assignees: searchCondition.assignees.filter((id) => id !== avataId),
      });
    } else {
      setSearchCondition({
        ...searchCondition,
        assignees: searchCondition.assignees.concat(avataId),
      });
    }
  };
  const handleClickBtnOnlyMyIssue = () => {
    setIsOnlyMyIssueSelected((prev) => (prev === true ? false : true));
    if (isOnlyMyIssueSelected === false) {
      setSearchCondition({
        ...searchCondition,
        onlyMyIssues: current_userId,
        assignees: [],
      });
    } else {
      setSearchCondition({ ...searchCondition, onlyMyIssues: false });
    }
  };
  const handleClickBtnRecentlyUpdate = () => {
    setIsRecentlyUpdateSelected((prev) => (prev === true ? false : true));
    if (isRecentlyUpdateSelected === false) {
      setSearchCondition({ ...searchCondition, recentUpdateIssues: true });
    } else {
      setSearchCondition({ ...searchCondition, recentUpdateIssues: false });
    }
  };

  useEffect(() => {
    axiosInstance
      .post(
        `/api/filterIssues?project_id=${localStorage.getItem(
          "current_project"
        )}`,
        {
          searchCondition: { ...searchCondition },
        }
      )
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setListIssues({
              issues: response.data.result,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [searchCondition]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search")}>
        <div className={cx("icon-search")}>
          <CiSearch size={20} />
        </div>
        <input
          className={cx("search-input")}
          name={"searchInputIssues"}
          onChange={(e) => {
            setSearchCondition({
              ...searchCondition,
              [e.target.name]: e.target.value,
            });
          }}
          value={searchCondition.searchInputIssues}
        />
        <div className={cx("avatars-search")}>
          {projectUsersJoined.map((user, index) => (
            <Avatar
              key={index}
              src={user.avatar}
              username={user.username}
              onClick={() => handleClickAvatar(user.id)}
              selected={searchCondition.assignees.includes(user.id)}
            />
          ))}
        </div>
        <div className={cx("buttons-search")}>
          <Button
            onClick={handleClickBtnOnlyMyIssue}
            selected={isOnlyMyIssueSelected}
          >
            Only My Issues
          </Button>
          <Button
            selected={isRecentlyUpdateSelected}
            onClick={handleClickBtnRecentlyUpdate}
          >
            Recently Updated
          </Button>
        </div>
        <div
          className={cx(
            "clear-line",
            searchCondition.onlyMyIssues ||
              searchCondition.recentUpdateIssues ||
              searchCondition.assignees.length !== 0 ||
              searchCondition.searchInputIssues !== ""
              ? "visible"
              : ""
          )}
          onClick={() => {
            setSearchCondition({
              searchInputIssues: "",
              onlyMyIssues: undefined,
              recentUpdateIssues: false,
              assignees: [],
            });
            setIsOnlyMyIssueSelected(false);
            setIsRecentlyUpdateSelected(false);
          }}
        >
          Clear all
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
