function checkWidthAndAlert() {
    var hasSeenAlert = localStorage.getItem('hasSeenZoomOutAlert');
    if (hasSeenAlert) {
        return;
    }

    var windowWidth = window.innerWidth;
    var thresholdWidth = 1024; // Threshold for smaller screens

    // Check if the screen width is less than the threshold
    if (windowWidth <= thresholdWidth) {
        showAlert('This page is best viewed on a larger screen.');
        return;
    }

    var allElements = document.querySelectorAll('body *');

    // Check if any element is cut off
    for (var el of allElements) {
        var rect = el.getBoundingClientRect();
        if (rect.left < 0 || rect.right > windowWidth) {
            showAlert('Some content may be cut off. Try zooming out for a full view. On Windows, press CTRL and - (minus). On Mac, press ⌘ and - (minus).');
            return;
        }
    }
}

function showAlert(message) {
    Swal.fire({
        title: 'Need a Better View?',
        text: message,
        icon: 'info',
        confirmButtonText: 'Got it!',
        background: '#292929',
        color: '#fff',
        confirmButtonColor: '#3085d6',
    });

    localStorage.setItem('hasSeenZoomOutAlert', 'true');
}

window.onload = function() {
    var interval = setInterval(checkWidthAndAlert, 1000); // Check every second

    setTimeout(function() {
        clearInterval(interval); // Clear the interval after 5 seconds
    }, 5000);
};

window.onresize = checkWidthAndAlert;