function showTime() {
    var dateEl = document.getElementById("live-date");
    var timeEl = document.getElementById("live-time");

    if (!dateEl && !timeEl) return;

    var now = new Date();

    // format date
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

    var dayName = days[now.getDay()];
    var date = now.getDate();
    var month = months[now.getMonth()];
    var year = now.getFullYear();

    // format time
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? "PM" : "AM";
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