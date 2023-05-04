// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    // load all aviailable voice
    const voiceSelect = document.getElementById('voice-select');
    const synth = window.speechSynthesis;
    console.log(synth.getVoices());
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.value = voice.name;
        voiceSelect.appendChild(option);
    }

    const talkButton = document.querySelector('button');
    const textInput = document.getElementById('text-to-speak');
    
    (function talk_onClick(){
        talkButton.addEventListener('click', function() {
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
            utterance.addEventListener('end', function() {
                faceHtml.src = 'assets/images/smiling.png';
            });
        });
    })();
}