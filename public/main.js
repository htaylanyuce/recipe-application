function updateProgress(num1, num2){
  let percent = Math.ceil( num1 / num2 * 100 ) + '%';
  document.getElementById('progress').style.width = percent;
}

window.addEventListener('scroll', ()=>{
  let top = window.scrollY;
  let height = document.body.getBoundingClientRect().height - window.innerHeight;
  updateProgress(top, height);
});

function myFunction() {
    let x = document.getElementById("iframe");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}
