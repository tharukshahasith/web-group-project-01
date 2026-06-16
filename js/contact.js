let contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let allGroups = ["cfg-name","cfg-email","cfg-subject","cfg-message"];
        allGroups.forEach(function(id) { clearError(id); });

        let name    = document.getElementById("cName") ? document.getElementById("cName").value.trim() : "";
        let email   = document.getElementById("cEmail") ? document.getElementById("cEmail").value.trim() : "";
        let subject = document.getElementById("cSubject") ? document.getElementById("cSubject").value : "";
        let message = document.getElementById("cMessage") ? document.getElementById("cMessage").value.trim() : "";

        let valid = true;

        if (name.length < 2) {
            showError("cfg-name", "Please enter your name.");
            valid = false;
        }
        if (!isValidEmail(email)) {
            showError("cfg-email", "Enter a valid email address.");
            valid = false;
        }
        if (!subject) {
            showError("cfg-subject", "Please select a subject.");
            valid = false;
        }
        if (message.length < 15) {
            showError("cfg-message", "Message must be at least 15 characters.");
            valid = false;
        }

        if (valid) {
            let successEl = document.getElementById("contactSuccess");
            if (successEl) {
                successEl.style.display = "block";
                successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            setTimeout(function() { contactForm.reset(); }, 500);
        }
    });
}



// faq
let faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(function(item) {
    let question = item.querySelector(".faq-q");
    question.addEventListener("click", function() {
        let isOpen = item.classList.contains("open");
        // close all
        faqItems.forEach(function(i) { i.classList.remove("open"); });
        // open this one if it was closed
        if (!isOpen) {
            item.classList.add("open");
        }
    });
});


function showError(groupId, msg) {
    let group = document.getElementById(groupId);
    if (!group) return;
    group.classList.add("error");
    let err = group.querySelector(".err");
    if (err && msg) err.textContent = msg;
}

// helper: clear error
function clearError(groupId) {
    let group = document.getElementById(groupId);
    if (!group) return;
    group.classList.remove("error");
}

// email check
function isValidEmail(email) {
    // simple regex I found
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// phone check - at least 10 digits
function isValidPhone(phone) {
    let digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
}

// generate random booking reference
function makeRef() {
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    let ref = "DE-";
    for (let i = 0; i < 7; i++) {
        ref += chars[Math.floor(Math.random() * chars.length)];
    }
    return ref;
}