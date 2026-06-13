// price calculator
// created by sandaruwan
document.getElementById('calcBtn').addEventListener('click', function () {
    const vehicle = document.getElementById('calcVehicle');
    const days = parseInt(document.getElementById('calcDays').value);
    let dailyRate = parseInt(vehicle.value);

    if (!dailyRate || !days || days < 1) {
        alert('Please select a vehicle and enter a valid number of days.');
        return;
    }

    // weekly rate map (matches table keys exactly)
    const weeklyRates = {
        3500: 22000,   // Suzuki Alto
        4000: 25000,   // Suzuki Wagon R
        6500: 40000,   // Toyota Prius
        8000: 50000,   // Toyota HIACE (KDH)
        6501: 40000,   // Suzuki Every (mapped to 6501 value handle to unique key)
        10500: 65000,  // Toyota Land Cruiser V8
        6200: 38500,   // Honda Vezel
        11500: 72000,  // BMW i8
        7000: 43500    // Toyota Premio
    };

    let total = 0;
    let breakdown = '';
    let actualDailyRate = dailyRate === 6501 ? 6500 : dailyRate; // Format logic adjustment for Suzuki Every

    if (days >= 7) {
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;
        const weeklyRate = weeklyRates[dailyRate];
        total = (weeks * weeklyRate) + (remainingDays * actualDailyRate);
        breakdown = weeks + ' week(s) × Rs. ' + weeklyRate.toLocaleString() +
            (remainingDays > 0 ? ' + ' + remainingDays + ' day(s) × Rs. ' + actualDailyRate.toLocaleString() : '');
    } else {
        total = days * actualDailyRate;
        breakdown = days + ' day(s) × Rs. ' + actualDailyRate.toLocaleString() + '/day';
    }

    document.getElementById('totalAmount').textContent = 'Rs. ' + total.toLocaleString();
    document.getElementById('calcBreakdown').textContent = breakdown;

    const result = document.getElementById('calcResult');
    result.classList.add('show');
});