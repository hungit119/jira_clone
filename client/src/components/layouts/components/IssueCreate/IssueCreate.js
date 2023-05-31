import React, { useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./IssueCreate.module.scss";
import FormGroup from "../../../shares/FormGroup";
import Line from "../../../shares/Line";
import Input from "../../../shares/Input";
import Note from "../../../shares/Note";
import TextEditor from "../../../shares/TextEditor";
import Button from "../../../shares/Button";
import { useSelector } from "react-redux";
import {
  currentProjectIdSelector,
  projectUserJoinedSelector,
  userSelector,
} from "../../../../app/selector";
import {
  BugIcon,
  HighestIcon,
  HighIcon,
  LowestIcon,
  LowIcon,
  MediumIcon,
  StoryIcon,
  TaskIcon,
} from "../../../../assets/icons";
import Avatar from "../../../shares/Avatar";
import Select from "../../../shares/Select";
import DropdownMenuItem from "../../../shares/DropdownMenuItem";
import { datas, priorities } from "../../../../const";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { setIssue } from "../../../../app/reducers/project/projectSlice";
import { useNavigate } from "react-router-dom";
import { setAddIssue } from "../../../../app/reducers/issue/issueSlide";
const cx = className.bind(styles);
const IssueCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users_joined = useSelector(projectUserJoinedSelector);
  const project_id = useSelector(currentProjectIdSelector);
  const user = useSelector(userSelector);
  const menuUsers = users_joined.map((user) => ({
    value: user.username,
    label: user.id,
    element: (
      <DropdownMenuItem
        text={user.username}
        element={
          <Avatar src={user.avatar} username={user.username} width={24} />
        }
      />
    ),
  }));
  const userMenuDefault = [
    {
      value: user.username,
      label: user.id,
      element: (
        <DropdownMenuItem
          text={user.username}
          element={
            <Avatar src={user.avatar} username={user.username} width={24} />
          }
        />
      ),
    },
  ];
  const [formCreateIssue, setformCreateIssue] = useState({
    type: [
      {
        value: "task",
        element: (
          <div>
            <TaskIcon size={20} /> <span>Task</span>
          </div>
        ),
        label: "task",
      },
    ],
    summary: "",
    description: "",
    reporter: [menuUsers[0]],
    assignees: [],
    priority: [
      {
        value: "medium",
        element: (
          <div>
            <MediumIcon size={20} /> Medium
          </div>
        ),
        label: "medium",
      },
    ],
  });
  const handleClickBtnCreateIssue = async () => {
    try {
      const { type, summary, description, assignees, reporter, priority } =
        formCreateIssue;
      const preIssue = {
        type: type[0].value,
        title: summary,
        description,
        status: "backlog",
        assignees: assignees.map((assignee) => assignee.label),
        reporter: reporter[0].label,
        priority: priority[0].value,
        project_owner:project_id
      };
      axiosInstance
        .post(`/issue?project_id=${project_id}`, {
          ...preIssue,
        })
        .then((response) => {
          toast.success("Created Issue !");
          dispatch(
            setAddIssue({
              issue: response.data.result,
            })
          );
          navigate("/project/board");
        })
        .catch((error) => {
          toast.error(error.message);
          throw error;
        });
    } catch (error) {
      toast.error("Error in client :" + error.message);
      throw error;
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>Create issue</div>
      <FormGroup label={"Issue Type"}>
        <Select
          name={"type"}
          formCreateIssue={formCreateIssue}
          setformCreateIssue={setformCreateIssue}
          datas={datas}
          defaultValue={[datas[0]]}
        />
        <Note content={"Start typing to get a list of possible matches."} />
      </FormGroup>
      <Line />
      <FormGroup label={"Short summary"}>
        <Input
          name={"summary"}
          handleInputOnChange={(e) => {
            setformCreateIssue({
              ...formCreateIssue,
              [e.target.name]: e.target.value,
            });
          }}
        />
        <Note
          content={"Concisely summarize the issue in one or two sentences."}
        />
      </FormGroup>
      <FormGroup label={"Description"}>
        <TextEditor
          name={"description"}
          formCreateIssue={formCreateIssue}
          setformCreateIssue={setformCreateIssue}
        />
        <Note content={"Describe the issue in as much detail as you'd like."} />
      </FormGroup>
      <FormGroup label={"Reporter"}>
        <Select
          name={"reporter"}
          formCreateIssue={formCreateIssue}
          setformCreateIssue={setformCreateIssue}
          datas={menuUsers}
          defaultValue={[userMenuDefault[0]]}
        />
      </FormGroup>
      <FormGroup label={"Assignees"}>
        <Select
          name={"assignees"}
          formCreateIssue={formCreateIssue}
          setformCreateIssue={setformCreateIssue}
          type={"multiple"}
          datas={menuUsers}
          defaultValue={[]}
        />
      </FormGroup>
      <FormGroup label={"Priority"}>
        <Select
          name={"priority"}
          formCreateIssue={formCreateIssue}
          setformCreateIssue={setformCreateIssue}
          datas={priorities}
          defaultValue={[priorities[0]]}
        />
        <Note content={"Priority in relation to other issues."} />
      </FormGroup>
      <FormGroup>
        <Button primary defaultButton onClick={handleClickBtnCreateIssue}>
          Create issue
        </Button>
        <Button info defaultButton>
          Cancel
        </Button>
      </FormGroup>
    </div>
  );
};

IssueCreate.propTypes = {};

export default IssueCreate;
