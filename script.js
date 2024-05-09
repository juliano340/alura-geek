async function obterPosts() {
    const apiUrl = 'http://localhost:3000/produtos';

    try {
        // Faz a requisição com `fetch`
        const response = await fetch(apiUrl);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Obtenha o contêiner que irá conter todos os produtos
        let container = document.getElementsByClassName('product-container')[0];

        // Adiciona cada produto ao contêiner
        data.forEach((product) => {
            container.innerHTML += `
                <div class="card" id="product-${product.id}">
                    <img src="${product.imagem}" alt="">
                    <div class="card-container">
                        <h1>${product.nome}</h1>
                        <div class="card-container-price">
                            <p>R$ ${product.preco}</p>
                            <i class="fa-solid fa-trash-can delete-icon" data-id="${product.id}"></i>
                        </div>
                    </div>
                </div>
            `;
        });

        // Adiciona os eventos de clique nos ícones de lixeira
        const deleteIcons = document.querySelectorAll('.delete-icon');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', async function() {
                // Obtém o ID do produto associado ao ícone
                const productId = this.getAttribute('data-id');

                // Envia uma requisição DELETE para a API
                const deleteUrl = `${apiUrl}/${productId}`;
                try {
                    const deleteResponse = await fetch(deleteUrl, {
                        method: 'DELETE'
                    });

                    // Verifica se a requisição DELETE foi bem-sucedida
                    if (deleteResponse.ok) {
                        // Remove o card da interface após sucesso
                        const cardElement = document.getElementById(`product-${productId}`);
                        if (cardElement) {
                            cardElement.remove();
                        }
                    } else {
                        console.error(`Erro ao excluir o produto: ${deleteResponse.status}`);
                    }
                } catch (error) {
                    console.error('Erro ao enviar requisição de exclusão:', error);
                }
            });
        });

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

// Chama a função para executar a requisição
obterPosts();


// URL da API onde os produtos serão enviados
const apiUrl = 'http://localhost:3000/produtos';

// Função para obter os dados do formulário e enviar para a API
function cadastrarProduto() {
    // Obtenha os elementos de entrada do formulário
    const nomeInput = document.querySelector('form input[placeholder="Nome"]');
    const valorInput = document.querySelector('form input[placeholder="Valor"]');
    const imagemInput = document.querySelector('form input[placeholder="Imagem"]');

    // Cria um objeto com os valores obtidos do formulário
    const produto = {
        nome: nomeInput.value,
        preco: valorInput.value,
        imagem: imagemInput.value
    };

    // Envia os dados para a API usando fetch
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Confirmação ou manipulação adicional após a criação do produto
        alert('Produto cadastrado com sucesso!');
        adicionarProdutoAoContainer(data); // Adiciona o novo produto à lista
        limparFormulario();
    })
    .catch(error => {
        console.error('Erro ao cadastrar o produto:', error);
    });
}

// Função para adicionar o novo produto ao contêiner de produtos
function adicionarProdutoAoContainer(produto) {
    const container = document.querySelector('.product-container');
    const novoProduto = `
        <div class="card" id="product-${produto.id}">
            <img src="${produto.imagem}" alt="">
            <div class="card-container">
                <h1>${produto.nome}</h1>
                <div class="card-container-price">
                    <p>R$ ${produto.preco}</p>
                    <i class="fa-solid fa-trash-can delete-icon" data-id="${produto.id}"></i>
                </div>
            </div>
        </div>
    `;
    container.innerHTML += novoProduto;
}

// Função para limpar o formulário
function limparFormulario() {
    const inputs = document.querySelectorAll('form input[type="text"]');
    inputs.forEach(input => input.value = '');
}

// Adiciona eventos aos botões do formulário
document.querySelector('form input[value="Cadastrar"]').addEventListener('click', cadastrarProduto);
document.querySelector('form input[value="Limpar"]').addEventListener('click', limparFormulario);
