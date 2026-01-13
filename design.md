# MindSer - Design do Aplicativo Web

## Visão Geral
Aplicação web para aplicar o Questionário Diagnóstico de Prontidão Executiva (QDPE), gerando relatórios em PDF com análise detalhada das 6 dimensões de prontidão executiva.

## Páginas do Sistema

### 1. Página Inicial (Landing)
- Logo MindSer
- Breve descrição do diagnóstico
- Botão "Iniciar Avaliação"
- Link discreto para área administrativa

### 2. Página do Questionário
- Formulário com dados do avaliado (nome, email, cargo atual)
- 30 perguntas organizadas por dimensão
- Escala visual de 1 a 5 para cada pergunta
- Barra de progresso
- Botão "Finalizar e Gerar Relatório"

### 3. Página de Confirmação
- Mensagem de sucesso
- Download automático do PDF
- Opção de voltar ao início

### 4. Área Administrativa (protegida por senha)
- Login simples com senha
- Lista de relatórios gerados (armazenados localmente na sessão)
- Visualização e download dos PDFs

## Estrutura do Questionário (6 Dimensões)

### Dimensão 1 — Mentalidade Executiva (5 perguntas)
Avalia se a pessoa já pensa como diretora, mesmo sem o cargo.
- Média ≤ 3 → mentalidade ainda gerencial
- Média ≥ 4 → base executiva instalada

### Dimensão 2 — Tomada de Decisão e Responsabilidade (5 perguntas)
Avalia autonomia, coragem decisória e accountability.
- Pontuação baixa indica evitação e dependência
- Pontuação alta indica prontidão para exposição executiva

### Dimensão 3 — Influência e Política Organizacional (5 perguntas)
Avalia capacidade de jogar o jogo organizacional conscientemente.
- Baixa pontuação é um dos maiores bloqueios à diretoria

### Dimensão 4 — Comunicação Executiva e Posicionamento (5 perguntas)
Avalia presença, narrativa e clareza.

### Dimensão 5 — Maturidade Emocional Executiva (5 perguntas)
Avalia sustentação do custo do cargo.

### Dimensão 6 — Estratégia de Carreira e Timing (5 perguntas)
Avalia realismo e clareza de caminho.

## Estrutura do Relatório PDF

1. **Cabeçalho**
   - Logo MindSer
   - Título: "Relatório de Prontidão Executiva"
   - Data da avaliação
   - Dados do avaliado

2. **Score Total**
   - Pontuação geral (máx. 150)
   - Classificação:
     - ≥ 120 → Pronta para aceleração executiva
     - 90–119 → Em construção (mentoria estruturante)
     - < 90 → Base ainda gerencial (mentoria de maturação)

3. **Análise por Dimensão**
   - Gráfico visual de barras
   - Score de cada dimensão
   - Interpretação específica

4. **Leitura Qualitativa**
   - Análise de discrepâncias
   - Pontos de atenção
   - Recomendações

## Paleta de Cores

- **Primária**: #1E3A5F (Azul escuro executivo)
- **Secundária**: #4A90A4 (Azul médio)
- **Destaque**: #D4AF37 (Dourado)
- **Fundo**: #F8F9FA (Cinza claro)
- **Texto**: #2C3E50 (Cinza escuro)

## Tipografia

- Títulos: Inter Bold
- Corpo: Inter Regular
- Estilo: Profissional, limpo, executivo

## Fluxo do Usuário

1. Usuário acessa a página inicial
2. Clica em "Iniciar Avaliação"
3. Preenche dados pessoais
4. Responde as 30 perguntas (escala 1-5)
5. Clica em "Finalizar"
6. PDF é gerado e baixado automaticamente
7. Administrador acessa área protegida para ver relatórios
