let progPage = document.querySelector(".page-prog");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let top = document.documentElement.scrollTop;
  progPage.style.width = `${parseFloat((top / height) * 100)}%`;
});
// *************** //

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

// *************** //

let targetDate = new Date("Mar 31 2024 23:59:59");
let counter = setInterval(() => {
  let date = new Date();
  let finalDate = targetDate - date;

  let days = Math.floor(finalDate / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (finalDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((finalDate % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((finalDate % (1000 * 60)) / 1000);

  document.querySelector(".time .unit span.days").innerHTML =
    days < 10 ? `0${days}` : days;
  document.querySelector(".time .unit span.hours").innerHTML =
    hours < 10 ? `0${hours}` : hours;
  document.querySelector(".time .unit span.minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".time .unit span.seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (targetDate < 0) {
    clearInterval(counter);
  }
}, 1000);

// *************** //

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

// *************** //

let priceContainers = document.querySelectorAll(".change");
let priceNames = document.querySelectorAll("span.priceN");
let priceCounts = document.querySelectorAll("span.priceC");

fetch(
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=54760d9691e64f72b5724743e2bd99e5"
)
  .then(async (result) => {
    if (!result.ok) {
      throw new Error("Failed to fetch currency data");
    }
    let data = await result.json();
    return data;
  })
  .then((result) => {
    let currencyRates = result.rates;
    let baseCurrency = result.base;
    let currencyOptions = `<option value="${baseCurrency}">${baseCurrency}</option>`;
    for (let currency in currencyRates) {
      currencyOptions += `<option value="${currency}">${currency}</option>`;
    }
    priceContainers.forEach((price) => {
      price.innerHTML = currencyOptions;
    });
    priceContainers.forEach((price, index) => {
      price.addEventListener("change", function () {
        let selectedCurrency = this.value;
        priceCounts.forEach((count) => {
          let priceValue = parseFloat(count.dataset.price);
          let convertedPrice = priceValue * currencyRates[selectedCurrency];
          priceCounts[index].innerHTML = convertedPrice.toFixed(2);
          priceNames[index].innerHTML = selectedCurrency;
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching currency data:", error);
  });
