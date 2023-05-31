import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./custom.css";
import className from "classnames/bind";

function TextEditor({
  readOnly,
  value,
  formCreateIssue,
  setformCreateIssue,
  name,
}) {
  const [valueEditor, setValueEditor] = useState(value);
  const quillRef = useRef(null);
  const handleChange = (value) => {
    setValueEditor(value);
  };
  useEffect(() => {
    setformCreateIssue({ ...formCreateIssue, [name]: valueEditor });
  }, [valueEditor]);
  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={valueEditor}
      onChange={handleChange}
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
  );
}

TextEditor.propTypes = {};

export default TextEditor;
