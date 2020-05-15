import React, { Component } from "react";
import "./App.css";

const App = () => {
  // どのメモをドラッグ中か
  const [dragging, setDragging] = React.useState({ key: "", x: 0, y: 0 });
  // どのメモを編集中か
  const [editing, setEditing] = React.useState({ key: "" });
  const [memos, setMemos] = React.useState({
    id1: { t: "テキスト1", x: 0, y: 0 },
    id2: { t: "テキスト２", x: 100, y: 100 },
  });
  // メモ更新
  const updateMemo = (key, memo) => setMemos({ ...memos, [key]: memo });
  return (
    <div
      className="App"
      onDrop={(e) => {
        if (!dragging || !memos) return;
        // 座標更新
        updateMemo(dragging.key, {
          ...memos[dragging.key],
          x: e.clientX - dragging.x,
          y: e.clientY - dragging.y,
        });
      }}
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
          onDragStart={(e) =>
            setDragging({
              key,
              x: e.clientX - memos[key].x,
              y: e.clientY - memos[key].y,
            })
          }
        >
          {editing.key === key ? (
            <textarea
              name=""
              id=""
              cols="15"
              rows="5"
              onBlur={(e) => setEditing({ key: "" })}
              onChange={(e) =>
                // テキスト更新
                updateMemo(key, { ...memos[key], t: e.target.value })
              }
              defaultValue={memos[key].t}
            ></textarea>
          ) : (
            <div onClick={(e) => setEditing({ key })}>{memos[key].t}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
