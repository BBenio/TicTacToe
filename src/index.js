import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsCurrent: true
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsCurrent ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsCurrent: !this.state.xIsCurrent
    });
  }

  render() {
    return (
      <div>
        <div className="status">{calculateStatus(this.state)}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateStatus({squares, xIsCurrent}) {
  const winner = calculateWinner(squares);

  if (winner) {
    return (winner + ' a gagné');
  } else {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return 'Joueur en cours : ' + (xIsCurrent ? 'X' : 'O');
      }
    }
  }
  return 'Personne n\'a gagné';
}
