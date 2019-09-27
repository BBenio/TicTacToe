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

  renderSquare(i) {
    return (
      <Square
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

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsCurrent: true,
      stepNumber: 0,
      reversedMovementsDisplay: false
    }
  }

  handleClickBoard(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsCurrent ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsCurrent: !this.state.xIsCurrent,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsCurrent: (step % 2) === 0,
      history: this.state.history.slice(0, step+1)
    });
  }

  reverse() {
    this.setState({
      reversedMovementsDisplay: !this.state.reversedMovementsDisplay,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let moves = history.map((step, move) => {
      const desc = move ?
        'Go back to #' + move :
        'Go back to the beginning';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (this.state.reversedMovementsDisplay) {
      moves = moves.slice().reverse();
    }

    let status = calculateStatus({squares: current.squares, xIsCurrent: this.state.xIsCurrent});

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClickBoard(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => {this.reverse()}}>Reverse the order</button>
          <ul>{moves}</ul>
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
    return (winner + ' win!');
  } else {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return 'Player:' + (xIsCurrent ? 'X' : 'O');
      }
    }
  }
  return 'Nobody win';
}
