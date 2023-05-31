import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import { Form } from "react-bootstrap";
import styles from "./Settings.module.scss";
import Header from "../Board/Header";
import FormGroup from "../../../../shares/FormGroup";
// import Input from "../../../../shares/Input";
import { Input } from "antd";
import TextEditor from "../../../../shares/TextEditor";
import Button from "../../../../shares/Button";
import Note from "../../../../shares/Note";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector } from "../../../../../app/selector";
import Select from "../../../../shares/Select";
import ReactQuill from "react-quill";
import axiosInstance from "../../../../../utils/axiosInstance";
import { setProject } from "../../../../../app/reducers/project/projectSlice";
import { toast } from "react-toastify";
const cx = className.bind(styles);
const Settings = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const handleClickBtnSaveChange = () => {
    const newProject = {
      title,
      url,
      description,
      category: category[0].value,
    };
    axiosInstance
      .put(`/project?id=${localStorage.getItem("current_project")}`, {
        project: newProject,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };
  const fetchProjectDetail = () => {
    axiosInstance
      .get(`/project?id=${localStorage.getItem("current_project")}`)
      .then((response) => {
        if (response.data.success) {
          setTitle(response.data.result.title);
          setUrl(response.data.result.url);
          setDescription(response.data.result.description);
          setCategory(response.data.result.category);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProjectDetail();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <form className={cx("body")}>
        <Header title={"Project Details"} notRepo />
        <FormGroup label={"Name"}>
          <Input
            name="title"
            value={title}
            onChange={(value) => {
              setTitle(value.target.value);
            }}
          />
        </FormGroup>
        <FormGroup label={"URL"}>
          <Input
            name="url"
            value={url}
            onChange={(value) => {
              setUrl(value.target.value);
            }}
          />
        </FormGroup>
        <FormGroup label={"Description"}>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["color", "background"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code",
              "list",
              "bullet",
              "indent",
              "color",
              "background",
            ]}
          />
          <Note
            content={"Describe the project in as much detail as you'd like"}
          />
        </FormGroup>
        <FormGroup label={"Project Category"}>
          <Select
            name={"category"}
            setformCreateIssue={setCategory}
            formCreateIssue={category}
            datas={[
              {
                value: "Software",
                label: "Software",
                element: <div>Software</div>,
              },
              {
                value: "Business",
                label: "Business",
                element: <div>Business</div>,
              },
              {
                value: "Marketing",
                label: "Marketing",
                element: <div>Marketing</div>,
              },
            ]}
            defaultValue={[
              {
                value: "Software",
                label: "Software",
                element: <div>Software</div>,
              },
            ]}
          />
        </FormGroup>
        <Button
          primary
          defaultButton
          className={cx("mt-4")}
          onClick={handleClickBtnSaveChange}
        >
          Save changes
        </Button>
      </form>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
