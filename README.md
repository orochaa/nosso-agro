# Nosso Agro 🌾

API para gerenciamento de produtores rurais, suas propriedades e safras.

## 📜 Descrição

A API tem como objetivo gerenciar produtores rurais, suas Propriedades, safras e culturas plantadas, além de oferecer um dashboard com indicadores importantes.

O sistema foi desenvolvido visando alta manutenibilidade, escalabilidade e testabilidade, utilizando NestJS com TypeScript e arquitetura em camadas baseada em Clean Architecture.

Perfeito. Nesse caso, vamos remover a menção ao **MVC**, que não faz sentido na **Arquitetura Limpa**, e incluir uma descrição completa sobre os princípios dessa arquitetura, a separação de responsabilidades, a organização de arquivos, e como isso se alinha ao **S** do **SOLID (Single Responsibility Principle)**.

Aqui vai a seção revisada e melhorada:

## 🏛️ Arquitetura

O projeto foi desenvolvido utilizando **Arquitetura Limpa**, que tem como objetivo principal desacoplar as regras de negócio das dependências externas, como frameworks, banco de dados e protocolos de transporte.

### 🔄 Princípios da Arquitetura Limpa:

- **Independência de Framework:**
  O código de negócio (Domínio) não conhece o NestJS, Prisma ou qualquer framework/biblioteca externa.

- **Independência de UI e Transporte:**
  A camada de apresentação (HTTP) é apenas uma interface que conecta o mundo externo com o núcleo da aplicação. Pode ser substituída por REST, GraphQL, CLI ou qualquer outro meio.

- **Independência de Banco de Dados:**
  A lógica de negócio não depende diretamente do PostgreSQL, Prisma ou qualquer banco. A persistência é tratada através de contratos (interfaces) e implementações específicas na camada de infraestrutura.

- **Independência de Agentes Externos:**
  O núcleo da aplicação não sabe nada sobre serviços externos, bibliotecas, frameworks ou ferramentas. Isso permite evolução tecnológica sem impactos na regra de negócio.

### 🔗 Organização em Camadas:

- **Domain:**
  Contém as **Entities** (Entidades de Negócio) e os **UseCases** (Regras de Negócio), completamente desacoplados de frameworks e detalhes técnicos.

- **Services:**
  Implementações dos casos de uso, protocolos e orquestração da lógica, comunicando o domínio com as implementações externas.

- **Presentation:**
  Camada responsável por expor a API, composta por **Controllers** e **Mappers** (DTOs e transformações entre entidades internas e dados externos).

- **Infra:**
  Implementações de detalhes externos, como banco de dados (Prisma), serviços externos e adaptadores.

- **Main:**
  Ponto de entrada da aplicação, onde ocorre a composição de módulos, injeção de dependências, middlewares, filtros e pipes globais.

## 📦 Organização de Código e Boas Práticas

### 🔸 **Single Responsibility Principle (S do SOLID):**

Cada classe e arquivo tem uma única responsabilidade. Isso garante:

- Fácil manutenção.
- Alto nível de legibilidade.
- Facilidade na escrita de testes unitários.
- Evolução segura e previsível do sistema.

**➡️ Prática aplicada:**

> Cada classe, entidade, use case, controller, mapper, service ou adapter está isolado em seu próprio arquivo.

### 🧠 Benefícios:

- Facilidade para entender, alterar ou evoluir qualquer parte do sistema.
- Testes mais simples e isolados.
- Redução de efeitos colaterais em alterações.
- Permite extensão da aplicação sem alterar o núcleo (Open/Closed Principle).

## 📐 Padrões Utilizados

- **Clean Architecture:**
  Separação rígida entre regras de negócio e detalhes de implementação.

- **Repository Pattern:**
  Isola a lógica de persistência, abstraindo o banco de dados com interfaces e classes específicas em `infra/adapters`.

- **DTO Pattern (Data Transfer Object):**
  Definição clara dos contratos de dados entre o mundo externo e interno, garantindo segurança e validação.

- **Dependency Injection:**
  Aplicado via NestJS para garantir baixo acoplamento e fácil substituição de dependências.

- **Factory Pattern (para testes):**
  Criação de entidades mockadas de forma reutilizável para testes unitários e de integração.

- **Validation Pattern:**
  Uso extensivo de Pipes e class-validator para garantir integridade dos dados na entrada.

## 🗂️ Estrutura de Pastas

```
nosso-agro/
├── domain/               # Camada de domínio
│   ├── entities/         # Entidades de negócio
│   └── usecases/         # Casos de uso (Regras de negócio)
│
├── infra/                # Implementações externas
│   ├── adapters/         # Adaptadores (serviços externos, etc.)
│   └── database/         # Persistência de dados (repositories, prisma)
│
├── main/                 # Entrada da aplicação
│   ├── modules/          # Módulos da aplicação
│   ├── server.ts         # Bootstrap da API
│   ├── http-exceptions.filter.ts  # Filtro global de exceções
│   └── validation.pipe.ts          # Pipe global de validações
│
├── presentation/         # Interface da API
│   ├── controllers/      # Controllers HTTP
│   └── mappers/          # DTOs e mapeamento entre entidades e respostas externas
│
├── services/             # Casos de uso orquestrados e protocolos
│   ├── protocols/        # Contratos (interfaces) da aplicação
│   └── usecases/         # Implementação dos casos de uso
│
├── prisma/               # Configuração e schema do Prisma
│
├── __tests__/            # Testes automatizados
│   ├── e2e/              # Testes end-to-end das rotas
│   ├── helpers/          # Mocks e utilitários para testes
│   │   ├── mock-domain.ts
│   │   └── setup-test.ts
│   └── ...               # Mesma estrutura do src, mas para testes unitários
│
├── docker-compose.yml    # Orquestração do app e banco de dados
├── Dockerfile            # Dockerfile da aplicação
└── README.md             # Documentação do projeto
```

## 🚀 Tecnologias Utilizadas

- **Node.js** + **NestJS**
- **TypeScript**
- **PostgreSQL** (via Prisma ORM)
- **Docker** + **Docker Compose**
- **Jest** (Testes Unitários)
- **Supertest** (Testes de Integração)
- **Swagger/OpenAPI** (Documentação automática)

## 🛠️ Funcionalidades Implementadas

- ✅ CRUD de Produtores Rurais
- ✅ CRUD de Propriedades
- ✅ CRUD de Safras e Culturas Plantadas
- ✅ Validação de CPF e CNPJ
- ✅ Validação de áreas (Agricultável + Vegetação ≤ Área Total)
- ✅ Dashboard com:

  - Total de Propriedades
  - Total de Hectares
  - Gráficos por:

    - Estado
    - Cultura Plantada
    - Uso do Solo (Área Agricultável e Vegetação)

- ✅ Testes Unitários e de Integração
- ✅ Documentação Swagger/OpenAPI
- ✅ Tratamento Global de Erros
- ✅ Pronto para deploy via Docker

## 🐳 **Como Executar Localmente com Docker (Recomendado)**

### Pré-requisitos:

- Docker instalado
- Docker Compose instalado

### Passos:

```bash
# Subir a aplicação e o banco de dados
docker-compose up --build
```

O Docker cuida de toda a configuração do banco de dados e do ambiente da aplicação automaticamente.

## 💻 **Como Executar Localmente sem Docker**

### Pré-requisitos:

- Node.js (v18+)
- pnpm ([https://pnpm.io/](https://pnpm.io/))
- Banco de dados PostgreSQL rodando localmente

### Passos:

1 - Configuração do Ambiente

Antes de tudo, crie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário, principalmente a variável `DATABASE_URL` para refletir o ambiente que você está utilizando (local ou Docker).

2 - **Instale as dependências:**

```bash
pnpm install
```

3 - **Prepare o banco de dados (migrations + seed):**

```bash
pnpm prisma:dev
```

Esse comando executa:

- `prisma generate` (Gera os clientes Prisma)
- `prisma migrate dev` (Cria e aplica migrations)

3 - **Execute a aplicação:**

```bash
pnpm dev
```

### Acesso:

- API: [http://localhost:3000](http://localhost:3000)
- Documentação Swagger: [http://localhost:3000/api](http://localhost:3000/api)

## 🧪 Executar Testes

### Testes Unitários:

```bash
npm run test:unit
```

### Testes de Integração e2e:

```bash
npm run test:e2e
```

### Cobertura de Testes:

```bash
npm run test:ci
```

## 🔗 Documentação da API

Acesse a documentação interativa Swagger: http://localhost:3000/docs

Acesse a documentação OpenAPI: [openapi-spec.json](./docs/openapi-spec.json)

## ✍️ Autor

Feito com ❤️ por **Bruno Rocha**
[LinkedIn](www.linkedin.com/in/bruno-rocha-a65a49157) • [GitHub](https://github.com/orochaa)
