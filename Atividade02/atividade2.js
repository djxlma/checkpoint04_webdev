function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produtoEncontrado = false;
    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id === id) {
            carrinho[i].quantidade += quantidade;
            produtoEncontrado = true;
            break;
        }
    }
    if (!produtoEncontrado) {
        carrinho.push({ id, nome, valor, quantidade });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    let novoCarrinho = [];
    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id !== id) {
            novoCarrinho.push(carrinho[i]);
        }
    }
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    exibirCarrinho();
}

function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    let listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';
    let valorTotal = 0;

    if (carrinho && carrinho.length > 0) {
        for (let i = 0; i < carrinho.length; i++) {
            let produto = carrinho[i];
            let li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${(produto.valor * produto.quantidade).toFixed(2)}`;
            let botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.onclick = (function(id) {
                return function() {
                    removerProduto(id);
                };
            })(produto.id);
            li.appendChild(botaoRemover);
            listaProdutos.appendChild(li);
            valorTotal += produto.valor * produto.quantidade; // Acumula o valor total
        }
    } else {
        listaProdutos.textContent = 'O carrinho está vazio!';
    }

    document.getElementById('valor-total').textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`; // Atualiza o valor total
}

// Outra forma de adicionar ao carrinho!

const produtosDisponiveis = [
    { id: 1, nome: 'Camiseta', valor: 29.99 },
    { id: 2, nome: 'Calça Jeans', valor: 99.90 },
    { id: 3, nome: 'Tênis', valor: 149.90 }
];

function processarFormulario(event) {
    event.preventDefault();
    let id = parseInt(document.getElementById('produto-id').value);
    let nome = document.getElementById('produto-nome').value;
    let valor = parseFloat(document.getElementById('produto-valor').value);
    let quantidade = parseInt(document.getElementById('produto-quantidade').value);

    const produtoValido = produtosDisponiveis.find(p => p.id === id && p.nome === nome && p.valor === valor);

    if (produtoValido) {
        adicionarProduto(id, nome, valor, quantidade);
        document.getElementById('form-adicionar-produto').reset();
    } else {
        alert('Produto não encontrado! Verifique se o ID, Nome e Valor foram digitados corretamente.');
    }
}

document.getElementById('form-adicionar-produto').addEventListener('submit', processarFormulario);

exibirCarrinho();
