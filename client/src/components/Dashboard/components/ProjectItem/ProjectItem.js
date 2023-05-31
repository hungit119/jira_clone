import React from "react";
import className from "classnames/bind";
import styles from "./ProjectItem.module.scss";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const cx = className.bind(styles);
const ProjectItem = ({ data }) => {
  const navigate = useNavigate();
  const handleClickEnterProject = () => {
    localStorage.setItem("current_project", data.id);
    navigate("/project/board");
  };
  return (
    <Card className={cx("mt-2")}>
      <Card.Header>{data.category}</Card.Header>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Button variant="primary">
          <div onClick={handleClickEnterProject}>Enter project</div>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;
