import className from "classnames/bind";
import React, { useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FiSend, FiTrash2 } from "react-icons/fi";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  setDeleteIssue,
  setIssue,
  setIssueUpdate,
  setModalShow,
} from "../../../../app/reducers/issue/issueSlide";
import {
  issueSelector,
  projectUserJoinedSelector,
} from "../../../../app/selector";
import axiosInstance from "../../../../utils/axiosInstance";
import Avatar from "../../../shares/Avatar";
import Button from "../../../shares/Button";
import DropdownMenuItem from "../../../shares/DropdownMenuItem";
import FormGroup from "../../../shares/FormGroup/FormGroup";
import styles from "./IssueDetail.module.scss";
import { toast } from "react-toastify";
import { Select, Tag, Input, Space, Modal } from "antd";
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
import { priorities } from "../../../../const";
import SelectSearch from "react-select";
const cx = className.bind(styles);
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};
const IssueDetail = ({ issueData }) => {
  console.log(issueData);
  const dispatch = useDispatch();
  const users_joined = useSelector(projectUserJoinedSelector);
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState({
    value: "",
    lable: <></>,
  });
  const [status, setstatus] = useState({
    value: "",
    lable: <></>,
  });
  const [userAssignees, setUserAssignees] = useState([]);
  const [userReporter, setUserReporter] = useState({});
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getIssueDetail = () => {
    axiosInstance
      .get(`/api/issue?id=${issueData.id}`)
      .then((response) => {
        setType({
          value: response.data.result.type,
          label:
            response.data.result.type === "task" ? (
              <span>
                <TaskIcon size={20} /> {response.data.result.type.toUpperCase()}
              </span>
            ) : response.data.result.type === "bug" ? (
              <span>
                <BugIcon size={20} />
                {response.data.result.type.toUpperCase()}
              </span>
            ) : (
              <span>
                <StoryIcon size={20} />
                {response.data.result.type.toUpperCase()}
              </span>
            ),
        });
        setTitle(response.data.result.title);
        setDescription(response.data.result.description);
        setstatus({
          value: response.data.result.status,
          lable:
            response.data.result.status === "backlog" ? (
              <span>BACKLOG</span>
            ) : response.data.result.status === "selected" ? (
              <span>SELECTED</span>
            ) : response.data.result.status === "progress" ? (
              <span>PROGRESS</span>
            ) : (
              <span>DONE</span>
            ),
        });
        setUserAssignees(
          response.data.result.assignees.map((user) => ({
            value: user.id,
            label: (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
                <Avatar src={user.avatar} username={user.username} width={24} />
                {user.username}
              </span>
            ),
          }))
        );
        setUserReporter({
          value: response.data.result.reporter.id,
          label: (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "9px",
              }}
            >
              <Avatar
                src={response.data.result.reporter.avatar}
                username={response.data.result.reporter.username}
                width={24}
              />
              {response.data.result.reporter.username}
            </span>
          ),
        });
        setPriority({
          value: response.data.result.priority,
          label: priorities.filter(
            (pro) => pro.value === response.data.result.priority
          )[0].element,
        });
        setTime(response.data.result.original_estimate);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const updateIssuePut = (data) => {
    axiosInstance
      .put(`/api/issuePut?id=${issueData.id}`, {
        newdata: data,
      })
      .then((response) => {
        dispatch(
          setIssueUpdate({
            id: response.data.result.id,
            issue: response.data.result,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    axiosInstance
      .delete(`/api/issue?id=${issueData.id}`)
      .then((response) => {
        dispatch(
          setDeleteIssue({
            issue: response.data.result,
          })
        );
        setIsModalOpen(false);
        dispatch(
          setModalShow({
            show: false,
          })
        );
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getIssueDetail();
  }, [issueData]);
  useEffect(() => {
    const newType = type.value;
    updateIssuePut({ type: newType });
  }, [type]);
  useEffect(() => {
    const newTitle = title;
    updateIssuePut({ title: newTitle });
  }, [title]);
  useEffect(() => {
    const newDescription = description;
    updateIssuePut({ description: newDescription });
  }, [description]);
  useEffect(() => {
    const newStatus = status;
    updateIssuePut({ status: newStatus });
  }, [status]);
  useEffect(() => {
    const newUserAssignees = userAssignees.map((user) => user.value);
    updateIssuePut({ assignees: newUserAssignees });
  }, [userAssignees]);
  useEffect(() => {
    const newUserReporter = userReporter.value;
    updateIssuePut({ reporter: newUserReporter });
  }, [userReporter]);
  useEffect(() => {
    const newPriority = priority.value;
    updateIssuePut({ priority: newPriority });
  }, [priority]);
  useEffect(() => {
    const newTime = time;
    updateIssuePut({ original_estimate: newTime });
  }, [time]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-left")}>
          <Select
            labelInValue
            showSearch
            value={type}
            onChange={(value) => {
              setType(value);
            }}
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.name ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.name ?? "")
                .toLowerCase()
                .localeCompare((optionB?.name ?? "").toLowerCase())
            }
            options={[
              {
                value: "task",
                name: "task",
                label: (
                  <span>
                    <TaskIcon size={20} /> TASK
                  </span>
                ),
              },
              {
                value: "bug",
                name: "bug",
                label: (
                  <span>
                    <BugIcon size={20} /> BUG
                  </span>
                ),
              },
              {
                value: "story",
                name: "story",
                label: (
                  <span>
                    <StoryIcon size={20} /> STORY
                  </span>
                ),
              },
            ]}
          />
        </div>
        <div className={cx("header-right")}>
          <Button>
            <FiSend size={18} />
            <div className={cx("title-btn")}>Give feedback</div>
          </Button>
          <Button>
            <BsLink45Deg size={24} />
            <div className={cx("title-btn")}>Copy link</div>
          </Button>
          <Button onClick={showModal}>
            <FiTrash2 size={20} />
          </Button>
        </div>
      </div>
      <div className={cx("body")}>
        <div className={cx("content")}>
          <textarea
            className={cx("header-input")}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <FormGroup
            label={"Description"}
            color={"rgb(23, 43, 77)"}
            fontsize={"15px"}
          >
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
          </FormGroup>
        </div>
        <div className={cx("info")}>
          <FormGroup label={"STATUS"}>
            <Select
              showSearch
              value={status}
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={(value) => {
                setstatus(value);
              }}
              filterOption={(input, option) =>
                (option?.name ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.name ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.name ?? "").toLowerCase())
              }
              options={[
                {
                  value: "backlog",
                  name: "backlog",
                  label: <span>BACKLOG</span>,
                },
                {
                  value: "selected",
                  name: "selected for deverlopment",
                  label: <span>SELECTED FOR DEVERLOPMENT</span>,
                },
                {
                  value: "progress",
                  name: "in progress",
                  label: <span>IN PROGRESS</span>,
                },
                {
                  value: "done",
                  name: "done",
                  label: <span>DONE</span>,
                },
              ]}
            />
          </FormGroup>
          <FormGroup label={"ASSIGNEES"}>
            <SelectSearch
              options={users_joined.map((user) => ({
                value: user.id,
                label: (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={user.avatar}
                      username={user.username}
                      width={24}
                    />
                    {user.username}
                  </span>
                ),
              }))}
              placeholder="Select color"
              value={userAssignees}
              onChange={(data) => {
                setUserAssignees(data);
              }}
              isSearchable={true}
              isMulti
            />
          </FormGroup>
          <FormGroup label={"REPORTER"}>
            <SelectSearch
              options={users_joined.map((user) => ({
                value: user.id,
                label: (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={user.avatar}
                      username={user.username}
                      width={24}
                    />
                    {user.username}
                  </span>
                ),
              }))}
              placeholder="Select color"
              value={userReporter}
              onChange={(data) => {
                setUserReporter(data);
              }}
              isSearchable={false}
            />
          </FormGroup>
          <FormGroup label={"PRIORITY"}>
            <SelectSearch
              options={priorities.map((pro) => ({
                value: pro.value,
                label: pro.element,
              }))}
              placeholder="Select color"
              value={priority}
              onChange={(data) => {
                setPriority(data);
              }}
              isSearchable={false}
            />
          </FormGroup>
          <FormGroup label={"ORIGINAL ESTIMATE (HOURS)"}>
            <Input
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup label={"TIME TRACKING"}></FormGroup>
        </div>
      </div>
      <Modal
        title="Are you sure you want to delete this issue?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <p>Once you delete, it's gone for good.</p>
      </Modal>
    </div>
  );
};

IssueDetail.propTypes = {};

export default IssueDetail;
