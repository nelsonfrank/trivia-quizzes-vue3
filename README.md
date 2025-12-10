# Trivia Master

A sleek and interactive trivia quiz application built with Vue 3, Vite, and Tailwind CSS. Test your knowledge across a variety of categories with real-time scoring and a modern, engaging user interface.

## Features

- **Multiple Categories**: Choose from a diverse range of categories like General Knowledge, Science, Movies, and more.
- **Timed Questions**: Each question is timed to keep the challenge exciting.
- **Real-time Scoring**: Track your score as you progress through the quiz.
- **Modern UI**: A beautiful and responsive design with smooth animations and interactive elements.
- **Error Handling**: A built-in retry mechanism to handle API failures gracefully.

## Tech Stack

- **[Vue 3](https://vuejs.org/)**: The progressive JavaScript framework for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A next-generation frontend tooling that provides a faster and leaner development experience.
- **[Pinia](https://pinia.vuejs.org/)**: The intuitive, type-safe, and flexible state management library for Vue.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Lucide](https://lucide.dev/)**: A beautiful and consistent icon toolkit.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or higher)
- [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nelsonfrank/trivia-quizzes-vue3.git
    cd trivia-quizzes-vue3
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    The `.env` file contains the URL for the trivia API, which is already pre-configured.

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    The application should now be running at `http://localhost:5173`.

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm preview`: Serves the production build locally for previewing.
- `pnpm test:unit`: Runs the unit tests.
- `pnpm lint`: Lints the code to find and fix problems.
- `pnpm format`: Formats the code using Prettier.

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
