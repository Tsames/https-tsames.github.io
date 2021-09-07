/**************************************
Global DOM Elements
**************************************/
const $question = $('#question');
const $optionA = $('#a');
const $optionB = $('#b');
const $optionC = $('#c');
const $optionD = $('#d');
const $answer = $('#answer');
const $playerOne = $('#player1-score');
const $playerTwo = $('#player2-score');
const $round = $('#round');
const $reset = $('#reset');
const $slider = $('#slider');
const $victory = $('#victory');

/**************************************
Contentful API Object
**************************************/
const Cful = {
  URL: `https://cdn.contentful.com/spaces/o86estwy272y/environments/master/entries?access_token=QjguO3-gTGFIqcS-OrZ04jjGx-DNCxyH7yKJNwf8GI0&content_type=triviaQ`,
  payload: [],

  load() {
    const promise = $.ajax(this.URL).then((data) => {
      this.payload = [];
      for (let i = 0; i <= $slider[0].valueAsNumber - 1; i++) {
        const content = { question: null, optionA: null, optionB: null, optionC: null, optionD: null, answer: null }
        const random = Math.floor(Math.random() * (data.items.length - 1));
        content.question = data.items[random].fields.question;
        content.optionA = data.items[random].fields.a;
        content.optionB = data.items[random].fields.b;
        content.optionC = data.items[random].fields.c;
        content.optionD = data.items[random].fields.d;
        content.answer = data.items[random].fields.answer;
        this.payload.push(content);
        data.items.splice(random,1);
      }
      Game.next();
    }, (error) => {
      console.log("Error accessing API")
    })
  }
}

/**************************************
Trivia Game Object
**************************************/
const Game = {
  playerOneScore: 0,
  playerTwoScore: 0,
  round: 0,
  turn: 2,
  current: null,

  toggle() {
    this.round++;
    if (this.turn === 1) {
      this.turn = 2
      $playerTwo.addClass('turn');
      $playerOne.removeClass('turn');
    } else {
      this.turn = 1
      $playerOne.addClass('turn');
      $playerTwo.removeClass('turn');
    } 
  },

  extract() {
    if (Cful.payload.length >= 1) {
      const random = Math.floor(Math.random() * Cful.payload.length);
      this.current = Cful.payload[random]
      Cful.payload.splice(random, 1);
    } else {
      this.current = null;
    }
  },

  reset() {
    console.log($slider[0].valueAsNumber);
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.round = 0;
    this.turn = 2;
    Cful.load()
  },

  fill(end, answer) {
    $question.text(this.current.question);
    $optionA.text(this.current.optionA);
    $optionB.text(this.current.optionB);
    $optionC.text(this.current.optionC);
    $optionD.text(this.current.optionD);
    $playerOne.text(`Player 1: ${this.playerOneScore}`);
    $playerTwo.text(`Player 2: ${this.playerTwoScore}`);
    $round.text(`Round ${this.round}`);
    end ? $answer.text(answer) : $answer.text("");
  },

  next() {
    this.extract();
    if (this.current === null) {
      this.playerOneScore > this.playerTwoScore ? this.turn = 1 : this.turn = 2;
      $answer.text(`Thats the last of the questions!`);
      $victory.text(`Player ${ this.turn } wins!`);
    } else {
      this.toggle();
      this.fill();
    }
  },

  check(event) {
    if (event.target.innerText === this.current.answer) {
      this.turn === 1 ? this.playerOneScore++ : this.playerTwoScore++
      $(event.target).addClass('btn-success').removeClass('btn-primary');
      this.fill(true, `You got it right! Player ${this.turn} is awarded one point!`);
      setTimeout(function () {
        $(event.target).removeClass('btn-success').addClass('btn-primary')
        Game.next()
      }, 3500);
    } else {
      $(event.target).addClass('btn-danger').removeClass('btn-primary');
      this.fill(true, `Sorry, thats incorrect, ${this.current.answer} was the correct answer.`);
      setTimeout(function () {
        $(event.target).removeClass('btn-danger').addClass('btn-primary');
        Game.next();
      }, 3500);
    }
  }
}

/**************************************
Event Listeners
**************************************/
$optionA.on('click', function (evt) {
  Game.check(evt);
});
$optionB.on('click', function (evt) {
  Game.check(evt);
});
$optionC.on('click', function (evt) {
  Game.check(evt);
});
$optionD.on('click', function (evt) {
  Game.check(evt);
});
$reset.on('click', function (evt) {
  Game.reset();
});

/**************************************
Initial Load
**************************************/
Cful.load();