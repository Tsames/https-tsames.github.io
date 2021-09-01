//Global Variables
const Cful = {
  BASE_URL: "https://cdn.contentful.com/",
  SPACE_ID: "o86estwy272y",
  API_KEY: "QjguO3-gTGFIqcS-OrZ04jjGx-DNCxyH7yKJNwf8GI0",

  content: { question: null, optionA: null, optionB: null, optionC: null, optionD: null, correctAnswer: null },
  payload: {},

  url: function () {
    const url = `${BASE_URL}spaces/${SPACE_ID}/environments/master/entries?access_token=${API_KEY}&content_type=triviaQ`;
  },

  request: function () {
    const promise = $.ajax(this.url).then((data) => {
      this.payload = data.items;
    }, (error) => {
      console.log("Error accessing API")
    })
  },

  extract: function (idx = 0) {
    this.content.question = this.payload[idx].fields.question;
    this.content.optionA = this.payload[idx].fields.a;
    this.content.optionB = this.payload[idx].fields.b;
    this.content.optionC = this.payload[idx].fields.c;
    this.content.optionD = this.payload[idx].fields.d;
    this.content.correctAnswer = this.payload[idx].fields.answer;
  }
}

//DOM Elements
const $question = $('#question');
const $optionA = $('#a');
const $optionB = $('#b');
const $optionC = $('#c');
const $optionD = $('#d');

//Callback Functions
// const fill = () => {
//   $question.text(content.question);
//   $optionA.text(content.optionA);
//   $optionB.text(content.optionB);
//   $optionC.text(content.optionC);
//   $optionD.text(content.optionD);
// }

Cful.request();
Cful.extract();
console.log(Cful.content)