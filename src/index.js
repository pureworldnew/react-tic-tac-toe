import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex',
};

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
};

const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

const winnerSquaresStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: 'red',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'black',
};

function Square(props) {
  return (
    <button
      className="square"
      style={props.isWinnerSquare ? winnerSquaresStyle : squareStyle}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winnerSquares: [],
    };
  }

  calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], [a, b, c]];
      }
    }
    return null;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const [winner, winnerSquares] = this.calculateWinner(squares)
      ? this.calculateWinner(squares)
      : [null, null];
    console.log('winnerSquares', winnerSquares, winner);
    if (winnerSquares) {
      this.setState({ winnerSquares: winnerSquares });
    }
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(winnerSquares, i) {
    return (
      <Square
        isWinnerSquare={winnerSquares ? winnerSquares.indexOf(i) !== -1 : false}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winnerSquares: [],
    });
  }

  render() {
    const [winner, winnerSquares] = this.calculateWinner(this.state.squares)
      ? this.calculateWinner(this.state.squares)
      : [null, null];
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>
          {status}
        </div>
        <button
          style={buttonStyle}
          onClick={() => {
            this.handleReset();
          }}
        >
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            {this.renderSquare(winnerSquares, 0)}
            {this.renderSquare(winnerSquares, 1)}
            {this.renderSquare(winnerSquares, 2)}
          </div>
          <div className="board-row" style={rowStyle}>
            {this.renderSquare(winnerSquares, 3)}
            {this.renderSquare(winnerSquares, 4)}
            {this.renderSquare(winnerSquares, 5)}
          </div>
          <div className="board-row" style={rowStyle}>
            {this.renderSquare(winnerSquares, 6)}
            {this.renderSquare(winnerSquares, 7)}
            {this.renderSquare(winnerSquares, 8)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
