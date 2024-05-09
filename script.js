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
