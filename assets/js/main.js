/* ===================================================
   ARQUIVO: assets/js/main.js
   COM LÓGICA DE URL MAIS ROBUSTA
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
  carregarPostsDoBlog();
  configurarNavegacaoAtiva();
});

/**
 * Função de ajuda para validar e corrigir URLs
 */
function getValidImageUrl(url, isBlog = false) {
  const placeholder = isBlog
    ? "https://via.placeholder.com/300x150?text=Blog"
    : "https://via.placeholder.com/300x200?text=Sem+Foto";

  if (!url) {
    return placeholder;
  }

  // Pega a primeira URL se for uma lista separada por vírgula
  const firstUrl = url.split(",")[0].trim();

  if (firstUrl.startsWith("https://")) {
    return firstUrl; // Já está perfeita
  }

  if (firstUrl.startsWith("http://")) {
    return firstUrl.replace("http://", "https://"); // Corrige para HTTPS
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
  const productsGrid = document.getElementById("products-grid-container");
  if (!productsGrid) return;
  productsGrid.innerHTML =
    '<p class="loading-message">Carregando produtos...</p>';

  // (A sua função 'getValidImageUrl' deve estar aqui em cima)

  const produtos = await buscarTodosProdutos();

  if (produtos && produtos.length > 0) {
    productsGrid.innerHTML = "";
    produtos.forEach((produto) => {
      const imageUrl = getValidImageUrl(produto.urlsFotos, false);

      // ===========================================
      // A CORREÇÃO ESTÁ AQUI
      // ===========================================

      // MUDANÇA 1: Criar 'a' (link) em vez de 'div'
      const card = document.createElement("a");
      card.className = "product-card";

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
    productsGrid.innerHTML =
      '<p class="loading-message">Nenhum produto encontrado.</p>';
  }
}

/**
 * Busca os posts do blog na API e os exibe na tela.
 */
async function carregarPostsDoBlog() {
  const blogGrid = document.getElementById("blog-grid-container");
  if (!blogGrid) return;
  blogGrid.innerHTML = '<p class="loading-message">Carregando posts...</p>';

  const posts = await buscarTodosPosts();

  if (posts && posts.length > 0) {
    blogGrid.innerHTML = "";
    posts.slice(0, 4).forEach((post) => {
      const snippet = post.conteudo
        ? post.conteudo.substring(0, 100) + "..."
        : "Leia mais...";

      // --- LÓGICA DE VALIDAÇÃO ATUALIZADA ---
      const imageUrl = getValidImageUrl(post.urlFotoPost, true);

      const card = document.createElement("a");
      card.className = "blog-card";
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
    blogGrid.innerHTML =
      '<p class="loading-message">Nenhum post encontrado.</p>';
  }
}

/**
 * Configura a navegação ativa (scrollspy)
 */
function configurarNavegacaoAtiva() {
  const navButtons = document.querySelectorAll(".nav-button");
  const sections = document.querySelectorAll("section, main");
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute("id");
      }
    });
    navButtons.forEach((button) => {
      button.classList.remove("active");
      if (button.getAttribute("href") === `#${currentSectionId}`) {
        button.classList.add("active");
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
  showSlides((slideIndex += n));
  resetSlideTimer(); // Reinicia o timer se o usuário clicar
}

// Função para os pontos
function currentSlide(n) {
  showSlides((slideIndex = n - 1)); // n-1 porque o índice começa em 0
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
document.addEventListener("DOMContentLoaded", () => {
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
    ".gallery-cta-section, .blog-section, .products-section, .about-section, .testimonial-card"
  );
  // (O resto da função continua exatamente igual)

  if (secoesAnimadas.length === 0) return;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  secoesAnimadas.forEach((secao) => {
    observer.observe(secao);
  });
}

// Adiciona a nova função ao evento de "Página Carregada"
document.addEventListener("DOMContentLoaded", () => {
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

/* ========================================
   CÓDIGO DO MENU DE ACESSIBILIDADE
   ======================================== */

// Função de ajuda para salvar as preferências
function saveAccessSettings(settings) {
  localStorage.setItem("accessSettings", JSON.stringify(settings));
}

// Função de ajuda para carregar as preferências
function loadAccessSettings() {
  const settings = localStorage.getItem("accessSettings");
  return settings
    ? JSON.parse(settings)
    : {
        fontSize: 100,
        contrast: false,
        grayscale: false,
      };
}

// Configura o menu quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  // (Suas funções existentes)
  // carregarProdutos();
  // carregarPostsDoBlog();
  // configurarNavegacaoAtiva();
  // ...
  // (Código do carrossel)
  // ...
  // configurarAnimacaoRolagem();

  // Inicia o menu de acessibilidade
  setupAccessibility();
});

// Função principal que configura todos os botões
function setupAccessibility() {
  const settings = loadAccessSettings();
  const htmlEl = document.documentElement; // O <html>
  const bodyEl = document.body;

  // Seleciona todos os botões e elementos do menu
  const toggleButton = document.getElementById("accessibility-toggle-btn");
  const panel = document.getElementById("accessibility-panel");

  const fontDecrease = document.getElementById("font-decrease");
  const fontIncrease = document.getElementById("font-increase");
  const fontPercentage = document.getElementById("font-percentage");

  const contrastButton = document.getElementById("toggle-contrast");
  const grayscaleButton = document.getElementById("toggle-grayscale");
  const restoreButton = document.getElementById("restore-defaults");

  if (!toggleButton) return; // Se o menu não existir, para aqui

  // --- 1. Aplicar Configurações Salvas ao Carregar ---

  // Aplicar Fonte
  let currentFontSize = settings.fontSize;
  htmlEl.style.fontSize = currentFontSize + "%";
  fontPercentage.textContent = currentFontSize + "%";

  // Aplicar Contraste
  if (settings.contrast) {
    htmlEl.classList.add("high-contrast");
    contrastButton.textContent = "Ativado";
    contrastButton.setAttribute("data-active", "true");
  }

  // Aplicar Escala de Cinza
  if (settings.grayscale) {
    htmlEl.classList.add("grayscale");
    grayscaleButton.textContent = "Ativado";
    grayscaleButton.setAttribute("data-active", "true");
  }

  // --- 2. Lógica para Abrir/Fechar o Painel ---
  toggleButton.addEventListener("click", () => {
    panel.classList.toggle("show");
  });

  // Fecha o painel se clicar fora dele
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !toggleButton.contains(e.target)) {
      panel.classList.remove("show");
    }
  });

  // --- 3. Lógica dos Botões de Fonte ---
  fontIncrease.addEventListener("click", () => {
    if (currentFontSize < 150) {
      // Limite máximo
      currentFontSize += 10;
      htmlEl.style.fontSize = currentFontSize + "%";
      fontPercentage.textContent = currentFontSize + "%";
      settings.fontSize = currentFontSize;
      saveAccessSettings(settings);
    }
  });

  fontDecrease.addEventListener("click", () => {
    if (currentFontSize > 80) {
      // Limite mínimo
      currentFontSize -= 10;
      htmlEl.style.fontSize = currentFontSize + "%";
      fontPercentage.textContent = currentFontSize + "%";
      settings.fontSize = currentFontSize;
      saveAccessSettings(settings);
    }
  });

  // --- 4. Lógica do Botão de Contraste ---
  contrastButton.addEventListener("click", () => {
    const isActive = htmlEl.classList.toggle("high-contrast");
    settings.contrast = isActive;
    saveAccessSettings(settings);
    contrastButton.textContent = isActive ? "Ativado" : "Desativado";
    contrastButton.setAttribute("data-active", isActive);
  });

  // --- 5. Lógica do Botão de Escala de Cinza ---
  grayscaleButton.addEventListener("click", () => {
    const isActive = htmlEl.classList.toggle("grayscale");
    settings.grayscale = isActive;
    saveAccessSettings(settings);
    grayscaleButton.textContent = isActive ? "Ativado" : "Desativado";
    grayscaleButton.setAttribute("data-active", isActive);
  });

  // --- 6. Lógica do Botão Restaurar ---
  restoreButton.addEventListener("click", () => {
    // Reseta JS
    currentFontSize = 100;
    htmlEl.style.fontSize = "100%";
    fontPercentage.textContent = "100%";

    // Reseta Classes
    htmlEl.classList.remove("high-contrast");
    htmlEl.classList.remove("grayscale");

    // Reseta Botões
    contrastButton.textContent = "Desativado";
    contrastButton.setAttribute("data-active", "false");
    grayscaleButton.textContent = "Desativado";
    grayscaleButton.setAttribute("data-active", "false");

    // Reseta Configurações Salvas
    saveAccessSettings({
      fontSize: 100,
      contrast: false,
      grayscale: false,
    });
  });
}
