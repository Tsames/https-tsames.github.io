//Contentful API Object
const Cful = {
  BASE_URL: "https://cdn.contentful.com/",
  SPACE_ID: "o86estwy272y",
  API_KEY: "QjguO3-gTGFIqcS-OrZ04jjGx-DNCxyH7yKJNwf8GI0",
  URL: `https://cdn.contentful.com/spaces/o86estwy272y/environments/master/entries?access_token=QjguO3-gTGFIqcS-OrZ04jjGx-DNCxyH7yKJNwf8GI0&content_type=triviaQ`,

  content: { question: null, optionA: null, optionB: null, optionC: null, optionD: null, correctAnswer: null },
  payload: {},

  request() {
    const promise = $.ajax(this.URL).then((data) => {
      this.payload = data.items;
      this.extract();
    }, (error) => {
      console.log("Error accessing API")
    })
  },

  extract(idx = 0) {
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
const fill = () => {
  $question.text(Cful.content.question);
  $optionA.text(Cful.content.optionA);
  $optionB.text(Cful.content.optionB);
  $optionC.text(Cful.content.optionC);
  $optionD.text(Cful.content.optionD);
}

Cful.request();