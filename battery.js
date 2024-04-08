
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    const batteryPercentage = Math.round(battery.level * 100);

    const imageUrl = `https://robohash.org/${batteryPercentage}.png`;

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = `Robohash image for ${batteryPercentage}%`;

    const existingImage = document.querySelector('#robohash-image');
    if (existingImage) {
        existingImage.remove();
    }
    document.body.appendChild(image);
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
