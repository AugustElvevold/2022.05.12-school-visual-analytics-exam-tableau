function checkWidthAndAlert() {
    var hasSeenAlert = localStorage.getItem('hasSeenZoomOutAlert');
    if (hasSeenAlert) {
        return; // User has already seen the alert; exit the function
    }

    var windowWidth = window.innerWidth;
    var allElements = document.querySelectorAll('body *');

    for (var el of allElements) {
        var rect = el.getBoundingClientRect();
        if (rect.left < 0 || rect.right > windowWidth) {
            Swal.fire({
                title: 'Need a Better View?',
                text: 'Some content may be cut off. Try zooming out for a full view. On Windows, press CTRL and - (minus). On Mac, press ⌘ and - (minus).',
                icon: 'info',
                confirmButtonText: 'Got it!',
                background: '#292929',
                color: '#fff',
                confirmButtonColor: '#3085d6',
            });

            localStorage.setItem('hasSeenZoomOutAlert', 'true');
            return; // Exit the function after showing the alert
        }
    }
}

window.onload = function() {
    var interval = setInterval(checkWidthAndAlert, 1000); // Check every second

    setTimeout(function() {
        clearInterval(interval); // Clear the interval after 5 seconds
    }, 5000);
};

window.onresize = checkWidthAndAlert;
