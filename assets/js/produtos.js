/* ===================================================
   ARQUIVO: assets/js/produtos.js
   Controla a página de listagem de TODOS os produtos
   =================================================== */

// --- Variáveis Globais ---
let allProducts = []; // Guarda todos os produtos da API
const allColors = new Set();
const allMaterials = new Set();

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega os produtos
    loadAllProducts();

    // 2. Configura os filtros
    document.getElementById('search-bar').addEventListener('input', handleFilterChange);
    document.getElementById('color-filter').addEventListener('change', handleFilterChange);
    document.getElementById('material-filter').addEventListener('change', handleFilterChange);
    document.getElementById('sort-filter').addEventListener('change', handleFilterChange);
});

/**
 * Função de ajuda para validar e corrigir URLs de imagem.
 */
function getValidImageUrl(url, isBlog = false) {
    const placeholder = isBlog ? 
        'https://via.placeholder.com/300x150?text=Blog' : 
        'https://via.placeholder.com/300x200?text=Sem+Foto';
    if (!url) return placeholder;
    const firstUrl = url.split(',')[0].trim();
    if (firstUrl.startsWith('https://')) return firstUrl;
    if (firstUrl.startsWith('http://')) return firstUrl.replace('http://', 'https://');
    return placeholder;
}

/**
 * 1. Busca todos os produtos da API
 */
async function loadAllProducts() {
    const productsGrid = document.getElementById('all-products-grid');
    productsGrid.innerHTML = '<p class="loading-message">Carregando produtos...</p>';
    
    const products = await buscarTodosProdutos(); // Do api.js
    
    if (products) {
        allProducts = products;
        populateFilters(allProducts); // 3. Popula os <select>
        renderProducts(allProducts); // 4. Mostra os produtos na tela
    } else {
        productsGrid.innerHTML = '<p class="no-products-message">Erro ao carregar produtos.</p>';
    }
}

/**
 * 2. Popula os filtros de Cor e Material
 */
function populateFilters(products) {
    const colorSelect = document.getElementById('color-filter');
    const materialSelect = document.getElementById('material-filter');

    products.forEach(product => {
        if (product.opcoesCores) {
            product.opcoesCores.split(',').forEach(color => allColors.add(color.trim()));
        }
        if (product.opcoesMateriais) {
            product.opcoesMateriais.split(',').forEach(mat => allMaterials.add(mat.trim()));
        }
    });

    allColors.forEach(color => {
        const option = new Option(color.charAt(0).toUpperCase() + color.slice(1), color);
        colorSelect.add(option);
    });
    allMaterials.forEach(material => {
        const option = new Option(material.charAt(0).toUpperCase() + material.slice(1), material);
        materialSelect.add(option);
    });
}

/**
 * 3. Renderiza os produtos na tela (A PARTE MAIS IMPORTANTE)
 */
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('all-products-grid');
    productsGrid.innerHTML = ''; // Limpa a grid

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p class="no-products-message">Nenhum produto encontrado com esses filtros.</p>';
        return;
    }

    productsToRender.forEach(produto => {
        const imageUrl = getValidImageUrl(produto.urlsFotos, false);

        // ======================================================
        // AQUI ESTÁ A RESPOSTA PARA O SEU PEDIDO:
        // O card é criado como uma tag <a> (link)
        // ======================================================
        const card = document.createElement('a');
        card.className = 'product-card'; // Reutiliza o estilo do index.css
        
        // O link aponta para a página de pedido com o ID do produto
        card.href = `pedido.html?id=${produto.id}`;
        
        // O HTML interno do card
        card.innerHTML = `
            <img src="${imageUrl}" alt="${produto.nomeProduto}">
            <h3>${produto.nomeProduto}</h3>
            <p class="price">R$ ${Number(produto.preco).toFixed(2)}</p>
        `;
        productsGrid.appendChild(card);
    });
}

/**
 * 4. Função principal que filtra e re-renderiza os produtos
 */
function handleFilterChange() {
    // Pega os valores atuais de todos os filtros
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const color = document.getElementById('color-filter').value;
    const material = document.getElementById('material-filter').value;
    const sort = document.getElementById('sort-filter').value;

    // Começa com a lista completa
    let filteredProducts = [...allProducts];

    // 1. Filtra por Texto (Busca)
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.nomeProduto.toLowerCase().includes(searchTerm) ||
            p.descricao.toLowerCase().includes(searchTerm)
        );
    }

    // 2. Filtra por Cor
    if (color !== 'all') {
        filteredProducts = filteredProducts.filter(p => 
            p.opcoesCores.split(',').map(c => c.trim()).includes(color)
        );
    }

    // 3. Filtra por Material
    if (material !== 'all') {
        filteredProducts = filteredProducts.filter(p => 
            p.opcoesMateriais.split(',').map(m => m.trim()).includes(material)
        );
    }

    // 4. Ordena (Sort)
    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.preco - b.preco); // Menor para Maior
    } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.preco - a.preco); // Maior para Menor
    }
    
    // 5. Re-renderiza a lista na tela
    renderProducts(filteredProducts);
}