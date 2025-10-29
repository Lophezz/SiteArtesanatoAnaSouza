/* ===================================================
   ARQUIVO: assets/js/main.js
   COM LÓGICA DE URL MAIS ROBUSTA
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    carregarPostsDoBlog();
    configurarNavegacaoAtiva();
});

/**
 * Função de ajuda para validar e corrigir URLs
 */
function getValidImageUrl(url, isBlog = false) {
    const placeholder = isBlog ?
        'https://via.placeholder.com/300x150?text=Blog' :
        'https://via.placeholder.com/300x200?text=Sem+Foto';

    if (!url) {
        return placeholder;
    }

    // Pega a primeira URL se for uma lista separada por vírgula
    const firstUrl = url.split(',')[0].trim();

    if (firstUrl.startsWith('https://')) {
        return firstUrl; // Já está perfeita
    }

    if (firstUrl.startsWith('http://')) {
        return firstUrl.replace('http://', 'https://'); // Corrige para HTTPS
    }

    // Se for "A", "foto1.png", ou qualquer outra coisa, usa o placeholder
    return placeholder;
}

/**
 * Busca os produtos na API e os exibe na tela.
 */
/**
 * Busca os produtos na API e os exibe na tela.
 */
async function carregarProdutos() {
    const productsGrid = document.getElementById('products-grid-container');
    if (!productsGrid) return;
    productsGrid.innerHTML = '<p class="loading-message">Carregando produtos...</p>';

    // (A sua função 'getValidImageUrl' deve estar aqui em cima)

    const produtos = await buscarTodosProdutos();

    if (produtos && produtos.length > 0) {
        productsGrid.innerHTML = '';
        produtos.forEach(produto => {

            const imageUrl = getValidImageUrl(produto.urlsFotos, false);

            // ===========================================
            // A CORREÇÃO ESTÁ AQUI
            // ===========================================

            // MUDANÇA 1: Criar 'a' (link) em vez de 'div'
            const card = document.createElement('a');
            card.className = 'product-card';

            // MUDANÇA 2: Adicionar o link para a página de pedido
            card.href = `pedido.html?id=${produto.id}`;

            // ===========================================

            card.innerHTML = `
                <img src="${imageUrl}" alt="${produto.nomeProduto}">
                <h3>${produto.nomeProduto}</h3>
                <p class="price">R$ ${Number(produto.preco).toFixed(2)}</p>
            `;
            productsGrid.appendChild(card);
        });
    } else {
        productsGrid.innerHTML = '<p class="loading-message">Nenhum produto encontrado.</p>';
    }
}

/**
 * Busca os posts do blog na API e os exibe na tela.
 */
async function carregarPostsDoBlog() {
    const blogGrid = document.getElementById('blog-grid-container');
    if (!blogGrid) return;
    blogGrid.innerHTML = '<p class="loading-message">Carregando posts...</p>';

    const posts = await buscarTodosPosts();

    if (posts && posts.length > 0) {
        blogGrid.innerHTML = '';
        posts.slice(0, 4).forEach(post => {
            const snippet = post.conteudo ? post.conteudo.substring(0, 100) + '...' : 'Leia mais...';

            // --- LÓGICA DE VALIDAÇÃO ATUALIZADA ---
            const imageUrl = getValidImageUrl(post.urlFotoPost, true);

            const card = document.createElement('a');
            card.className = 'blog-card';
            card.href = `tabela-blogs.html?id=${post.id}`;
            card.innerHTML = `
                <img src="${imageUrl}" alt="${post.titulo}" class="blog-card-image">
                <div class="blog-card-content">
                    <h3>${post.titulo}</h3>
                    <p>${snippet}</p>
                    <span class="read-more">Leia mais...</span>
                </div>
            `;
            blogGrid.appendChild(card);
        });
    } else {
        blogGrid.innerHTML = '<p class="loading-message">Nenhum post encontrado.</p>';
    }
}

/**
 * Configura a navegação ativa (scrollspy)
 */
function configurarNavegacaoAtiva() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('section, main');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('href') === `#${currentSectionId}`) {
                button.classList.add('active');
            }
        });
    });
}

/* ========================================
   CÓDIGO DO CARROSSEL
   ======================================== */

// Variáveis globais para o carrossel
let slideIndex = 0;
let slideTimer;

// Função principal para mostrar os slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    // Se n for maior que o número de slides, volta ao primeiro
    if (n >= slides.length) {
        slideIndex = 0;
    }

    // Se n for menor que o primeiro, vai para o último
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Esconde todos os slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove "active" de todos os pontos
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Se houver slides, mostra o slide atual e ativa o ponto
    if (slides.length > 0) {
        slides[slideIndex].style.display = "block";
        dots[slideIndex].className += " active";
    }
}

// Funções para os botões "prev/next"
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetSlideTimer(); // Reinicia o timer se o usuário clicar
}

// Função para os pontos
function currentSlide(n) {
    showSlides(slideIndex = n - 1); // n-1 porque o índice começa em 0
    resetSlideTimer();
}

// Função para avançar o slide automaticamente
function autoShowSlides() {
    slideIndex++;
    showSlides(slideIndex);
    slideTimer = setTimeout(autoShowSlides, 5000); // Muda a cada 5 segundos
}

// Reinicia o timer automático
function resetSlideTimer() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(autoShowSlides, 5000);
}

// Inicia o carrossel quando a página carregar
// Adiciona a chamada ao carrossel dentro do DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // (Suas funções existentes)
    // carregarProdutos();
    // carregarPostsDoBlog();
    // configurarNavegacaoAtiva();

    // Inicia o carrossel
    if (document.getElementsByClassName("carousel-slide").length > 0) {
        showSlides(slideIndex); // Mostra o primeiro slide
        slideTimer = setTimeout(autoShowSlides, 5000); // Inicia o timer
    }
});

/* ========================================
   CÓDIGO DA ANIMAÇÃO DE ROLAGEM (Fade-in)
   ======================================== */

/**
 * Configura o IntersectionObserver para animar elementos ao rolar.
 */
function configurarAnimacaoRolagem() {

    // MODIFIQUE ESTA LINHA:
    const secoesAnimadas = document.querySelectorAll(
        '.gallery-cta-section, .blog-section, .products-section, .about-section, .testimonial-card'
    );
    // (O resto da função continua exatamente igual)

    if (secoesAnimadas.length === 0) return;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    secoesAnimadas.forEach(secao => {
        observer.observe(secao);
    });
}

// Adiciona a nova função ao evento de "Página Carregada"
document.addEventListener('DOMContentLoaded', () => {
    // (Suas funções existentes)
    // carregarProdutos();
    // carregarPostsDoBlog();
    // configurarNavegacaoAtiva();
    // ...
    // (Código do carrossel)
    // ...

    // CHAMA A NOVA FUNÇÃO DE ANIMAÇÃO
    configurarAnimacaoRolagem();
});