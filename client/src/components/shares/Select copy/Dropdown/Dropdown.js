import React, { useEffect, useRef, useState } from "react";
import className from "classnames/bind";
import styles from "./Dropdown.module.scss";
import { IoCloseOutline } from "react-icons/io5";
const cx = className.bind(styles);
const Dropdown = ({
  datas,
  valueSelected,
  setValueSelected,
  setShowDropdown,
  setFocus,
  type,
  visible,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState(datas);
  const inpuRef = useRef(null);
  const handleInputOnchange = (e) => {
    setInputValue(e.target.value);
  };
  const searchItemByInputSearchValue = (inputSearchValue) => {
    const filteredDatas = datas.filter((item) => {
      return item.value.toLowerCase().includes(inputValue.toLowerCase());
    });
    setSearchResults(filteredDatas);
  };
  useEffect(() => {
    searchItemByInputSearchValue(inputValue);
  }, [inputValue]);
  return (
    <div className={cx("wrapper", !visible ? "transparent" : "")}>
      <input
        placeholder="Search"
        className={cx("input-search")}
        ref={inpuRef}
        onChange={handleInputOnchange}
        value={inputValue}
      />
      <IoCloseOutline
        size={20}
        className={cx(
          "delete-icon",
          valueSelected.length !== 0 ? "" : "transparent"
        )}
        color="rgb(94, 108, 132)"
        onClick={() => {
          setValueSelected([]);
          inpuRef.current.focus();
        }}
      />
      <div className={cx("options")}>
        {searchResults.length === 0 ? (
          <div className={cx("no-result")}>No results</div>
        ) : (
          <>
            {searchResults.map((data, index) =>
              !valueSelected.some((value) => value.value === data.value) ? (
                <div
                  key={index}
                  className={cx("option")}
                  onClick={() => {
                    if (type === "multiple") {
                      setValueSelected((prev) => [
                        ...prev,
                        {
                          value: data.value,
                          element: data.element,
                          label: data.label,
                        },
                      ]);
                    } else {
                      setValueSelected([
                        {
                          value: data.value,
                          element: data.element,
                          label: data.label,
                        },
                      ]);
                    }
                    setShowDropdown(false);
                    setInputValue("");
                    setFocus(true);
                  }}
                >
                  {data.element}
                </div>
              ) : (
                <></>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
