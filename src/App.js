import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      text: "テキスト入力",
      isEditing: false,
    };

    this.updatePos = this.updatePos.bind(this);
    this.updateEditing = this.updateEditing.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  updatePos(newPos) {
    this.setState((state) => ({
      x: newPos.x,
      y: newPos.y,
    }));
  }
  updateEditing(newState) {
    this.setState((state) => ({
      isEditing: newState,
    }));
  }
  updateText(newText) {
    this.setState((state) => ({
      text: newText,
    }));
  }
  render() {
    return (
      <div
        className="App"
        onDrop={(e) => this.updatePos({ x: e.clientX, y: e.clientY })}
        onDragOver={(e) => e.preventDefault()}
      >
        <div
          className="Memo"
          style={{
            position: "absolute",
            top: this.state.y + "px",
            left: this.state.x + "px",
          }}
          draggable="true"
        >
          {this.state.isEditing ? (
            <textarea
              name=""
              id=""
              cols="15"
              rows="5"
              onBlur={(e) => this.updateEditing(false)}
              onChange={(e) => this.updateText(e.target.value)}
              defaultValue={this.state.text}
            ></textarea>
          ) : (
            <div onClick={(e) => this.updateEditing(true)}>
              {this.state.text}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
