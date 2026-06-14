// helper: mark field as error
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

function updateSummary() {
    let vehicleEl  = document.getElementById("bVehicle");
    let pickupEl   = document.getElementById("bPickup");
    let returnEl   = document.getElementById("bReturn");
    let locationEl = document.getElementById("bLocation");

    if (!vehicleEl) return;

    // vehicle name and rate
    let selectedOption = vehicleEl.options[vehicleEl.selectedIndex];
    let vehicleName = vehicleEl.value ? selectedOption.text.split("(")[0].trim() : "—";
    let rate = vehicleEl.value ? parseInt(vehicleEl.value) : 0;

    let locationName = locationEl && locationEl.value ? locationEl.value : "—";
    let pickupVal = pickupEl ? pickupEl.value : "";
    let returnVal = returnEl ? returnEl.value : "";

    let days = 0;
    let totalStr = "—";

    if (pickupVal && returnVal) {
        let d1 = new Date(pickupVal);
        let d2 = new Date(returnVal);
        if (d2 > d1) {
            days = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
            if (rate > 0) {
                totalStr = "Rs. " + (rate * days).toLocaleString();
            }
        }
    }

    let set = function(id, val) {
        let el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    set("sumVehicle",   vehicleEl.value ? vehicleName : "—");
    set("sumLocation",  locationEl && locationEl.value ? locationName : "—");
    set("sumPickup",    pickupVal || "—");
    set("sumReturn",    returnVal || "—");
    set("sumDays",      days > 0 ? days + " day" + (days > 1 ? "s" : "") : "—");
    set("sumTotal",     totalStr);
}

// booking form submission
let bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // clear all errors first
        let allGroups = ["fg-name","fg-email","fg-phone","fg-vehicle","fg-pickup","fg-return","fg-location"];
        allGroups.forEach(function(id) { clearError(id); });

        let name     = document.getElementById("bName") ? document.getElementById("bName").value.trim() : "";
        let email    = document.getElementById("bEmail") ? document.getElementById("bEmail").value.trim() : "";
        let phone    = document.getElementById("bPhone") ? document.getElementById("bPhone").value.trim() : "";
        let vehicle  = document.getElementById("bVehicle") ? document.getElementById("bVehicle").value : "";
        let pickup   = document.getElementById("bPickup") ? document.getElementById("bPickup").value : "";
        let ret      = document.getElementById("bReturn") ? document.getElementById("bReturn").value : "";
        let location = document.getElementById("bLocation") ? document.getElementById("bLocation").value : "";

        let valid = true;
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        if (name.length < 3) {
            showError("fg-name", "Please enter your full name.");
            valid = false;
        }
        if (!isValidEmail(email)) {
            showError("fg-email", "Please enter a valid email address.");
            valid = false;
        }
        if (!isValidPhone(phone)) {
            showError("fg-phone", "Enter a valid phone number (at least 10 digits).");
            valid = false;
        }
        if (!vehicle) {
            showError("fg-vehicle", "Please select a vehicle.");
            valid = false;
        }
        if (!pickup) {
            showError("fg-pickup", "Please select a pickup date.");
            valid = false;
        } else if (new Date(pickup) < today) {
            showError("fg-pickup", "Pickup date cannot be in the past.");
            valid = false;
        }
        if (!ret) {
            showError("fg-return", "Please select a return date.");
            valid = false;
        } else if (pickup && new Date(ret) <= new Date(pickup)) {
            showError("fg-return", "Return date must be after pickup date.");
            valid = false;
        }
        if (!location) {
            showError("fg-location", "Please choose a pickup location.");
            valid = false;
        }

        if (valid) {
            // show success
            let ref = makeRef();
            let refEl = document.getElementById("bookingRef");
            if (refEl) refEl.textContent = ref;

            let successEl = document.getElementById("bookingSuccess");
            if (successEl) {
                successEl.style.display = "block";
                successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }

            // reset form after short delay
            setTimeout(function() {
                bookingForm.reset();
                updateSummary();
            }, 500);
        }
    });

    // attach live summary listeners
    ["bVehicle","bPickup","bReturn","bLocation"].forEach(function(id) {
        let el = document.getElementById(id);
        if (el) el.addEventListener("change", updateSummary);
    });

    updateSummary();
}