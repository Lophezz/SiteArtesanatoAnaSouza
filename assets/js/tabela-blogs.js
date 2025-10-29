/* ===================================================
   ARQUIVO: assets/js/tabela-blogs.js
   Controla a página de post único (com mais recursos).
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    carregarPostCompleto();
});

/**
 * Pega o ID do post da URL (ex: ?id=123)
 */
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Formata a data (ex: "28 de outubro de 2025")
 */
function formatarData(dataString) {
    if (!dataString) return '';
    try {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        console.error("Erro ao formatar data:", e);
        return '';
    }
}

/**
 * Carrega o post completo
 */
async function carregarPostCompleto() {
    const postId = getPostIdFromUrl();

    // Seleciona os elementos da página
    const postTitleEl = document.getElementById('post-title');
    const postContentEl = document.getElementById('post-content');
    const postMetaEl = document.getElementById('post-meta-container');
    const postImageEl = document.getElementById('post-image');
    
    if (!postId) {
        postTitleEl.textContent = 'Erro';
        postContentEl.innerHTML = '<p>Post não encontrado. ID inválido.</p>';
        return;
    }

    // Busca o post específico na API (função do api.js)
    const post = await buscarPostPorId(postId);

    if (post) {
        // Preenche os dados
        document.title = post.titulo + " - Atelier Ana Souza";
        postTitleEl.textContent = post.titulo;
        postContentEl.innerHTML = post.conteudo; 

        // Preenche os meta-dados
        const dataFormatada = formatarData(post.dataPublicacao);
        postMetaEl.innerHTML = `
            <span>Autor: <strong>${post.autor || 'Atelier Ana Souza'}</strong></span>
            <span>Publicado em: <strong>${dataFormatada}</strong></span>
        `;

        // Preenche a imagem (se existir)
        if (post.urlFotoPost) {
            let imageUrl = post.urlFotoPost.replace('http://', 'https://');
            postImageEl.src = imageUrl;
            postImageEl.alt = post.titulo; // Alt text é importante
            postImageEl.style.display = 'block'; // Mostra a imagem
        }

        // Configura o botão de compartilhar
        configurarBotaoShare(post);

    } else {
        document.title = "Post não encontrado - Atelier Ana Souza";
        postTitleEl.textContent = 'Post não encontrado';
        postContentEl.innerHTML = '<p>Não foi possível carregar o conteúdo deste post. Tente novamente.</p>';
    }
}

/**
 * Configura o botão de compartilhar
 */
function configurarBotaoShare(post) {
    const shareButton = document.getElementById('share-button');
    if (!shareButton) return;
    
    const shareData = {
        title: post.titulo,
        text: `Confira este post do Atelier Ana Souza: "${post.titulo}"`,
        url: window.location.href // Pega a URL atual
    };

    // Verifica se o navegador suporta a API de Share (nativo do celular/PC)
    if (navigator.share) {
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share(shareData);
                console.log('Post compartilhado com sucesso!');
            } catch (err) {
                console.error('Erro ao compartilhar:', err);
            }
        });
    } else {
        // Se não suportar, usa a função "Copiar Link" (fallback)
        shareButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            Copiar Link
        `;
        shareButton.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Feedback temporário no botão
                const originalText = shareButton.innerHTML;
                shareButton.innerHTML = 'Link Copiado!';
                setTimeout(() => {
                    shareButton.innerHTML = originalText;
                }, 2000); // Volta ao normal depois de 2 segundos
            }, (err) => {
                alert('Não foi possível copiar o link.');
                console.error('Erro ao copiar link:', err);
            });
        });
    }
}