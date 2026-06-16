
// -- MOBILE MENU TOGGLE --
function toggleMenu() {
    let menu = document.getElementById("mobileNav");
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
    } else {
        menu.classList.add("show");
    }
}

// close mobile menu when clicking outside
document.addEventListener("click", function(e) {
    let menu = document.getElementById("mobileNav");
    let btn = document.getElementById("hamburgerBtn");
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("show");
    }
});


function showTime() {
    let dateEl = document.getElementById("live-date");
    let timeEl = document.getElementById("live-time");
    if (!dateEl && !timeEl) return;
    let now = new Date();
    // format date
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
    let dayName = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    // format time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours == 0) hours = 12;
    // add leading zero
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (dateEl) dateEl.textContent = dayName + ", " + date + " " + month + " " + year;
    if (timeEl) timeEl.textContent = hours + ":" + minutes + ":" + seconds + " " + ampm;
}
// update every second
setInterval(showTime, 1000);
showTime();

//about page

function Count(id, target,delay) {
    
    for (let i = 1; i <= target; i++) {
      setTimeout(function(num) {document.getElementById(id).innerText = num}, i * delay, i);
    }
  }
  Count('NoOfVehicle',  150,10);
  Count('cutom',  12000,0.125);
  Count('location',  25,60);
  Count('yrs',25,60);