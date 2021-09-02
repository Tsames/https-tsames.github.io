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

/**************************************
Contentful API Object
**************************************/
const Cful = {
  URL: `https://cdn.contentful.com/spaces/o86estwy272y/environments/master/entries?access_token=QjguO3-gTGFIqcS-OrZ04jjGx-DNCxyH7yKJNwf8GI0&content_type=triviaQ`,
  content: { question: null, optionA: null, optionB: null, optionC: null, optionD: null, answer: null },
  payload: {},

  peek() {
    console.log(`content is: ${this.content}`);
    console.log(`payload is: ${this.payload}`);
  },

  load() {
    const promise = $.ajax(this.URL).then((data) => {
      this.payload = data.items;
      Game.next()
    }, (error) => {
      console.log("Error accessing API")
    })
  },

  extract(idx = 0, remove = false) {
    this.content.question = this.payload[idx].fields.question;
    this.content.optionA = this.payload[idx].fields.a;
    this.content.optionB = this.payload[idx].fields.b;
    this.content.optionC = this.payload[idx].fields.c;
    this.content.optionD = this.payload[idx].fields.d;
    this.content.answer = this.payload[idx].fields.answer;
    remove ? delete this.payload[idx] : null
  }
}

/**************************************
Trivia Game Object
**************************************/
const Game = {
  playerOneScore: 0,
  PlayerTwoScore: 0,
  round: 0,
  turn: 2,

  fill(answer = false) {
    $question.text(Cful.content.question);
    $optionA.text(Cful.content.optionA);
    $optionB.text(Cful.content.optionB);
    $optionC.text(Cful.content.optionC);
    $optionD.text(Cful.content.optionD);
    $playerOne.text(`Player 1: ${this.playerOneScore}`);
    $playerTwo.text(`Player 2: ${this.PlayerTwoScore}`);
    $round.text(`Round: ${this.round}`);
    answer ? $answer.text(`The correct answer was: ${Cful.content.answer}`) : null
  },

  check(event) {
    console.log(event);
  },

  toggle() {
    this.round ++;
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn === 1
    }
  },

  next() {
    random = Math.floor(Math.random * Cful.payload.length - 1);
    Cful.extract(random, true);
    this.toggle;
    this.fill();
  }
}

/**************************************
Event Listeners
**************************************/
$optionA.on('click', function(evt) {
  Game.check(evt);
});
$optionB.on('click', function(evt) {
  Game.check(evt);
});
$optionC.on('click', function (evt) {
  Game.check(evt);
});
$optionD.on('click', function (evt) {
  Game.check(evt);
});

/**************************************
Initial Load
**************************************/
Cful.load();