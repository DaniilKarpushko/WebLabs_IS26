window.startTime = (new Date).getTime();

window.onload = function () {
    const loadTime = ((new Date).getTime() - window.startTime) / 1000;
    const footer = document.createElement('div');
    footer.textContent = "Page load time: " + loadTime.toFixed(3);
    footer.style.textAlign = "center";
    footer.style.marginTop = "20px";
    footer.style.backgroundColor = "green";
    document.body.appendChild(footer);
}