import { Board } from './BoardComponent';
import React from 'react'
import {calculateStatus, calculateWinner} from "./helper"

export class Game extends React.Component {
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
          <li key={'move' + move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      if (this.state.reversedMovementsDisplay) {
        moves = moves.slice().reverse();
      }

      let status = calculateStatus({squares: current.squares, xIsCurrent: this.state.xIsCurrent});

      if (calculateWinner(current.squares)) {

        let restart =
          <li key='restart'>
            <button onClick={() => this.jumpTo(0)}>Restart</button>
          </li>
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
              <ul>{restart}</ul>
            </div>
          </div>
        )
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              key={'board'}
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
