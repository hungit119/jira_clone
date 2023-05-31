import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Project.module.scss";

import { FiSearch, FiPlus, FiServer, FiFileText } from "react-icons/fi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { CiViewBoard } from "react-icons/ci";
import { BsTruck, BsBoxSeam } from "react-icons/bs";
import logoImage from "../../assets/images/logoImage.png";
import logoSidebar from "../../assets/images/logosidebar.png";
import MenuSidebarItem from "../shares/MenuItem/MenuSidebarItem";
import {
  Link,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Content from "../layouts/Content";
import IssueSearch from "../layouts/components/IssueSearch";
import Modal from "../shares/Modal";
import ModalCenterContent from "../shares/ModalCenterContent";
import IssueCreate from "../layouts/components/IssueCreate";
import CheckQueryParameter from "../shares/CheckQueryParameter/CheckQueryParameter";
import Issue from "../shares/Issue";
import IssueDetail from "../layouts/components/IssueDetail";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../../app/reducers/project/projectSlice";
import { modalShowSelector, projectSelector } from "../../app/selector";
import { useNavigate } from "react-router-dom";
import { setModalShow } from "../../app/reducers/issue/issueSlide";

const cx = className.bind(styles);
const Project = () => {
  const dispatch = useDispatch();
  const [modalSearch, setModalSearch] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const modalShow = useSelector(modalShowSelector);

  const project = useSelector(projectSelector);
  const handleToggleSearch = (value) => {
    setModalSearch(value);
  };
  const handleToggleCreate = (value) => {
    setModalCreate(value);
  };

  // get project detail
  const fetchProjectDetail = async () => {
    await axiosInstance
      .get(`/api/project?id=${localStorage.getItem("current_project")}`)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setProject({
              project: response.data.result,
            })
          );
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchProjectDetail();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("side-menu")}>
        <div className={cx("logo", "position", "mt-4 mb-3")}>
          <Link to={"/dashboard/list-project"}>
            <img src={logoImage} width={28} />
          </Link>
        </div>
        <Link
          to={"/project/board?modal-issue-search=true"}
          className={cx("search", "menu-sidebar-item")}
          onClick={() => handleToggleSearch(true)}
        >
          <FiSearch size={24} color="#ffffff" /> <p>SEARCH ISSUES</p>
        </Link>
        <Link
          to={"/project/board?modal-issue-create=true"}
          className={cx("create", "menu-sidebar-item")}
          onClick={() => handleToggleCreate(true)}
        >
          <FiPlus size={24} color="#ffffff" /> <p>CREATE ISSUE</p>
        </Link>
        <div className={cx("about", "menu-sidebar-item")}>
          <HiOutlineQuestionMarkCircle size={28} color="#ffffff" /> <p>ABOUT</p>
        </div>
      </div>
      <div className={cx("sidebar")}>
        <div className={cx("logo-sidebar")}>
          <img src={logoSidebar} width={40} />
          <div className={cx("header-sidebar")}>
            <p className={cx("title-header-sidebar", "text")}>
              {project.title}
            </p>
            <p className={cx("body-header-sidebar", "text")}>
              {project.category} project
            </p>
          </div>
        </div>
        <div className={cx("menu-sidebar")}>
          <MenuSidebarItem
            to={"/project/board"}
            icon={<CiViewBoard size={22} />}
            text={"Kanban Board"}
          />
          <MenuSidebarItem
            to={"/project/settings"}
            icon={<IoSettingsOutline size={22} />}
            text={"Project settings"}
          />
        </div>
        <div className={cx("line-devide")} />
        <div className={cx("option-sidebar")}>
          <MenuSidebarItem
            blocked
            to={"!#"}
            icon={<BsTruck size={22} />}
            text={"Releases"}
          />
          <MenuSidebarItem
            to={"!#"}
            icon={<FiServer size={20} />}
            text={"Issues and filters"}
          />
          <MenuSidebarItem
            to={"!#"}
            icon={<FiFileText size={20} />}
            text={"Pages"}
          />
          <MenuSidebarItem
            to={"!#"}
            icon={<HiOutlineArrowTrendingUp size={22} />}
            text={"Reports"}
          />
          <MenuSidebarItem
            to={"!#"}
            icon={<BsBoxSeam size={20} />}
            text={"Components"}
          />
        </div>
      </div>
      <Content />
      <Routes>
        <Route path="/:slug" element={<CheckQueryParameter />} />
      </Routes>
    </div>
  );
};

Project.propTypes = {};

export default Project;
