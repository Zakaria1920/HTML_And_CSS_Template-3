let skill = document.querySelector(".our-skills");
let spans = document.querySelectorAll(".our-skills .skill span");
let counts = document.querySelectorAll(".our-skills .skill .count");
let started1 = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > skill.offsetTop - 200) {
    if (!started1) {
      spans.forEach((span) => startFill(span));
      counts.forEach((count) => startCoun(count));
    }
    started1 = true;
  }
});

function startFill(el) {
  let width = el.dataset.skill;
  el.style.width = `${width}%`;
}

function startCoun(el) {
  let count = el.dataset.skill;
  let int = setInterval(() => {
    el.innerText++;
    if (el.innerText == count) {
      clearInterval(int);
    }
  }, 1500 / count);
}

let awesome = document.querySelector(".awesome");
let nums = document.querySelectorAll(".awesome .num");
let started2 = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > awesome.offsetTop - 200) {
    if (!started2) {
      nums.forEach((num) => startCount(num));
    }
    started2 = true;
  }
});

function startCount(el) {
  let goal = el.dataset.awe;
  let count = setInterval(() => {
    el.innerText++;
    if (el.innerText == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}
