// Configuração Supabase (Substitua com suas credenciais)
const SUPABASE_URL = 'https://cqzcragsxcidqicmzqty.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxemNyYWdzeGNpZHFpY216cXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDQxOTEsImV4cCI6MjA1NzkyMDE5MX0.ScOAXGWMDhjJeGrWh9Bknt_avlarxq84QhQKN3g2_6k';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Elementos DOM
const corpoTabela = document.getElementById('corpoTabela');
const campoBusca = document.getElementById('busca');

// Carrega e exibe dados
async function carregarDados(filtro = '') {
    try {
        let query = supabase
            .from('medicamentos')
            .select('*')
            .order('nome', { ascending: true });

        if (filtro) {
            query = query.or(`nome.ilike.%${filtro}%,farmacia.ilike.%${filtro}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        renderizarTabela(data);
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        corpoTabela.innerHTML = `<tr><td colspan="5">Erro ao carregar medicamentos</td></tr>`;
    }
}

// Renderiza a tabela
function renderizarTabela(dados) {
    corpoTabela.innerHTML = dados.length > 0 
        ? dados.map(med => `
            <tr>
                <td>${med.nome}</td>
                <td>${med.prescricao ? '✅ Sim' : '❌ Não'}</td>
                <td>${med.entrada - med.saida}</td>
                <td>R$ ${med.preco.toFixed(2).replace('.', ',')}</td>
                <td>${med.farmacia}</td>
            </tr>
        `).join('')
        : `<tr><td colspan="5">Nenhum medicamento encontrado</td></tr>`;
}

// Busca em tempo real
campoBusca.addEventListener('input', (e) => {
    carregarDados(e.target.value.trim().toLowerCase());
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});