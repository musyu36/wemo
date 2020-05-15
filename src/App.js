import React, { Component } from "react";
import "./App.css";

const App = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  // const [text, setText] = React.useState("テキストを入力");
  const [editing, setEditing] = React.useState({ key: "" });
  const [memos, setMemos] = React.useState({
    id1: { t: "テキスト1", x: 0, y: 0 },
    id2: { t: "テキスト２", x: 100, y: 100 },
  });
  const updateMemo = (key, memo) => setMemos({ ...memos, [key]: memo });
  return (
    <div
      className="App"
      onDrop={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onDragOver={(e) => e.preventDefault()}
    >
      {Object.keys(memos).map((key) => (
        <div
          key={key}
          style={{
            position: "absolute",
            top: memos[key].y + "px",
            left: memos[key].x + "px",
          }}
          draggable={true}
        >
          {editing.key === key ? (
            <textarea
              name=""
              id=""
              cols="15"
              rows="5"
              onBlur={(e) => setEditing({ key: "" })}
              onChange={(e) =>
                updateMemo(key, { ...memos[key], t: e.target.value })
              }
              defaultValue={memos[key].t}
            ></textarea>
          ) : (
            <div onClick={(e) => setEditing({ key })}>{memos[key].t}</div>
          )}
        </div>
      ))}
      {/* <div
        className="Memo"
        style={{
          position: "absolute",
          top: pos.y + "px",
          left: pos.x + "px",
        }}
        draggable="true"
      >
        {editing ? (
          <textarea
            name=""
            id=""
            cols="15"
            rows="5"
            onBlur={(e) => setEditing(false)}
            onChange={(e) => setText(e.target.value)}
            defaultValue={text}
          ></textarea>
        ) : (
          <div onClick={(e) => setEditing(true)}>{text}</div>
        )}
      </div> */}
    </div>
  );
};

export default App;
