/* ===================================================
   ARQUIVO: assets/js/pedido.js
   Controla a página de detalhes do produto
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutoCompleto();
});

/**
 * Função de ajuda para validar e corrigir URLs de imagem.
 */
function getValidImageUrl(url, isBlog = false) {
    const placeholder = isBlog ?
        'https://via.placeholder.com/300x150?text=Blog' :
        'https://via.placeholder.com/500x500?text=Sem+Foto';
    if (!url) return placeholder;
    const firstUrl = url.split(',')[0].trim();
    if (firstUrl.startsWith('https://')) return firstUrl;
    if (firstUrl.startsWith('http://')) return firstUrl.replace('http://', 'https://');
    return placeholder;
}

/**
 * Pega o ID do produto da URL (ex: ?id=3)
 */
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Preenche os <select> com opções
 */
function popularOpcoes(selectId, opcoesString) {
    const selectElement = document.getElementById(selectId);
    if (!selectElement) return;

    selectElement.innerHTML = ''; // Limpa "Carregando..."
    const opcoes = opcoesString.split(',').map(item => item.trim());

    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao.charAt(0).toUpperCase() + opcao.slice(1); // Deixa a primeira letra maiúscula
        selectElement.appendChild(option);
    });
}

/**
 * Carrega o produto completo
 */
async function carregarProdutoCompleto() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        document.getElementById('product-title').textContent = 'Erro';
        document.getElementById('product-description').textContent = 'Produto não encontrado. ID inválido.';
        return;
    }

    // Busca o produto na API
    const produto = await buscarProdutoPorId(productId); // Função do api.js

    if (produto) {
        // Preenche os dados básicos
        document.title = produto.nomeProduto + " - Atelier Ana Souza";
        document.getElementById('product-title').textContent = produto.nomeProduto;
        document.getElementById('product-price').textContent = `R$ ${Number(produto.preco).toFixed(2)}`;
        document.getElementById('product-stock').textContent = `${produto.estoque} em estoque`;
        document.getElementById('product-description').textContent = produto.descricao;

        // Preenche a imagem
        const imageUrl = getValidImageUrl(produto.urlsFotos, false);
        document.getElementById('product-image').src = imageUrl;
        document.getElementById('product-image').alt = produto.nomeProduto;

        // Preenche as opções de personalização
        popularOpcoes('select-color', produto.opcoesCores);
        popularOpcoes('select-material', produto.opcoesMateriais);

        // Configura o botão de Pedir
        configurarBotaoPedido(produto);

    } else {
        document.title = "Produto não encontrado - Atelier Ana Souza";
        document.getElementById('product-title').textContent = 'Produto não encontrado';
        document.getElementById('product-description').textContent = 'Não foi possível carregar os dados deste produto.';
    }
}

/**
 * Configura o botão de Pedir no WhatsApp
 */
function configurarBotaoPedido(produto) {
    const orderButton = document.getElementById('order-button');
    if (!orderButton) return;

    orderButton.addEventListener('click', () => {
        // Pega os valores selecionados
        const selectedColor = document.getElementById('select-color').value;
        const selectedMaterial = document.getElementById('select-material').value;

        // Número de telefone
        const phoneNumber = '5511966497848';

        // Monta o texto da mensagem
        let texto = `Olá! Tenho interesse no produto:\n\n`;
        texto += `*Produto:* ${produto.nomeProduto} (ID: ${produto.id})\n`;
        texto += `*Preço:* R$ ${Number(produto.preco).toFixed(2)}\n\n`;
        texto += `*Minha Personalização:*\n`;
        texto += `*Cor:* ${selectedColor}\n`;
        texto += `*Material:* ${selectedMaterial}\n\n`;
        texto += `Gostaria de confirmar o pedido.`;

        // Codifica o texto para a URL
        const encodedText = encodeURIComponent(texto);

        // Cria o link do WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        // Abre o link em uma nova aba
        window.open(whatsappUrl, '_blank');
    });
}