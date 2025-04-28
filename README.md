# Svelte Skeleton AI Chat

A modern AI chat application built with SvelteKit, featuring vector search, RAG capabilities, and image generation.

## Rubric

- **1** Effectively use Svelte's components and routing mechanisms to provide a UI for your AI features.
    - I created a navigation bar, a lightswitch, and I utilized the provided components for this site.
- **2** Work with command-line tools, Git, and NPM to create and manage your project within a real development toolset and history of consistent Git commits.
    - You can see consistent updates on my GitHub repo and proper storage of environment variables
- **3** Use Docker compose, images, and containers to configure the LLM, database, and app deployment.
    - My docker compose is working properly
- **4** Use modern CSS frameworks and UI tools to make custom, appealing app UI.
    - Successfully updated to skeleton 3 and tailwind 4
- **5** Demonstrate a working AI chat interface.
    - My chat is working with a few customization options
- **6** Retrieve embeddable data and make it available through a RAG-based UI.
    - I've got rag working with deepseek and llama 3.2
- **7**Structure, document, and deploy your final project code according to common industry practices.
    - I properly store my env files and use api routes, and page routes
- **8** Design and Develop the major features of your app as uniquely your own.  Do not just copy code from class or online sources.
    - I added a lightswitch, redesigned the AI chat page, and implemented various modals throughout the app
- **9** Ensure your app functions properly without errors and exhibits good functionality, well structured data, and quality UI/UX design.
    - Everything is functioning properly. I also implemented my own theme and added custom icons.

## Features

- **AI Chat Interface** with custom roles and streaming responses
- **Multiple LLM Support** - Switch between Llama 3.2 and DeepSeek models
- **Vector Search** using Weaviate for semantic image search
- **PDF Document Upload** with RAG (Retrieval Augmented Generation)
- **Image Generation** using DALL-E 3
- **Dynamic Avatar Selection** from static image directory
- **Custom UI** built with Skeleton.dev components

## Tech Stack

- [SvelteKit](https://svelte.dev/) - Web framework
- [Skeleton.dev](https://next.skeleton.dev/) - UI components
- [Ollama](https://ollama.com/) - Local LLM hosting
- [Weaviate](https://weaviate.io/) - Vector database
- [OpenAI](https://openai.com/) - DALL-E 3 image generation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mason-fernandez/svelte-skeleton-ai.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the Docker containers for Weaviate:
```bash
npm run localDockerRestart
```

4. Initialize the vector collections:
```bash
npm run defineEmbeddedFile
npm run configCLIP
```

5. Start the development server:
```bash
npm run dev -- --port 3700
```

## Environment Variables

Create a `.env` file with:
```
OPENAI_API_KEY=your_key_here
```

## Architecture

- `/src/routes/chat` - Main chat interface
- `/src/routes/images` - Image gallery and upload
- `/src/routes/search` - Vector search interface
- `/src/routes/imageGen` - AI image generation
- `/src/lib/components` - Reusable UI components

## Docker Integration

The project uses Docker Compose to run Weaviate and its required services. See `docker-compose.yml` for configuration.

## License

MIT