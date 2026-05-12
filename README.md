# 🏆 NextLiga Hub

Uma plataforma moderna para gestão de campeonatos esportivos, desenvolvida com tecnologias web de ponta.

## 📋 Sobre o Projeto

O NextLiga Hub é uma aplicação web completa para organizar e acompanhar campeonatos esportivos. Permite criar torneios, gerenciar inscrições, acompanhar resultados e interagir com a comunidade através de um feed social.

### ✨ Principais Funcionalidades

- 🏆 **Gestão de Campeonatos**: Criação e administração de torneios
- 📊 **Dashboard Administrativo**: Métricas e visão geral em tempo real  
- 👥 **Sistema de Inscrições**: Cadastro e aprovação de equipes
- 📱 **Feed Social**: Compartilhamento de momentos e atualizações
- 🔐 **Autenticação**: Sistema de login e cadastro de usuários

## 🛠️ Tecnologias Principais

### Frontend & Framework
- **React 19** - Biblioteca para interfaces de usuário
- **TanStack Start** - Framework React full-stack moderno
- **TypeScript** - JavaScript com tipagem estática
- **TanStack Router** - Sistema de roteamento type-safe

### Estilização & UI
- **Tailwind CSS** - Framework CSS utility-first
- **ShadCN/UI** - Biblioteca de componentes prontos
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos

### Ferramentas de Desenvolvimento
- **Vite** - Bundler rápido para desenvolvimento
- **ESLint** - Verificação de qualidade do código
- **Prettier** - Formatação automática de código

### Deploy
- **Cloudflare Workers** - Plataforma serverless para produção

## 🔧 Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm**, **yarn** ou **pnpm** (gerenciador de pacotes)

## 🚀 Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd next-liga-hub
```

### 2. Instale as dependências
```bash
# Usando npm
npm install

# Ou usando yarn
yarn install

# Ou usando pnpm (recomendado)
pnpm install
```

### 3. Execute em modo desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build para produção
- `npm run preview` - Visualiza build de produção localmente
- `npm run lint` - Verifica problemas no código
- `npm run format` - Formata código automaticamente

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes React reutilizáveis
│   └── ui/        # Componentes de interface (ShadCN/UI)
├── routes/        # Páginas da aplicação
├── hooks/         # Custom React Hooks
├── lib/           # Utilitários e configurações
└── styles.css    # Estilos globais
```

## 🎯 Para Estudar e Entender o Projeto

### Conceitos Básicos Necessários
- **HTML/CSS** - Estrutura e estilo de páginas web
- **JavaScript ES6+** - Linguagem de programação moderna
- **React** - Biblioteca para criar interfaces
- **TypeScript** - Tipagem para JavaScript

### Tecnologias Específicas
- **TanStack Start** - Framework React moderno
- **Tailwind CSS** - CSS com classes utilitárias
- **Git** - Controle de versão

### Conceitos Avançados
- **Server-Side Rendering (SSR)** - Renderização no servidor
- **Edge Computing** - Execução próxima ao usuário
- **Component Libraries** - Bibliotecas de componentes

## 🌐 Deploy

Para fazer deploy na Cloudflare:

```bash
# Build da aplicação
npm run build

# Deploy (necessário configurar Wrangler CLI)
npx wrangler deploy
```

## 📝 Notas

- O projeto usa **modo escuro** como padrão
- **Responsivo** para desktop e mobile
- **Type-safe** com TypeScript em toda aplicação
- **Performance otimizada** com TanStack Start e Vite

---

Desenvolvido com ❤️ usando tecnologias modernas