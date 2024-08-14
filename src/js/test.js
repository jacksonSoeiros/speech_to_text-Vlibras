// Variável global para controle do reconhecimento de fala
let recognition;

// Função para iniciar o reconhecimento de fala
function startSpeechRecognition() {
    window.SpeechRecognition = window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("convert_text").innerHTML = transcript;
        console.log(transcript);
    });

    recognition.start();
    
}

//Função para chamar o VLibras

var vlibrasButton;
    async function startVlibras() {
    vlibrasButton = await document.querySelector('[vw-access-button]');
      console.log(vlibrasButton);
    //   if (vlibrasButton) {
    //     vlibrasButton.click();
    //   } else {
    //     setTimeout(startVlibras, 100); // Tenta novamente após 100ms
    //   }
      vlibrasButton.click();
    }

    window.onload = function () {
      startVlibras();
    }

// Função para pausar o reconhecimento de fala
function pauseSpeechRecognition() {
    if (recognition) {
        recognition.stop();
    }
}

// Função para alternar entre os ícones do microfone
function toggleMic() {
    var micIcon = document.getElementById('mic-on');
    if (micIcon) {
        var isMicOn = micIcon.innerText === 'mic';
        micIcon.innerText = isMicOn ? 'mic_off' : 'mic';
        micIcon.setAttribute('id', isMicOn ? 'mic-off' : 'mic-on');
    }

    if (micIcon.innerText === 'mic') {
        startSpeechRecognition();
    } else {
        pauseSpeechRecognition();
    }
}

// Event listener para iniciar o reconhecimento de fala quando o botão 'click_to_record' é clicado
document.getElementById('click_to_record').addEventListener('click', function() {
    startSpeechRecognition();
    startVlibras();
});

// Adiciona o evento de clique inicial no botão 'mic-on' para iniciar o ciclo de alternância do ícone
document.getElementById('mic-on').addEventListener('click', toggleMic);

// Verifica se o elemento 'mic-off' está presente e pausa o reconhecimento de fala
if (document.getElementById('mic-off')) {
    pauseSpeechRecognition();
}

// -----------------------------------------------------------------------------------------------------------------------------
