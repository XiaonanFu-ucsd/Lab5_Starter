// explore.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
    // load all aviailable voice
    const voiceSelect = document.getElementById('voice-select');
    //const synth = window.speechSynthesis;


    let synth = window.speechSynthesis;
    console.log(synth);
    // wait for the voice to be loaded
    if (synth.getVoices().length === 0) {
        await new Promise((resolve, reject) => {
            // if take too long, reject
            let timeout_id = setTimeout(() => {
                alert("Failed to load voices");
                reject();
            }, 1000);
            window.speechSynthesis.onvoiceschanged = function () {
                const voices = window.speechSynthesis.getVoices();
                console.log(voices);
                synth = window.speechSynthesis;
                resolve();
                // cancel the timeout
                clearTimeout(timeout_id);
            }

        });
    }


    console.log(synth.getVoices());
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.value = voice.name;
        voiceSelect.appendChild(option);
    }

    const talkButton = document.querySelector('button');
    const textInput = document.getElementById('text-to-speak');

    (function talk_onClick() {
        talkButton.addEventListener('click', function () {
            // if is speaking, return
            if (synth.speaking) {
                return;
            }

            let utterance = new SpeechSynthesisUtterance(textInput.value);
            let selectedVoice = voiceSelect.value;
            for (let voice of synth.getVoices()) {
                if (voice.name === selectedVoice) {
                    utterance.voice = voice;
                }
            }
            synth.speak(utterance);

            // add animation
            let faceHtml = document.querySelector('img');
            faceHtml.src = 'assets/images/smiling-open.png';
            utterance.addEventListener('end', function () {
                faceHtml.src = 'assets/images/smiling.png';
            });
        });
    })();
}