// event fires when the HTML document has been loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  // Assigning elements from the DOM to variables
  const squares = document.querySelectorAll('.grid div');
  const result = document.querySelector('#result');
  const displayCurrentPlayer = document.querySelector('#current-player');
  let currentPlayer = 1;
  let player1ScoreBoard = document.querySelector('#player1ScoreBoard');
  let player2ScoreBoard = document.querySelector('#player2ScoreBoard');
  // Displays to the user the score for each player that is stored in local storage
  player1ScoreBoard.innerHTML = localStorage.getItem('player1Score');
  player2ScoreBoard.innerHTML = localStorage.getItem('player2Score');
  // Arrays that contain all of the winning combinations to the game
  const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];
  // Function checks the board for a winner
  function checkBoard() {
    for (let y = 0; y < winningArrays.length; y++) {
      const square1 = squares[winningArrays[y][0]];
      const square2 = squares[winningArrays[y][1]];
      const square3 = squares[winningArrays[y][2]];
      const square4 = squares[winningArrays[y][3]];

      if (
        square1.classList.contains('player-one') &&
        square2.classList.contains('player-one') &&
        square3.classList.contains('player-one') &&
        square4.classList.contains('player-one')
      ) {
        // Getting the player's score from local storage to keep track on a scoreboard
        let p1 = JSON.parse(localStorage.getItem('player1Score'));
        let count = p1;
        count++;
        // Incrementing the score each time a player has won
        localStorage.setItem('player1Score', count);
        // Alerts the player that they have won
        swal({
          title: 'Player 1 wins!',
          text: 'Congratulations!',
          icon: 'success',
        });
        // After the game has finished the window will refresh automatically
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (
        square1.classList.contains('player-two') &&
        square2.classList.contains('player-two') &&
        square3.classList.contains('player-two') &&
        square4.classList.contains('player-two')
      ) {
        let p2 = JSON.parse(localStorage.getItem('player2Score'));
        let count = p2;
        count++;
        localStorage.setItem('player2Score', count);

        swal({
          title: 'Player 2 wins!',
          text: 'Congratulations!',
          icon: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }

  for (let i = 0; i < squares.length; i++) {
    // adding an onclick to every square in the grid
    squares[i].onclick = () => {
      // if the square below has the 'taken' class, you can place a piece on top of it unless the square has already been chosen
      if (
        squares[i + 7].classList.contains('taken') &&
        !squares[i].classList.contains('taken')
      ) {
        // Depending on the player, when the square is clicked, it will display the correct color as well as adding the 'taken' class so that a new piece can be placed on top of it
        // The player's turn then switches and displays it to the user
        if (currentPlayer == 1) {
          squares[i].classList.add('taken');
          squares[i].classList.add('player-one');
          currentPlayer = 2;
          displayCurrentPlayer.innerHTML = currentPlayer;
        } else if (currentPlayer == 2) {
          squares[i].classList.add('taken');
          squares[i].classList.add('player-two');
          currentPlayer = 1;
          displayCurrentPlayer.innerHTML = currentPlayer;
        }
      }
      // Handling the user error of not clicking on the correct place
      else
        swal({
          title: "Can't go here!",
          text: 'Player must place their piece on the bottom row or on top of another piece',
          icon: 'error',
        });
      // Function runs to see if there has been a winner
      checkBoard();
    };
  }
});
