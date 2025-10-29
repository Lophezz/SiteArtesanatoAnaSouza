/* ===================================================
   ARQUIVO: assets/js/blogs.js
   Controla a página de listagem de todos os blogs
   (com lógica de URL mais robusta).
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    carregarTodosOsPosts();
});

/**
 * Função de ajuda para validar e corrigir URLs de imagem.
 * (Esta é a mesma função que está em main.js para consistência)
 */
function getValidImageUrl(url, isBlog = false) {
    // Define o placeholder correto (blog ou produto)
    const placeholder = isBlog ? 
        'https://via.placeholder.com/300x150?text=Blog' : 
        'https://via.placeholder.com/300x200?text=Sem+Foto';

    // 1. Se a URL for nula ou vazia, usa o placeholder
    if (!url) {
        return placeholder;
    }

    // 2. Pega a primeira URL se for uma lista (ex: "url1, url2")
    const firstUrl = url.split(',')[0].trim();

    // 3. Se começar com 'https://', está perfeita
    if (firstUrl.startsWith('https://')) {
        return firstUrl;
    }
    
    // 4. Se começar com 'http://', corrige para 'https://'
    if (firstUrl.startsWith('http://')) {
        return firstUrl.replace('http://', 'https://');
    }

    // 5. Se for qualquer outra coisa (ex: "A", "foto1.png"), usa o placeholder
    return placeholder;
}

/**
 * Busca todos os posts da API e os exibe na tela.
 */
async function carregarTodosOsPosts() {
    // 1. Seleciona o container da grid
    const blogGrid = document.getElementById('all-blogs-grid-container');
    if (!blogGrid) return;

    // 2. Exibe mensagem de "carregando"
    blogGrid.innerHTML = '<p class="loading-message" style="color: #333;">Carregando todos os posts...</p>';

    // 3. Busca os dados na API (usando a função do api.js)
    const posts = await buscarTodosPosts();

    // 4. Verifica se a API retornou os posts
    if (posts && posts.length > 0) {
        blogGrid.innerHTML = ''; // Limpa o "carregando"

        // 5. Cria um card HTML para cada post
        posts.forEach(post => {
            // Cria um resumo do conteúdo
            const snippet = post.conteudo ? post.conteudo.substring(0, 100) + '...' : 'Leia mais...';

            // --- USA A FUNÇÃO DE VALIDAÇÃO DE URL ---
            const imageUrl = getValidImageUrl(post.urlFotoPost, true);

            // O card principal é um link (tag <a>)
            const card = document.createElement('a');
            card.className = 'blog-card'; // Reutiliza o estilo de card
            card.href = `tabela-blogs.html?id=${post.id}`; // Link dinâmico

            // Monta o HTML interno do card
            card.innerHTML = `
                <img src="${imageUrl}" alt="${post.titulo}" class="blog-card-image">
                <div class="blog-card-content">
                    <h3>${post.titulo}</h3>
                    <p>${snippet}</p>
                    <span class="read-more">Ler post completo...</span>
                </div>
            `;
            
            // 6. Adiciona o card na grid
            blogGrid.appendChild(card);
        });
    } else {
        // Exibe mensagem de erro
        blogGrid.innerHTML = '<p class="loading-message" style="color: #333;">Nenhum post encontrado.</p>';
    }
}