/* ===================================================
   ARQUIVO: assets/js/music-player.js
   Controla o botão de música do site
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('site-music');
    const button = document.getElementById('music-toggle-btn');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    if (!audio || !button) return; // Se não encontrar os elementos, para.

    // Tenta dar play automaticamente (pode ser bloqueado pelo navegador)
    // audio.play().catch(e => console.log("Autoplay bloqueado pelo navegador."));
    // (Descomente a linha acima se quiser tentar o autoplay)

    // Lógica para salvar o estado (se estava tocando ou não)
    // Isso faz a música "continuar" na próxima página
    let isPlaying = sessionStorage.getItem('musicState') === 'playing';

    // Se estava tocando antes, tenta tocar agora
    if (isPlaying) {
        audio.play().then(() => {
            // Sucesso
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            button.setAttribute('aria-label', 'Pausar música');
        }).catch(e => {
            // Falha (navegador bloqueou autoplay)
            sessionStorage.setItem('musicState', 'paused');
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            button.setAttribute('aria-label', 'Tocar música');
        });
    }

    // O que acontece ao clicar no botão
    button.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            button.setAttribute('aria-label', 'Pausar música');
            sessionStorage.setItem('musicState', 'playing'); // Salva o estado
        } else {
            audio.pause();
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            button.setAttribute('aria-label', 'Tocar música');
            sessionStorage.setItem('musicState', 'paused'); // Salva o estado
        }
    });
});