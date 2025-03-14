let produtosFarmaceuticos = [
    { nome: "Paracetamol", prescricao_medica: "Não", qtde_entrada: 100, qtde_saida: 25, qtde_estoque: 75, preco: 5.00, localidade_farmacia: "Farmácia Central" },
    { nome: "Amoxicilina", prescricao_medica: "Sim", qtde_entrada: 50, qtde_saida: 10, qtde_estoque: 40, preco: 12.00, localidade_farmacia: "Farmácia Zona Norte" },
    { nome: "Cimegripe", prescricao_medica: "Não", qtde_entrada: 65, qtde_saida: 18, qtde_estoque: " ", preco: 46.90, localidade_farmacia: "Farmácia Santa Cecília/SP" },
    { nome: "Luftal", prescricao_medica: "Sim", qtde_entrada: 50, qtde_saida: 32, qtde_estoque: 40, preco: 26.00, localidade_farmacia: "Farmácia Zona Norte" },
    { nome: "Dipirona", prescricao_medica: "Sim", qtde_entrada: 48, qtde_saida: 13, qtde_estoque: " ", preco: 7.00, localidade_farmacia: "Farmácia São Paulo/SP" },
    { nome: "Ibuprofeno", prescricao_medica: "Não", qtde_entrada: 80, qtde_saida: 20, qtde_estoque: 60, preco: 8.00, localidade_farmacia: "Farmácia Centro-Oeste" }     
];

let editandoIndex = -1;

// Preencher a tabela com os dados iniciais
function preencherTabela() {
    const tbody = document.querySelector('#tabelaProdutos tbody');
    tbody.innerHTML = '';

    produtosFarmaceuticos.forEach((produto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.prescricao_medica}</td>
            <td>${produto.qtde_entrada}</td>
            <td>${produto.qtde_saida}</td>
            <td>${produto.qtde_estoque}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.localidade_farmacia}</td>
            <td>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="deletarProduto(${index})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para adicionar um produto
function adicionarProduto() {
    const nome = document.querySelector('#nome').value;
    const prescricao = document.querySelector('#prescricao').value;
    const entrada = parseInt(document.querySelector('#entrada').value);
    const saida = parseInt(document.querySelector('#saida').value);
    const estoque = entrada - saida;
    const preco = parseFloat(document.querySelector('#preco').value);
    const localidade = document.querySelector('#localidade').value;

    const novoProduto = {
        nome: nome,
        prescricao_medica: prescricao,
        qtde_entrada: entrada,
        qtde_saida: saida,
        qtde_estoque: estoque,
        preco: preco,
        localidade_farmacia: localidade
    };

    produtosFarmaceuticos.push(novoProduto);
    preencherTabela();
    resetarFormulario();
}

// Função para iniciar a edição de um produto
function editarProduto(index) {
    const produto = produtosFarmaceuticos[index];
    
    document.querySelector('#nome').value = produto.nome;
    document.querySelector('#prescricao').value = produto.prescricao_medica;
    document.querySelector('#entrada').value = produto.qtde_entrada;
    document.querySelector('#saida').value = produto.qtde_saida;
    document.querySelector('#estoque').value = produto.qtde_estoque;
    document.querySelector('#preco').value = produto.preco;
    document.querySelector('#localidade').value = produto.localidade_farmacia;

    editandoIndex = index;
    document.getElementById('btnAdicionar').style.display = 'none';
    document.getElementById('btnAtualizar').style.display = 'inline-block';
}

// Função para atualizar um produto
function atualizarProduto() {
    const nome = document.querySelector('#nome').value;
    const prescricao = document.querySelector('#prescricao').value;
    const entrada = parseInt(document.querySelector('#entrada').value);
    const saida = parseInt(document.querySelector('#saida').value);
    const estoque = entrada - saida;
    const preco = parseFloat(document.querySelector('#preco').value);
    const localidade = document.querySelector('#localidade').value;

    produtosFarmaceuticos[editandoIndex] = {
        nome: nome,
        prescricao_medica: prescricao,
        qtde_entrada: entrada,
        qtde_saida: saida,
        qtde_estoque: estoque,
        preco: preco,
        localidade_farmacia: localidade
    };

    preencherTabela();
    resetarFormulario();
}

// Função para deletar produto com caixa de alerta
function deletarProduto(index) {
    if (confirm("Tem certeza de que deseja excluir este produto?")) {
        produtosFarmaceuticos.splice(index, 1);
        preencherTabela();
    }
}

// Função para resetar o formulário e restaurar o botão "Adicionar"
function resetarFormulario() {
    document.querySelector('#formularioProduto').reset();
    editandoIndex = -1;
    document.getElementById('btnAdicionar').style.display = 'inline-block';
    document.getElementById('btnAtualizar').style.display = 'none';
}

// Adicionar eventos aos botões
document.getElementById('btnAdicionar').addEventListener('click', adicionarProduto);
document.getElementById('btnAtualizar').addEventListener('click', atualizarProduto);

// Inicializar a tabela ao carregar a página
window.onload = preencherTabela;