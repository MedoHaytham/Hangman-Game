//letters
let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
let lettersCon = document.querySelector('.letters');

//Generate letters
letters.forEach((letter) => {
  let span = document.createElement('span');
  span.className = 'letter';
  span.textContent = letter;
  lettersCon.appendChild(span);
});

// Object of words
let words = {
  animals: ["Lion", "Elephant", "Giraffe", "Tiger", "Zebra", "Kangaroo", "Panda", "Dolphin", "Eagle", "Penguin"],
  sports: ["Football", "Basketball", "Tennis", "Swimming", "Volleyball", "Baseball", "Running", "Boxing", "Golf", "Table Tennis"],
  jops: ["Baker", "Doctor", "Teacher", "Designer", "Data Scientist", "Electrician", "Chef", "Photographer", "Developer", "Accountant"],
  countries: ["Egypt", "United States", "Canada", "Brazil", "Germany", "Japan", "Australia", "India", "Spain", "South Africa"]
}

// Generate random category and random word form category
let properties = Object.keys(words)
let randomProperty = Math.floor(Math.random() * properties.length);
let category = properties[randomProperty];
let randomValue = Math.floor(Math.random() * words[category].length);
let word = words[category][randomValue];

let categorySpan = document.querySelector('.category span');
categorySpan.textContent = category;

// convert chosen word to array
let wordLetters = Array.from(word.toUpperCase());
console.log(wordLetters);

let lettersGuess = document.querySelector('.letters-guess');

wordLetters.forEach((letter) => {
  let div = document.createElement('div');
  let span = document.createElement('span');
  if(letter === ' ') {
    letter = `‎`;
    div.classList.add('empty-letter');
  } else {
    span.classList.add('empty-span');
    span.classList.add('hidden');
  }
  span.textContent = letter;
  div.appendChild(span)
  lettersGuess.appendChild(div);
});


let wrong = 0;
let maxWrong = 8;
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('letter')){

    if(wordLetters.includes(e.target.textContent)){
      e.target.style.backgroundColor = '#6aaa64';
      
      let spans = document.querySelectorAll('.hidden');
      spans.forEach((span) => {
        if (span.textContent === e.target.textContent) {
          span.classList.remove('hidden');
        }
      });
      let hiddenSpans = document.querySelectorAll('.hidden');
      if(hiddenSpans.length === 0) {
        let letters = document.querySelectorAll('.letter');
        letters.forEach((letter) => letter.style.pointerEvents = 'none');
        let wonMsg = document.querySelector('.win-msg');
        let playAgainButton = document.querySelector('.win-msg .window button');
        wonMsg.style.display = 'flex';
        playAgainButton.addEventListener('click', () => location.reload());
      };
    }else { 
      wrong++;
      e.target.style.backgroundColor = '#787c7e';
      document.querySelector('.hangman-draw').classList.add(`wrong-${wrong}`)
      if (wrong === maxWrong) {
        let letters = document.querySelectorAll('.letter');
        letters.forEach((letter) => letter.style.pointerEvents = 'none');
        let gameOverMsg = document.querySelector('.game-over');
        document.querySelector('.game-over p span').textContent = word;
        gameOverMsg.style.display = 'block';
        let playAgainButton = document.querySelector('.game-over button');
        playAgainButton.addEventListener('click', ()=> location.reload());
      }
    }
    e.target.style.pointerEvents = 'none';
  }
});




