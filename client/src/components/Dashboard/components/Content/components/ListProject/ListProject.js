import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import ProjectItem from "../../../ProjectItem";
import className from "classnames/bind";
import styles from "./ListProject.module.scss";
import axiosInstance from "../../../../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../../../../../../app/reducers/project/projectSlice";
import {
  projectsSelector,
  userIdSelector,
} from "../../../../../../app/selector";
const cx = className.bind(styles);
const ListProject = () => {
  const dispatch = useDispatch();

  const projects = useSelector(projectsSelector);
  const currentUserid = useSelector(userIdSelector);

  // get all project created by user
  const fetchProjectByUser = () => {
    axiosInstance
      .get(`/project?where={"user_created":"${currentUserid}"}`)
      .then((response) => {
        dispatch(
          setProjects({
            projects: response.data,
          })
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchProjectByUser();
  }, []);
  return (
    <Container className={cx("mt-4")}>
      {projects.map((project, index) => (
        <ProjectItem data={project} key={index} />
      ))}
    </Container>
  );
};

export default ListProject;
