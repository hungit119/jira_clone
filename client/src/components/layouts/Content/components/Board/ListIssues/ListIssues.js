import className from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./ListIssues.module.scss";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Issue from "../../../../../shares/Issue";
import axiosInstance from "../../../../../../utils/axiosInstance";
import {
  setIssueId,
  setIssuesFormat,
  setListIssues,
  setModalShow,
} from "../../../../../../app/reducers/issue/issueSlide";
import {
  issueIdSelector,
  issuesBacklogSelector,
  issuesDoneSelector,
  issuesFormatSelector,
  issuesProgressSelector,
  issuesSelectedSelector,
  listIssuesSelector,
  modalShowSelector,
} from "../../../../../../app/selector";
import { Modal } from "antd";
import IssueDetail from "../../../../components/IssueDetail";
const cx = className.bind(styles);
const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];
const ListIssues = () => {
  const dispatch = useDispatch();
  const issues = useSelector(listIssuesSelector);
  const issuesBacklog = useSelector(issuesBacklogSelector);
  const issuesSelected = useSelector(issuesSelectedSelector);
  const issuesProgress = useSelector(issuesProgressSelector);
  const issuesDone = useSelector(issuesDoneSelector);
  const modalShow = useSelector(modalShowSelector);
  const idIssue = useSelector(issueIdSelector);
  const fectchIssuesById = async () => {
    await axiosInstance
      .get(`/api/issues?project_id=${localStorage.getItem("current_project")}`)
      .then((response) => {
        dispatch(
          setListIssues({
            issues: response.data.result.issues,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const onDragEnd = (result, issuesFormat, setListIssues) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = issuesFormat[source.droppableId];
      const destColumn = issuesFormat[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const issuesList = Object.values({
        ...issuesFormat,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
        .map((value) => {
          const v = value.items.map((i) => ({
            ...i,
            status: value.name,
          }));
          return v;
        })
        .flat();
      dispatch(
        setListIssues({
          issues: issuesList,
        })
      );
    } else {
      const column = issuesFormat[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const issuesList = Object.values({
        ...issuesFormat,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
        .map((value) => {
          const v = value.items.map((i) => ({
            ...i,
            status: value.name,
          }));
          return v;
        })
        .flat();
      dispatch(
        setListIssues({
          issues: issuesList,
        })
      );
    }
  };
  const formatIssuesList = (issues) => {
    const backlog = issues.filter((item) => item.status === "backlog");
    const selected = issues.filter((item) => item.status === "selected");
    const progress = issues.filter((item) => item.status === "progress");
    const done = issues.filter((item) => item.status === "done");
    return {
      backlog: { name: "backlog", items: backlog },
      selected: { name: "selected", items: selected },
      progress: { name: "progress", items: progress },
      done: { name: "done", items: done },
    };
  };
  const handleClickIssue = (id) => {
    dispatch(setIssueId({ id: id }));
    dispatch(setModalShow({ show: true }));
  };
  useEffect(() => {
    fectchIssuesById();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, formatIssuesList(issues), setListIssues)
        }
      >
        {Object.entries(formatIssuesList(issues)).map(
          ([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgb(244, 245, 247)",
                  width: "24%",
                  marginLeft: "8px",
                  borderRadius: "2px",
                  userSelect: "none",
                }}
                key={columnId}
              >
                <div
                  style={{
                    textAlign: "start",
                    width: "100%",
                    padding: "6px 10px",
                    color: "rgb(94, 108, 132)",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {column.name.toUpperCase()}{" "}
                  {column.name === "backlog"
                    ? issuesBacklog.length
                    : column.name === "selected"
                    ? issuesSelected.length
                    : column.name === "progress"
                    ? issuesProgress.length
                    : issuesDone.length}
                </div>
                <div style={{ width: "100%" }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            padding: 4,
                            width: "100%",
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        cursor: snapshot.isDragging
                                          ? "grabbing"
                                          : "grab",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <Issue
                                        issue={item}
                                        status={item.status}
                                        id={item.id}
                                        onClick={() => handleClickIssue(item)}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          }
        )}
      </DragDropContext>
      <Modal
        style={{ minWidth: "1040px" }}
        centered
        open={modalShow}
        onOk={() => dispatch(setModalShow({ show: false }))}
        onCancel={() => dispatch(setModalShow({ show: false }))}
      >
        <IssueDetail issueData={idIssue} />
      </Modal>
    </div>
  );
};

ListIssues.propTypes = {};

export default ListIssues;
