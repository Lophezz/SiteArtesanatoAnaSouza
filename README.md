# 🎨 Artelier Ana Souza

Um site de e-commerce e portfólio para um ateliê de artesanato, com foco em acessibilidade. Este projeto é um **frontend dinâmico** que consome uma API REST externa para buscar produtos, posts de blog e gerenciar dados.

O backend (API) deste projeto está hospedado separadamente na plataforma [Render](https://render.com/).

---

**Status do Projeto:** 🚀 Concluído 🚀
---

## 💻 Sobre o Projeto

O "Artelier Ana Souza" é uma aplicação web multi-página que simula a presença online de um ateliê. A principal característica do projeto é sua arquitetura desacoplada:

1.  O **Frontend** (este repositório) é responsável por toda a interface do usuário e experiência de navegação.
2.  O **Backend** (hospedado no Render) é uma API REST que armazena e serve todos os dados, como produtos, usuários e posts.

O frontend utiliza a biblioteca `axios` para fazer requisições HTTP à API, tornando todo o conteúdo do site dinâmico.

### 🖼️ Telas do Site

### 🖼️ Telas do Site

<details>
  <summary>Clique para expandir e ver as telas do site</summary>
  
  **Tela Principal (Home)**
  <br>
  <img width="650" alt="Tela principal do site" src="https://github.com/user-attachments/assets/39d8c78b-5b69-429c-8a66-c900bb89cd18" />
  <br><br>
  
  **Página de Produtos (com filtros)**
  <br>
  <img width="650" alt="Tela da página de produtos" src="https://github.com/user-attachments/assets/bccedd6d-a64f-4d12-bcd3-7bbc18011a63" />
  <br><br>
  
  **Página de Detalhe do Produto (Pedido)**
  <br>
  <img width="650" alt="Tela de detalhe de um produto" src="https://github.com/user-attachments/assets/e0eadf38-6b41-4d80-8c68-2d7fc1856b99" />

</details>

## ✨ Funcionalidades Principais

* **Consumo de API com Axios:** Todo o conteúdo (produtos, posts) é carregado dinamicamente. O site não possui dados "hard-coded", tornando-o escalável.
* **Recursos de Acessibilidade:** O projeto foi desenvolvido com funcionalidades que visam melhorar a experiência de usuários com diferentes necessidades.
* **Catálogo de Produtos Dinâmico:** A página de produtos busca os itens diretamente do banco de dados através da API.
* **Blog Dinâmico:** Os artigos e posts são carregados a partir do backend.
* **Site Multi-Página:** Estrutura clara com seções de Home, Produtos, Blogs e Contato.
* **Design Responsivo:** O layout se adapta para uma visualização otimizada em desktops e dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

Este projeto combina tecnologias clássicas de frontend com ferramentas modernas de comunicação de API:

* **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML):** Estrutura e semântica de todas as páginas.
* **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS):** Estilização completa.
* **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):** Manipulação do DOM, lógica da interface e interatividade.
* **[Axios](https://axios-http.com/):** Biblioteca *Promise-based* utilizada para fazer todas as requisições HTTP (GET, POST, etc.) para a API.
* **[Render](https://render.com/):** Plataforma de cloud onde a API backend está hospedada.

## 🚀 Como Executar o Projeto

**⚠️ Importante:** Como este projeto consome uma API externa (`axios`), você **não pode** simplesmente abrir o arquivo `index.html` pelo navegador (isso causará erros de CORS).

Ele precisa ser executado a partir de um servidor local.

### Forma Simples (VSCode)

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/Lophezz/SiteArtesanatoAnaSouza.git](https://github.com/Lophezz/SiteArtesanatoAnaSouza.git)
    ```
2.  Abra o projeto no **Visual Studio Code**.
3.  Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
4.  Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
5.  Isso iniciará um servidor local e abrirá o site no seu navegador, permitindo que as chamadas à API funcionem.

## 👥 Autores

Este projeto foi desenvolvido em dupla por:

| [<img src="https://avatars.githubusercontent.com/u/188473592?v=4" width="100px;" alt="Foto do Luan"/>](https://github.com/Luan-tcpn) | [<img src="https://avatars.githubusercontent.com/u/107969085?v=4" width="100px;" alt="Foto do Matheus Lopes"/>](https://github.com/Lophezz) |
| :---: | :---: |
| [**Luan**](https://github.com/Luan-tcpn) | [**Matheus Lopes**](https://github.com/Lophezz) |

---
