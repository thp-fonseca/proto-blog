# poc-proto-blog

Bem-vindo ao **poc-proto-blog**! 🚀 Este projeto é uma prova de conceito para um blog, utilizando uma arquitetura moderna e eficiente. Abaixo, você encontrará uma descrição detalhada das tecnologias e ferramentas utilizadas, bem como instruções para rodar o projeto em ambiente de desenvolvimento.

## Backend

### Tecnologias Utilizadas

- **NestJS**: Utilizado como framework principal para um desenvolvimento ágil e fácil, baseado no Express.
- **Mongoose**: Plugin para integração com o banco de dados MongoDB.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados.
- **Helmet**: Middleware para configurar cabeçalhos HTTP e melhorar a segurança da API.
- **CORS**: Middleware para habilitar o compartilhamento de recursos entre diferentes origens.
- **Winston**: Biblioteca para gerenciamento de logs.
- **Zod**: Biblioteca para validação de inputs.
- **Swagger**: Ferramenta para documentação da API.
- **JWT**: Utilizado juntamente com o Passport para autenticação e guarda de rotas.

## Frontend

### Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **shadcn**: Biblioteca de estilos baseada no Tailwind CSS.
- **React Query**: Biblioteca para gerenciamento de estado de requisições, incluindo cache e scroll infinito.
- **Ky**: Ferramenta para realizar requisições HTTP.
- **next-intl**: Biblioteca para internacionalização da plataforma (suporte a múltiplas línguas).
- **Zod**: Utilizado para validação de inputs e formulários.
- **Zustand**: Biblioteca para gerenciamento de estado, mais moderna e rápida que outras alternativas.
- **Lucide**: Biblioteca de ícones SVG.
- **date-fns**: Biblioteca para formatação de datas.

## Como Rodar o Projeto

### Pré-requisitos

- **pnpm**: Gerenciador de pacotes.
- **Docker**: Plataforma para desenvolvimento e execução de aplicações em contêineres.

### Passos para Rodar o Projeto

1. **Instalar Dependências**:
   ```bash
   pnpm install
   ```

2. **Configurar Variáveis de Ambiente**:
   - Copie o arquivo `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Preencha as variáveis de ambiente necessárias no arquivo `.env`.

3. **Subir o Docker Compose**:
   - Execute o comando para subir o MongoDB:
     ```bash
     docker compose up -d
     ```
   - O script `init-mongo` cuidará da criação da estrutura do banco de dados.

4. **Rodar a Aplicação**:
   - Execute o comando para iniciar o ambiente de desenvolvimento:
     ```bash
     pnpm dev
     ```
   - A aplicação estará disponível nas portas `3000` (frontend) e `3333` (backend).

5. **Docs e swagger**
    - A api com o swagger irá abrir no endpoint: `http://localhost:3333/docs`

### Arquitetura

A arquitetura escolhida permite utilizar um monorepo como casca para uma solução distribuída de qualquer tipo. Para uma aplicação que precisa suportar mais de 100 mil usuários, recomendamos o uso de Kubernetes, que pode ser simulado com um Docker Compose específico.

### Subir Arquitetura de Produção

Para simular um ambiente de produção local, utilize o seguinte comando:
```bash
docker compose -f docker-compose.prod.yml up -d
```
Este comando irá buildar o NestJS e o Next.js separadamente, junto com o banco de dados, e subir as aplicações nas portas corretas.

---
