import React from "react";
import className from "classnames/bind";
import styles from "./CreateProject.module.scss";
import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { userIdSelector } from "../../../../../../app/selector";
const cx = className.bind(styles);

const CreateProject = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const userCurrentId = useSelector(userIdSelector);
  const handleClickBtnCreate = (data) => {
    axiosInstance
      .post("/project", {
        ...data,
        user_created: userCurrentId,
      })
      .then((response) => {
        reset({
          title: "",
          url: "",
          description: "",
          category: "Software",
        });
        navigate("/dashboard/list-project");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className={cx("wrapper")}>
      <Form>
        <Form.Group className={cx("mt-3")}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter title project"
            {...register("title", { required: true })}
          />
        </Form.Group>
        <Form.Group className={cx("mt-3")}>
          <Form.Label>Url</Form.Label>
          <Form.Control
            placeholder="Enter url project"
            {...register("url", { required: true })}
          />
        </Form.Group>
        <Form.Group className={cx("mt-3")}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as={"textarea"}
            placeholder="Enter description project"
            {...register("description")}
          />
        </Form.Group>
        <Form.Group className={cx("mt-3", "mb-4")}>
          <Form.Label>Category</Form.Label>
          <Form.Select {...register("category")}>
            <option defaultChecked>Software</option>
            <option>Business</option>
            <option>Maketing</option>
          </Form.Select>
        </Form.Group>
        <Button
          style={{ marginRight: "4px" }}
          onClick={handleSubmit(handleClickBtnCreate)}
        >
          Create project{" "}
        </Button>
        <Button type="reset" variant="danger">
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default CreateProject;
