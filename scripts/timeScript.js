(function () {
    window.addEventListener('load', function() {
        const loadTime = performance.now() / 1000;
        const footer = document.createElement('div');
        footer.textContent = "Page load time: " + loadTime.toFixed(3) + " Seconds";
        footer.style.textAlign = "center";
        footer.style.marginTop = "20px";
        footer.style.backgroundColor = "green";
        document.body.appendChild(footer);
    });
})();