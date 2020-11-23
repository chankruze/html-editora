/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Nov 23 2020 08:30:29 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

// external packages
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";
import cx from "classnames";
// icons
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
// css
import styles from "./Editor.module.css";
import { useState } from "react";

const Editor = ({ lang, displayLang, value, setValue }) => {
  const handleEditorChange = (editor, data, value) => setValue(value);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cx([styles.editor_container], {
        [styles.collapsed]: isCollapsed,
      })}
    >
      <div className={styles.editor_title}>
        <p>{displayLang}</p>
        <button onClick={() => setIsCollapsed((prevState) => !prevState)}>
          {isCollapsed ? <BsArrowsAngleExpand /> : <BsArrowsAngleContract />}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleEditorChange}
        value={value}
        className={styles.code_mirror_wrapper}
        options={{
          lineNumbers: true,
          lineWrapping: true,
          lint: true,
          mode: lang,
          theme: "material",
        }}
      />
    </div>
  );
};

export default Editor;
