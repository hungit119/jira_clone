import {
  BugIcon,
  HighestIcon,
  HighIcon,
  LowestIcon,
  LowIcon,
  MediumIcon,
  StoryIcon,
  TaskIcon,
} from "./assets/icons";
import Status from "./components/shares/Status";

export const datas = [
  {
    value: "task",
    label: "task",
    element: (
      <div>
        <TaskIcon size={20} /> <span>Task</span>
      </div>
    ),
  },
  {
    value: "bug",
    label: "bug",
    element: (
      <div>
        <BugIcon size={20} /> <span>Bug</span>
      </div>
    ),
  },
  {
    value: "story",
    label: "story",
    element: (
      <div>
        <StoryIcon size={20} />
        <span>Story</span>
      </div>
    ),
  },
];

export const priorities = [
  {
    value: "highest",
    label: "highest",
    element: (
      <div>
        <HighestIcon size={20} /> Highest
      </div>
    ),
  },
  {
    value: "high",
    label: "high",
    element: (
      <div>
        <HighIcon size={20} /> High
      </div>
    ),
  },
  {
    value: "medium",
    label: "medium",
    element: (
      <div>
        <MediumIcon size={20} /> Medium
      </div>
    ),
  },
  {
    value: "low",
    label: "low",
    element: (
      <div>
        <LowIcon size={20} /> Low
      </div>
    ),
  },
  {
    value: "lowest",
    label: "lowest",
    element: (
      <div>
        <LowestIcon size={20} /> Lowest
      </div>
    ),
  },
];
export const status = [
  {
    value: "backlog",
    label: "backlog",
    element: <Status value={"backlog"}>BACKLOG</Status>,
  },
  {
    value: "selected",
    label: "selected",
    element: <Status value={"selected"}>SELECTED FOR DEVERLOPMENT</Status>,
  },
  {
    value: "progress",
    label: "progress",
    element: <Status value={"progress"}>IN PROGRESS</Status>,
  },
  {
    value: "done",
    label: "done",
    element: <Status value={"done"}>DONE</Status>,
  },
];
export const category = [
  {
    value: "software",
    label: "Software",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
];
