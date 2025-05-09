const correctAnswers = ["B", "B", "B", "B"];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  // prevent default browser action
  e.preventDefault();

  // for getting scores of quiz logic
  let score = 0;
  let userAnswers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
  ];

  // check Answers with correctAnswers array
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });

  // console.log(score);  // shows score on console

  // show result on screen webpage
  scrollTo({ top: 0, behaviour: "smooth" });
  result.classList.remove("d-none");

  let output = 0;
  const timer = setInterval(() => {
    result.querySelector("span").textContent = `${output}%`;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
});

// window object (global object) - mother of all objects

// console.log('hello');
// window.console.log('hello');

// console.log(document.querySelector('form'));
// console.log(window.document.querySelector('form'));   // window is inferred coz form is stored on window object

// alert('hello);
// window.alert('hello);

// setTimeout(() => {     // this method waits for upto 3 secs and then gives alert msg as pop up
//      alert('hello, ninjas');
// }, 3000);

// let i = 0;
// const timer = setInterval(() => {
//     console.log('hello');
//     i++;
//     if (i === 5) {
//        clearInterval(timer);   // we gonna stop the interval from firing again
//    }
// }, 1000);

/* 
first we gonna set i to be 0 then we fire this function setInterval() and store it in timer , then the callback function () => {} here fires 
after one second and it increases i by one and it fires after every one second thereafter until eventually i equals to be 5 then we use the 
clearInterval to stop the interval from firing again
*/
