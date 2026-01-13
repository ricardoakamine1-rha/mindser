# MindSer - Diagnóstico de Prontidão Executiva

Sistema web para aplicação do Questionário Diagnóstico de Prontidão Executiva (QDPE), com geração automática de relatórios em PDF.

## Funcionalidades

O MindSer oferece uma solução completa para avaliação de prontidão executiva, incluindo questionário estruturado em 6 dimensões, geração automática de relatórios em PDF com análise detalhada, e área administrativa protegida por senha para acesso aos relatórios.

## Estrutura do Questionário

O QDPE avalia 6 dimensões fundamentais para a prontidão executiva:

| Dimensão | Descrição |
|----------|-----------|
| Mentalidade Executiva | Avalia se a pessoa já pensa como diretora, mesmo sem o cargo |
| Tomada de Decisão | Avalia autonomia, coragem decisória e accountability |
| Influência e Política | Avalia capacidade de jogar o jogo organizacional |
| Comunicação Executiva | Avalia presença, narrativa e clareza |
| Maturidade Emocional | Avalia sustentação do custo do cargo |
| Estratégia de Carreira | Avalia realismo e clareza de caminho |

## Interpretação dos Resultados

O score total máximo é de 150 pontos, distribuídos igualmente entre as 6 dimensões (25 pontos cada). A classificação geral segue os seguintes critérios:

| Score | Classificação |
|-------|---------------|
| ≥ 120 | Pronta para aceleração executiva |
| 90-119 | Em construção (mentoria estruturante) |
| < 90 | Base ainda gerencial (mentoria de maturação) |

## Como Usar

Para iniciar o sistema, basta abrir o arquivo `index.html` em um navegador web ou hospedar os arquivos em qualquer servidor web estático. A pessoa avaliada acessa a página inicial, clica em "Iniciar Avaliação", preenche seus dados e responde as 30 perguntas. Ao finalizar, o relatório em PDF é gerado e baixado automaticamente.

## Área Administrativa

A área administrativa permite visualizar todos os relatórios gerados e baixar os PDFs novamente quando necessário.

**Senha padrão:** `mindser2024`

É recomendável alterar a senha no arquivo `app.js` (variável `ADMIN_PASSWORD`) antes de colocar em produção.

## Arquivos do Projeto

| Arquivo | Descrição |
|---------|-----------|
| index.html | Página principal com todas as seções |
| styles.css | Estilos visuais da aplicação |
| questions.js | Dados das perguntas e dimensões do QDPE |
| app.js | Lógica da aplicação e geração de PDF |
| logo.png | Logo do MindSer |

## Hospedagem

Por ser uma aplicação 100% client-side (JavaScript), o MindSer pode ser hospedado em qualquer serviço de hospedagem estática, como GitHub Pages, Netlify, Vercel, ou qualquer servidor web tradicional.

## Personalização

Para personalizar as cores, edite as variáveis CSS no início do arquivo `styles.css`. Para alterar as perguntas ou interpretações, edite o arquivo `questions.js`. Para modificar a senha administrativa, altere a variável `ADMIN_PASSWORD` no arquivo `app.js`.

## Observações Importantes

Os relatórios são armazenados no localStorage do navegador, o que significa que ficam disponíveis apenas no navegador/dispositivo onde foram gerados. Para uma solução com armazenamento centralizado, seria necessário implementar um backend com banco de dados.
