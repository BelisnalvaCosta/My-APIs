# Farmácia Digital - Busca de Medicamentos

Este projeto é uma aplicação web simples, porém robusta, que permite a busca e visualização de medicamentos em tempo real. Ele utiliza **GitHub Pages** para hospedagem estática e se conecta a um banco de dados PostgreSQL fornecido pelo **Supabase**, garantindo uma solução moderna e escalável.

---

## **Estrutura do Projeto**

O projeto é organizado de forma simples e eficiente, com apenas três arquivos principais:

```
docs/
├── index.html        # Estrutura da página
├── style.css         # Estilos da aplicação
└── script.js         # Lógica de busca e integração com o Supabase
```

---

## **Tecnologias Utilizadas**

- **Frontend**: HTML, CSS e JavaScript puro.
- **Backend**: Supabase (PostgreSQL como banco de dados).
- **Hospedagem**: GitHub Pages (para o frontend estático).

---

## **Funcionalidades**

1. **Busca Dinâmica**:
   - Pesquisa medicamentos por nome ou farmácia.
   - Atualização em tempo real conforme o usuário digita.

2. **Exibição de Dados**:
   - Tabela responsiva com informações como nome, necessidade de receita, estoque, preço e localização.

3. **Integração com Banco de Dados**:
   - Dados armazenados em um banco PostgreSQL no Supabase.
   - Comunicação segura via API REST.

4. **Design Responsivo**:
   - Layout adaptável para dispositivos móveis e desktops.

---

## **Estratégia de Projeto**

### **1. Frontend Simples e Eficiente**
- O frontend foi desenvolvido com **HTML**, **CSS** e **JavaScript puro**, sem frameworks ou bibliotecas adicionais, garantindo leveza e facilidade de manutenção.
- O uso de **GitHub Pages** permite hospedar o projeto de forma gratuita e com deploy contínuo.

### **2. Backend com Supabase**
- O **Supabase** foi escolhido por ser uma solução moderna e fácil de usar, oferecendo um banco de dados PostgreSQL completo com API REST e autenticação integrada.
- A tabela `medicamentos` armazena todas as informações necessárias, e políticas de segurança (RLS) garantem acesso controlado.

### **3. Comunicação Frontend-Backend**
- O frontend se conecta ao Supabase usando o **SDK JavaScript oficial**, que simplifica a integração e permite operações como consultas e filtros.
- A busca é realizada diretamente no banco de dados, utilizando operadores como `ilike` para consultas case-insensitive.

### **4. Design Responsivo**
- O layout foi desenvolvido com **CSS moderno**, utilizando flexbox e media queries para garantir uma experiência consistente em qualquer dispositivo.

---

## **Como Executar o Projeto**

### **1. Configuração do Supabase**
1. Crie uma conta no [Supabase](https://supabase.com/).
2. Crie um novo projeto e acesse o **Table Editor**.
3. Execute o script SQL abaixo para criar a tabela e inserir dados iniciais:

```sql
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

INSERT INTO medicamentos (nome, prescricao, entrada, saida, estoque, preco, farmacia) VALUES
('Paracetamol', 'Não', 100, 25, 75, 5.00, 'Farmácia Central'),
('Amoxicilina', 'Sim', 50, 10, 40, 12.00, 'Farmácia Zona Norte'),
('Cimegripe', 'Não', 65, 18, NULL, 46.90, 'Farmácia Santa Cecília/SP'),
('Luftal', 'Sim', 50, 32, 40, 26.00, 'Farmácia Zona Norte'),
('Dipirona', 'Sim', 48, 13, NULL, 7.00, 'Farmácia São Paulo/SP'),
('Ibuprofeno', 'Não', 80, 20, 60, 8.00, 'Farmácia Centro-Oeste');
```

4. Obtenha as credenciais do projeto em **Project Settings > API**.

---

### **2. Configuração do Frontend**
1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/farmacia-digital.git
```

2. Substitua as credenciais do Supabase no arquivo `script.js`:
```javascript
const SUPABASE_URL = 'SUA_URL_SUPABASE';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLICA';
```

3. Abra o arquivo `index.html` no navegador ou faça o deploy no GitHub Pages.

---

### **3. Hospedagem no GitHub Pages**
1. No repositório do GitHub, vá para **Settings > Pages**.
2. Selecione a branch `main` e a pasta `docs`.
3. Acesse o link fornecido pelo GitHub Pages para visualizar o projeto online.
