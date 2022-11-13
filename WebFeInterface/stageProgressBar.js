
const progressBar = document.getElementById("progress-bar");
const progressNextElement = document.getElementById("progress-next");
const progressPrevElement = document.getElementById("progress-prev");
const steps = document.querySelectorAll(".step");
let active = 1;


function progressNext(event) {
    active++;
    if (active > steps.length) {
        active = steps.length;
    }
    updateProgress();
}
  
function progressPrev(event) {
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
}

function test123() {
    console.log('PROSOO')
}

const updateProgress = () => {
    // toggle active class on list items
    steps.forEach((step, i) => {
      if (i < active) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
    // set progress bar width  
    progressBar.style.width = 
      ((active - 1) / (steps.length - 1)) * 100 + "%";
    // enable disable prev and next buttons
    if (active === 1) {
      progressPrevElement.disabled = true;
    } else if (active === steps.length) {
      progressNextElement.disabled = true;
    } else {
      progressPrevElement.disabled = false;
      progressNextElement.disabled = false;
    }
};