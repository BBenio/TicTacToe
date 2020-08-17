import React from 'react';

export class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        key={"square" + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    let renderedSquare = [];
    let j = 0;
    for (let i = 0; i < this.props.squares.length; i = i+j) {
      let lines = [];
      for (j = 0; j < 3; j++) {
        lines.push(this.renderSquare(j+i));
      }
      if (i%3 === 0) {
        renderedSquare.push(<div className="board-row">{lines}</div>);
      }
    }

    return renderedSquare;
  }
}

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}
