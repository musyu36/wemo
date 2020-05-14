import React, { Component } from "react";
import "./App.css";

const App = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [text, setText] = React.useState("テキストを入力");
  const [editing, setEditing] = React.useState(false);
  return (
    <div
      className="App"
      onDrop={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
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
      </div>
    </div>
  );
};

export default App;
