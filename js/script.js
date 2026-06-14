
// -- MOBILE MENU TOGGLE --
function toggleMenu() {
    var menu = document.getElementById("mobileNav");
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
    } else {
        menu.classList.add("show");
    }
}

// close mobile menu when clicking outside
document.addEventListener("click", function(e) {
    var menu = document.getElementById("mobileNav");
    var btn = document.getElementById("hamburgerBtn");
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("show");
    }
});


function showTime() {
    const $dateEl = $("#live-date");
    const $timeEl = $("#live-time");
    if ($dateEl.length === 0 && $timeEl.length === 0) return;

    const now = new Date();

    // format date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    // format time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    // add leading zero
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if ($dateEl.length) $dateEl.text(`${dayName}, ${date} ${month} ${year}`);
    if ($timeEl.length) $timeEl.text(`${hours}:${minutes}:${seconds} ${ampm}`);
}

// update every second
setInterval(showTime, 1000);
showTime();