document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "owl",
      src: "images/owl.png",
    },
    {
      name: "owl",
      src: "images/owl.png",
    },
    {
      name: "whale",
      src: "images/whale.png",
    },
    {
      name: "whale",
      src: "images/whale.png",
    },
    {
      name: "bird",
      src: "images/bird.png",
    },
    {
      name: "bird",
      src: "images/bird.png",
    },
    {
      name: "earth",
      src: "images/earth.png",
    },
    {
      name: "earth",
      src: "images/earth.png",
    },
    {
      name: "frog",
      src: "images/frog.png",
    },
    {
      name: "frog",
      src: "images/frog.png",
    },
    {
      name: "koala",
      src: "images/koala.png",
    },
    {
      name: "koala",
      src: "images/koala.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const commentaryDisplay = document.querySelector("#commentary");
  let userGuesses = [];
  let userGuessesID = [];
  let cardsWon = [];
  let first = true;

  //create the board

  function setUpBoard(){

    if(first){

      first = false;

      for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("src", "images/blankSquare.png");
        card.setAttribute("id", i);
        card.addEventListener("click", flipcard);
        grid.appendChild(card);

      }
    } else {
   
      let cards = document.querySelectorAll("img");
      cardsWon = [];
      resultDisplay.textContent = "";
      commentaryDisplay.textContent = "";
      cardArray.sort(() => 0.5 - Math.random());

      for(let j = 0; j < cards.length; j++){
        cards[j].setAttribute("src", "images/blankSquare.png");
        cards[j].setAttribute("id", j);
      }
    }
  };

  //check for matches

  function checkForMatch() {
    let cards = document.querySelectorAll("img");

    const optionOneId = userGuessesID[0];
    const optionTwoId = userGuessesID[1];

    if (userGuesses[0] === userGuesses[1]) {
      commentaryDisplay.textContent = "You found a match!"
      cards[optionOneId].setAttribute("src", "images/whiteSquare.png");
      cards[optionTwoId].setAttribute("src", "images/whiteSquare.png");
      cardsWon.push(userGuesses);
    } else {
      cards[optionOneId].setAttribute("src", "images/blankSquare.png");
      cards[optionTwoId].setAttribute("src", "images/blankSquare.png");
    }

    //clear the guesses array

    userGuesses = [];
    userGuessesID = [];

    //display result

    resultDisplay.textContent = "Score:   " + cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent =
        "Congratulations!  You found all the matches.";
    }
  }

  //flip card - get the event details on click, push the name of the card guessed into the user guesses array

  function flipcard() {
    commentaryDisplay.textContent = "";
    let cardId = this.getAttribute("id");

    userGuesses.push(cardArray[cardId].name);
    userGuessesID.push(cardId);
    this.setAttribute("src", cardArray[cardId].src);

    if (userGuesses.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  let resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", setUpBoard);

  setUpBoard();
});
