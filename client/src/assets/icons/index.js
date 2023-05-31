import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { IoMdBookmark, IoMdCheckbox } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";

export const TaskIcon = ({ size }) => (
  <IoMdCheckbox size={size} color={"rgb(79, 173, 230)"} />
);

export const BugIcon = ({ size }) => (
  <RiErrorWarningFill size={size || 20} color={"rgb(228, 77, 66)"} />
);
export const StoryIcon = ({ size }) => (
  <IoMdBookmark size={size} color={"rgb(101, 186, 67)"} />
);
// type icons
export const HighestIcon = ({ size }) => (
  <AiOutlineArrowUp size={size} color={"rgb(205, 19, 23)"} />
);

export const HighIcon = ({ size }) => (
  <AiOutlineArrowUp size={size} color={"rgb(233, 73, 74)"} />
);
export const MediumIcon = ({ size }) => (
  <AiOutlineArrowUp size={size} color={"rgb(233, 127, 51)"} />
);
export const LowIcon = ({ size }) => (
  <AiOutlineArrowDown size={size} color={"rgb(45, 135, 56)"} />
);
export const LowestIcon = ({ size }) => (
  <AiOutlineArrowDown size={size} color={"rgb(87, 165, 90)"} />
);
