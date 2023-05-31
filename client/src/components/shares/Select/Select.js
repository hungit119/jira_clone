import React, { useEffect, useRef, useState } from "react";
import className from "classnames/bind";
import styles from "./Select.module.scss";
import Dropdown from "./Dropdown";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import useClickOutside from "../../../hooks/useClickOutSide";
const cx = className.bind(styles);
const Select = ({
  datas,
  defaultValue,
  type,
  formCreateIssue,
  setformCreateIssue,
  name,
  value,
}) => {
  const [valueSelected, setValueSelected] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focus, setFocus] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setShowDropdown(false);
    setFocus(false);
  });
  useEffect(() => {
    setformCreateIssue({ ...formCreateIssue, [name]: valueSelected });
  }, [valueSelected]);
  return (
    <div className={cx("wrapper")} ref={wrapperRef}>
      <div
        className={cx("select", focus ? "focus" : "")}
        onClick={() => {
          setShowDropdown(true);
        }}
        onMouseDown={() => {
          setFocus(true);
        }}
        onMouseUp={() => {
          setFocus(false);
        }}
      >
        <div className={cx("results-select")}>
          {valueSelected.length === 0
            ? "Select"
            : valueSelected.map((value, index) => (
                <div
                  key={index}
                  className={cx("value-selected")}
                  onClick={() => {
                    setValueSelected((prev) =>
                      prev.filter((pre) => pre.value !== value.value)
                    );
                  }}
                >
                  {value.element}{" "}
                  {type === "multiple" ? (
                    <span>
                      <IoMdClose size={20} />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          {valueSelected.length !== 0 && type === "multiple" && (
            <span className={cx("add")}>
              <IoAddOutline size={20} />{" "}
              <span className={cx("text-add")}>Add more</span>
            </span>
          )}
        </div>
        {type === "multiple" && valueSelected.length === 0 && (
          <IoIosArrowDown
            size={18}
            className={cx("arrow-drown")}
            color="rgb(94, 108, 132)"
          />
        )}
      </div>
      <Dropdown
        datas={datas}
        valueSelected={valueSelected}
        setValueSelected={setValueSelected}
        setShowDropdown={setShowDropdown}
        setFocus={setFocus}
        visible={showDropdown}
        type={type}
      />
    </div>
  );
};

export default Select;
