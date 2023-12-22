document.addEventListener('DOMContentLoaded', function() {
    const preloadingScreen = document.querySelector('.preloading-screen');

    setTimeout(function() {
        preloadingScreen.style.opacity = '0'; // Start transition
        setTimeout(function() {
            preloadingScreen.style.display = 'none'; // Hide element after transition
        }, 2000); // 2 seconds for ease-out
    }, 6000); // 6 seconds delay
});
