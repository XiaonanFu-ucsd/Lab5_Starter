// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const imgDisplay = document.querySelector('img');
    const selectHorn = document.getElementById('horn-select');
    const volumeCtrl = document.getElementById('volume');
    const playButton = document.querySelector('button');
    const audioElement = document.querySelector('audio');

    let volume = volumeCtrl.value;
    audioElement.volume = volume / 100;

    (function hornChange() {
        selectHorn.addEventListener('change', function() {
            let horn = selectHorn.value;
            imgDisplay.src = `assets/images/${horn}.svg`;
            audioElement.src = `assets/audio/${horn}.mp3`;
        });
    })();

    (function playSound_onClick() {
        playButton.addEventListener('click', function() {
            if (selectHorn.value != 'select') {
                audioElement.play();
            } else {
                console.log('No horn selected');
            }
        });
    })();

    (function volumeChange() {
        volumeCtrl.addEventListener('input', function() {
            let volume = volumeCtrl.value;
            audioElement.volume = volume / 100;
            let volImg = document.querySelector('div img');
            if (volume == 0) {
                volImg.src = 'assets/icons/volume-level-0.svg';
            }
            else if (volume < 33) {
                volImg.src = 'assets/icons/volume-level-1.svg';
            }
            else if (volume < 67) {
                volImg.src = 'assets/icons/volume-level-2.svg';
            }
            else {
                volImg.src = 'assets/icons/volume-level-3.svg';
            }
        });
    })();
}