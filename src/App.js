import React, { Component } from "react";
import "./App.css";

const App = () => {
  // どのメモをドラッグ中か
  const [dragging, setDragging] = React.useState({ key: "", x: 0, y: 0 });
  // どのメモを編集中か
  const [editing, setEditing] = React.useState({ key: "" });
  // const [memos, setMemos] = React.useState({
  //   id1: { t: "テキスト1", x: 0, y: 0 },
  //   id2: { t: "テキスト２", x: 100, y: 100 },
  // });
  const [memos, setMemos] = React.useState(null);

  const addMemo = () => {
    setMemos({
      ...memos,
      [Math.random().toString(36).slice(-8)]: {
        t: "テキストを入力",
        x: Math.floor(Math.random() * (200 - 80) + 80),
        y: Math.floor(Math.random() * (200 - 80) + 80),
      },
    });
  };

  // メモ更新
  const updateMemo = (key, memo) => setMemos({ ...memos, [key]: memo });
  if (!memos) return <button onClick={() => addMemo()}>+ memo</button>;
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
      <button onClick={() => addMemo()}>+ memo</button>
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
