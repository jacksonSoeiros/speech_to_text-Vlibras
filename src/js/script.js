// Variável global para controle do reconhecimento de fala
let recognition;
let isRecording = false;

// Função para iniciar o reconhecimento de fala
function startSpeechRecognition() {
  if (!window.SpeechRecognition) {
    alert('Seu navegador não suporta reconhecimento de fala.');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.onstart = () => {
    isRecording = true;
    playBtn.classList.remove('fa-microphone-alt');
    playBtn.classList.add('fa-microphone');
  };
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    document.getElementById('transcript-box').value += transcript;
  };
  recognition.onerror = (error) => {
    console.error('Error:', error);
    alert('Erro no reconhecimento de fala: ' + error.message);
  };
  recognition.onend = () => {
    isRecording = false;
    playBtn.classList.remove('fa-microphone');
    playBtn.classList.add('fa-microphone-alt');
  };

  recognition.start();
}

// Função para pausar o reconhecimento de fala
function pauseSpeechRecognition() {
  if (!recognition) return;

  if (isRecording) {
    recognition.pause();
  } else {
    recognition.resume();
  }

  isRecording = !isRecording;
  playBtn.classList.toggle('fa-pause', isRecording);
  playBtn.classList.toggle('fa-microphone', !isRecording);
}

// Event listener para iniciar o reconhecimento de fala quando o botão 'play-btn' é clicado
document.getElementById('play-btn').addEventListener('click', startSpeechRecognition);

// Event listener para pausar o reconhecimento de fala quando o botão 'play-btn' é clicado novamente
document.getElementById('play-btn').addEventListener('click', pauseSpeechRecognition);
