require('normalize.css/normalize.css')
require('../../assets/css/main.less');
require('./index.less');

const name = 'zbc';
console.log(`my name is ${name}`);


const numSteps = 20.0;

let boxElement;
let prevRatio = 0.0;
let increasingColor = "rgba(40, 40, 190, ratio)";
let decreasingColor = "rgba(190, 40, 40, ratio)";


function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    console.log(`isIntersecting:${entry.isIntersecting}, intersectionRatio:${entry.intersectionRatio}`);
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    prevRatio = entry.intersectionRatio;
  });
}

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

boxElement = document.querySelector("#div1 .box");

createObserver();


// Set things up
window.addEventListener("load", (event) => {
  
}, false);