# Svelte Skeleton AI Chat

A modern AI chat application built with SvelteKit, featuring vector search, RAG capabilities, and image generation.

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