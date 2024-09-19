document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const soundToggleButton = document.getElementById('sound-toggle');

    // Start with the sound off
    let isSoundOn = false;
    sessionStorage.setItem('sound', 'off');

    // Function to toggle sound on and off
    function toggleSound() {
        if (isSoundOn) {
            audio.pause();
            soundToggleButton.classList.remove('fa-volume-up');
            soundToggleButton.classList.add('fa-volume-mute');
            sessionStorage.setItem('sound', 'on');
        } else {
            audio.play().catch(error => {
                console.error("Error playing audio:", error);
            });
            soundToggleButton.classList.remove('fa-volume-mute');
            soundToggleButton.classList.add('fa-volume-up');
            sessionStorage.setItem('sound', 'off');
        }
        isSoundOn = !isSoundOn;
    }

    // Add event listener to the button
    soundToggleButton.addEventListener('click', toggleSound);
});


