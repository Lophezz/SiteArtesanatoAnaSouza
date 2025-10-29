/* ===================================================
   ARQUIVO: assets/js/api.js
   Este arquivo contém TODAS as funções para
   conversar com a API.
   =================================================== */

// 1. Define a URL base da API (do seu colega)
const urlBaseApi = 'https://artesa.onrender.com';

// 2. Cria uma instância do Axios com a URL base
// Daqui para frente, usaremos "api." em vez de "axios."
const api = axios.create({
  baseURL: urlBaseApi
});

/* ===================================================
   FUNÇÕES PARA "PRODUTOS"
   Baseado em:
   =================================================== */

/**
 * [GET] /produtos
 * Busca a lista de todos os produtos.
 * @returns {Promise<Array|null>} Uma lista de produtos ou nulo em caso de erro.
 */
async function buscarTodosProdutos() {
  try {
    const response = await api.get('/produtos');
    return response.data; // Retorna a lista de produtos
  } catch (error) {
    console.error('Erro ao buscar todos os produtos:', error);
    return null;
  }
}

/**
 * [GET] /produtos/{id}
 * Busca um produto específico pelo seu ID.
 * @param {string|number} id O ID do produto a ser buscado.
 * @returns {Promise<Object|null>} O objeto do produto ou nulo em caso de erro.
 */
async function buscarProdutoPorId(id) {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    return null;
  }
}

/**
 * [GET] /produtos/nome/{nome}
 * Busca produtos que contenham o nome pesquisado.
 * @param {string} nome O nome do produto a ser buscado.
 * @returns {Promise<Array|null>} Uma lista de produtos ou nulo em caso de erro.
 */
async function buscarProdutoPorNome(nome) {
  try {
    const response = await api.get(`/produtos/nome/${nome}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com nome ${nome}:`, error);
    return null;
  }
}

/**
 * [POST] /produtos
 * Cria um novo produto.
 * @param {Object} dadosProduto Objeto com os dados do produto (nome, preco, etc).
 * (Lembrete: não precisa enviar o ID, ele é automático).
 * @returns {Promise<Object|null>} O objeto do produto criado ou nulo em caso de erro.
 */
async function criarProduto(dadosProduto) {
  try {
    const response = await api.post('/produtos', dadosProduto);
    console.log('Produto criado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return null;
  }
}

/**
 * [PUT] /produtos
 * Atualiza um produto existente.
 * @param {Object} dadosProduto Objeto com os dados do produto (INCLUINDO o ID).
 * @returns {Promise<Object|null>} O objeto do produto atualizado ou nulo em caso de erro.
 */
async function atualizarProduto(dadosProduto) {
  try {
    const response = await api.put('/produtos', dadosProduto);
    console.log('Produto atualizado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return null;
  }
}

/**
 * [DELETE] /produtos/{id}
 * Deleta um produto pelo seu ID.
 * @param {string|number} id O ID do produto a ser deletado.
 * @returns {Promise<Object|null>} A resposta da API ou nulo em caso de erro.
 */
async function deletarProduto(id) {
  try {
    const response = await api.delete(`/produtos/${id}`);
    console.log('Produto deletado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar produto com ID ${id}:`, error);
    return null;
  }
}


/* ===================================================
   FUNÇÕES PARA "BLOG"
   Baseado em:
   =================================================== */

/**
 * [GET] /blog
 * Busca a lista de todos os posts do blog.
 * @returns {Promise<Array|null>} Uma lista de posts ou nulo em caso de erro.
 */
async function buscarTodosPosts() {
  try {
    const response = await api.get('/blog');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todos os posts:', error);
    return null;
  }
}

/**
 * [GET] /blog/{id}
 * Busca um post específico pelo seu ID.
 * @param {string|number} id O ID do post a ser buscado.
 * @returns {Promise<Object|null>} O objeto do post ou nulo em caso de erro.
 */
async function buscarPostPorId(id) {
  try {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar post com ID ${id}:`, error);
    return null;
  }
}

/**
 * [GET] /blog/titulo/{titulo}
 * Busca posts que contenham o título pesquisado.
 * @param {string} titulo O título do post a ser buscado.
 * @returns {Promise<Array|null>} Uma lista de posts ou nulo em caso de erro.
 */
async function buscarPostPorTitulo(titulo) {
  try {
    const response = await api.get(`/blog/titulo/${titulo}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar post com título ${titulo}:`, error);
    return null;
  }
}

/**
 * [POST] /blog
 * Cria um novo post.
 * @param {Object} dadosPost Objeto com os dados do post (titulo, conteudo, etc).
 * @returns {Promise<Object|null>} O objeto do post criado ou nulo em caso de erro.
 */
async function criarPost(dadosPost) {
  try {
    const response = await api.post('/blog', dadosPost);
    console.log('Post criado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return null;
  }
}

/**
 * [PUT] /blog
 * Atualiza um post existente.
 * @param {Object} dadosPost Objeto com os dados do post (INCLUINDO o ID).
 * @returns {Promise<Object|null>} O objeto do post atualizado ou nulo em caso de erro.
 */
async function atualizarPost(dadosPost) {
  try {
    const response = await api.put('/blog', dadosPost);
    console.log('Post atualizado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return null;
  }
}

/**
 * [DELETE] /blog/{id}
 * Deleta um post pelo seu ID.
 * @param {string|number} id O ID do post a ser deletado.
 * @returns {Promise<Object|null>} A resposta da API ou nulo em caso de erro.
 */
async function deletarPost(id) {
  try {
    const response = await api.delete(`/blog/${id}`);
    console.log('Post deletado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar post com ID ${id}:`, error);
    return null;
  }
}