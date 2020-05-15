import React from "react";
import { firebaseDb } from "./firebase/firebase";
import "./App.css";
import "./Memo.css";

const App = () => {
  let db = firebaseDb.ref("/room_url");
  React.useEffect(() => {
    // RealtimeDBの読み込み
    // db.onでオンラインに保存されているJSONに変更がある度に第２引数の関数を実行してstateを変更
    db.on("value", (value) => setMemos(value.val()));
  }, []);

  const headerColors = ["#d0e9d9", "#efc8cf", "#d2c0d5", "#d9e3e3", "#f6dec9"];

  // どのメモをドラッグ中か
  const [dragging, setDragging] = React.useState({ key: "", x: 0, y: 0 });
  // どのメモを編集中か
  const [editing, setEditing] = React.useState({ key: "" });
  const [memos, setMemos] = React.useState(null);

  const addMemo = () => {
    // 先にキーを登録
    const newPostKey = db.push().key;
    // 初期値でupdate
    db.update({
      [newPostKey]: {
        t: "テキストを入力",
        x: Math.floor(Math.random() * (200 - 80) + 80),
        y: Math.floor(Math.random() * (200 - 80) + 80),
        color: headerColors[Math.floor(Math.random() * headerColors.length)],
      },
    });
  };

  // メモ更新
  const updateMemo = (key, memo) => {
    if (!memo.t) {
      memo.t = "テキストを入力";
    }
    db.update({ [key]: memo });
  };

  // メモ削除
  const removeMemo = (key) => db.child(key).remove();

  if (!memos)
    return (
      <button className="btn-add" onClick={() => addMemo()}>
        + memo
      </button>
    );
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
      <button className="btn-add" onClick={() => addMemo()}>
        + memo
      </button>
      {Object.keys(memos).map((key) => (
        <div
          className="Memo"
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
          <div
            className="memo-header"
            style={{
              backgroundColor: memos[key].color,
            }}
          >
            <button className="delete-btn" onClick={() => removeMemo(key)}>
              ×
            </button>
          </div>
          {editing.key === key ? (
            <textarea
              className="memo-text"
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
            <div className="memo-text" onClick={(e) => setEditing({ key })}>
              {memos[key].t}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
