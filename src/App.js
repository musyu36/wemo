import React, { Component } from "react";
import "./App.css";

// function App() {
//   const pos = { x: 0, y: 0 };

//   return (
//     <div
//       className="App"
//       onDrop={(e) => setPos({ x: e.clientX, y: e.clientY })}
//       onDragOver={(e) => e.preventDefault()}
//     >
//       <div className="Memo" draggable="true">
//         テキスト入力
//       </div>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };

    this.updatePos = this.updatePos.bind(this);
  }

  updatePos(newPos) {
    this.setState((state) => ({
      x: newPos.x,
      y: newPos.y,
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
          テキスト入力
        </div>
      </div>
    );
  }
}

export default App;
