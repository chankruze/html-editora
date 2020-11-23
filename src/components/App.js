import styles from "./App.module.css";
import cx from "classnames";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className={styles.app}>
      <div className={cx(styles.pane, styles.editor)}>
        <Editor lang="xml" displayLang="html" value={html} setValue={setHtml} />
        <Editor lang="css" displayLang="css" value={css} setValue={setCss} />
        <Editor
          lang="javascript"
          displayLang="js"
          value={js}
          setValue={setJs}
        />
      </div>
      <div className={styles.pane}>
        <iframe
          className={styles.iframe}
          srcDoc={srcDoc}
          title="output"
          frameborder="0"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
