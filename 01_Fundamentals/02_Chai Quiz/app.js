// 4. arrow function declaration
const calculatedChaiType = (answers) => {
  // 5. Initialize scores to be 0 like a scoreboard as user chooses the answer the score/count goes up
  const count = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };

  // 6. count answers, for each answer selected, increase its count by 1
  answers.forEach((answer) => {
    count[answer]++;
  });

  // console.log("Score count: ", count);
  // for eg. Score count:  {A: 2, B: 1, C: 1, D: 1}

  // 7. find the most selected answer
  let maxCount = 0; // at first most votes to a type is 0
  let chaiType = ""; // and no chai type is decided yet

  // loop through every chai type: A, B, C, D
  for (let type in count) {
    // eg. count['A'] > maxCount
    if (count[type] > maxCount) {
      // check whether count of this chai(eg. A ) ab tak k max se zyada hai? if yes then now this chai type is most popular (eg. A)
      maxCount = count[type];
      chaiType = type;
    }
  }

  // eg. return 'A'
  return chaiType; // returns the most voted chai (most selected option be it A, B, C, D) , back in the main submit listener gets stored as chaiType
};

// 8. after user submits quiz, calculatedChaiType() function ek chai type (like 'A', 'B') return karta hai. Ye chaiType ko lekar showResult() result screen pe final message display karta hai.
const showResult = (chaiType) => {
  // Data structure for result. one object holding 4 keys: A, B, C, D- har ek ek chai type. har key mein title and description hai
  const resultData = {
    A: {
      title: "Masala Chai 🌶☕",
      description:
        "Bold, unfiltered drama. You're the spice of every story and the main character of every group chat.",
    },
    B: {
      title: "Iced Chai Latte 🧊☕",
      description:
        "Cool on the outside, deep on the inside. You post cryptic captions, read books you never finish, and know exactly when to ghost and when to vibe.",
    },
    C: {
      title: "Cutting Chai 🍵",
      description:
        "No time for nonsense. You're street smart, spicy, and always one witty reply away.",
    },
    D: {
      title: "Green Tea with Lemon 🍋🍵",
      description:
        "Soft voice, savage soul. You’re gentle outside but can burn with one line. Calm, cute, but not to be underestimated.",
    },
  };

  // selecting elements from HTML .result targets div jaha output show hoga, .chai-result paragrapgh jissme title + description jayega
  const resultDiv = document.querySelector(".result");
  const resultText = document.querySelector(".chai-result");

  // removing already applied display none class
  resultDiv.classList.remove("d-none");
  resultDiv.style.display = "block"; // manually ensuring that result gets displayed
  // chaiType k basis pe resultData object se title + description pick karta hai.  usse innerHTML mein daal deta hai taaki show ho on webpage in browser
  resultText.innerHTML = `<strong>${resultData[chaiType].title}</strong><br><br>${resultData[chaiType].description}`;

  // scroll to result , bring result into view
  scrollTo({ top: 0, behavior: "smooth" });
};

// 1. Grabs the form element from HTML using its class .quiz-form. This lets you listen to events on this form.
const form = document.querySelector(".quiz-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 2. prevent the default browser action i.e from refreshing the page

  // 3. collects value from each question 1 to 5 and store them in an array userAnswers
  const userAnswers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
    form.q5.value,
  ];

  // checking answers in console for debugging
  console.log("User Answers: ", userAnswers);

  userAnswers.forEach((answer, i) => {
    console.log(`Answer to Q${i + 1}: ${answer}`);
  });

  // paases array of ans to a function that will decide what chai type user is
  const chaiType = calculatedChaiType(userAnswers);
  showResult(chaiType);
});
