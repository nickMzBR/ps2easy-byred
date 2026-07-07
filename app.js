const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const emulatorContainer = document.getElementById('emulator-container');
const canvas = document.getElementById('canvas');

// Eventos de arrastar e soltar
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleGameFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleGameFile(e.target.files[0]);
    }
});

function handleGameFile(file) {
    // Esconde a zona de upload e mostra o emulador
    dropZone.style.display = 'none';
    emulatorContainer.style.display = 'block';
    
    console.log("Arquivo carregado:", file.name);

    // Verifica se a biblioteca externa do emulador carregou corretamente
    if (typeof PlayWeb !== 'undefined') {
        // Inicializa o emulador apontando para o canvas do nosso HTML
        PlayWeb.initialize(canvas).then(() => {
            // Executa a ISO do usuário
            PlayWeb.runDiskImage(file);
        }).catch(err => {
            console.error("Erro ao iniciar o emulador:", err);
            alert("Não foi possível carregar o motor do emulador.");
        });
    } else {
        alert("O motor do emulador ainda está sendo baixado ou não está disponível.");
    }
}
