const dropZone = document.getElementById('drop-zone');
const emulatorScreen = document.getElementById('emulator-screen');
const canvas = document.getElementById('canvas');
const statusText = document.getElementById('status-text');

// Drag and drop
dropZone.addEventListener('dragover', (e) => e.preventDefault());
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) handleGameFile(e.dataTransfer.files[0]);
});

document.getElementById('file-input').addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleGameFile(e.target.files[0]);
});

function handleGameFile(file) {
    dropZone.style.display = 'none';
    emulatorScreen.style.display = 'block';

    if (typeof PlayWeb !== 'undefined') {
        PlayWeb.initialize(canvas).then(() => {
            statusText.style.display = 'none'; // Some com o texto de carregando
            PlayWeb.runDiskImage(file);
        }).catch(err => {
            statusText.innerText = "Erro ao iniciar o motor gráfico.";
            console.error(err);
        });
    } else {
        statusText.innerText = "Erro: Biblioteca externa não encontrada.";
    }
}

// Configura os botões da tela para simular o teclado
document.querySelectorAll('.btn-game, .btn-sys').forEach(button => {
    const key = button.getAttribute('data-key');

    // Quando clica/toca no botão
    button.addEventListener('mousedown', () => triggerKey(key, 'keydown'));
    button.addEventListener('touchstart', (e) => { e.preventDefault(); triggerKey(key, 'keydown'); });

    // Quando solta o botão
    button.addEventListener('mouseup', () => triggerKey(key, 'keyup'));
    button.addEventListener('touchend', (e) => { e.preventDefault(); triggerKey(key, 'keyup'); });
});

function triggerKey(keyName, eventType) {
    const event = new KeyboardEvent(eventType, { key: keyName, bubbles: true });
    window.dispatchEvent(event);
}
