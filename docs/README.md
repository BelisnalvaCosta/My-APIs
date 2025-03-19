### **1. Estrutura do Projeto**
```
seu-repositorio/
├── index.html
├── style.css
└── script.js
```

---

### **2. HTML (`index.html`)**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farmácia Digital</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
</head>
<body>
    <div class="container">
        <h1>🔍 Busca de Medicamentos</h1>
        
        <input type="text" id="busca" placeholder="Pesquise por nome ou farmácia..." autofocus>
        
        <div class="tabela-container">
            <table id="tabelaMedicamentos">
                <thead>
                    <tr>
                        <th>Medicamento</th>
                        <th>Receita?</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th>Localização</th>
                    </tr>
                </thead>
                <tbody id="corpoTabela">
                    <tr><td colspan="5">Carregando...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

### **3. CSS (`style.css`)**
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
    background: #f8fafc;
    color: #1e293b;
    padding: 2rem;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    text-align: center;
    margin: 2rem 0;
    color: #3b82f6;
    font-size: 2.5rem;
}

#busca {
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1.1rem;
    transition: all 0.3s;
}

#busca:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.tabela-container {
    background: white;
    border-radius: 12px;
    overflow-x: auto;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 1rem;
    text-align: left;
    white-space: nowrap;
}

th {
    background: #3b82f6;
    color: white;
    font-weight: 600;
}

tr:nth-child(even) {
    background: #f8fafc;
}

tr:hover {
    background: #f1f5f9;
}

@media (max-width: 768px) {
    body {
        padding: 1rem;
    }
    
    th, td {
        padding: 0.75rem;
        font-size: 0.9rem;
    }
}
```

---

### **4. JavaScript (`script.js`)**
```javascript
// Configuração Supabase (Substitua com suas credenciais)
const SUPABASE_URL = 'SUA_URL_SUPABASE';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLICA';
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
```

---

### **5. Scripts SQL para o Supabase**

```sql
-- Criar a tabela de medicamentos
CREATE TABLE medicamentos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    prescricao TEXT NOT NULL,
    entrada INT NOT NULL,
    saida INT NOT NULL,
    estoque INT NULL,
    preco FLOAT NOT NULL,
    farmacia TEXT NOT NULL
);

-- Inserir os medicamentos
INSERT INTO medicamentos (nome, prescricao, entrada, saida, estoque, preco, farmacia) VALUES
('Paracetamol', 'Não', 100, 25, 75, 5.00, 'Farmácia Central'),
('Amoxicilina', 'Sim', 50, 10, 40, 12.00, 'Farmácia Zona Norte'),
('Cimegripe', 'Não', 65, 18, NULL, 46.90, 'Farmácia Santa Cecília/SP'),
('Luftal', 'Sim', 50, 32, 40, 26.00, 'Farmácia Zona Norte'),
('Dipirona', 'Sim', 48, 13, NULL, 7.00, 'Farmácia São Paulo/SP'),
('Ibuprofeno', 'Não', 80, 20, 60, 8.00, 'Farmácia Centro-Oeste');

```

---

### **Como Usar o SupaBase**
1. Crie uma conta no [Supabase](https://supabase.com/);
2. Crie um novo projeto e execute os scripts SQL acima;
3. Obtenha as credenciais na página principal do seu projeto;
4. Substitua `SUA_URL_SUPABASE` e `SUA_CHAVE_ANON_PUBLICA` no JavaScript.
