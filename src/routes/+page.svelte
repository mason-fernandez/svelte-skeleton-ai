<script lang="ts">

</script>

<main class="flex flex-wrap flex-col justify-center gap-4 p-4">
	<div class="w-1/2 m-auto gap-4 p-4 bg-surface-100-900 rounded">
		<h1 class="h1">Hi, I'm Mason!</h1>
		<p class="font-bold my-4">This website hosts my custom <a class="anchor" href="/chat">AI chatbot</a> featuring:</p>
    <ul class="pl-4 list-inside list-disc space-y-2">
      <li>Model Selection (deepseek-r1, llama3.2)</li>
      <li>Custom Roles</li>
      <li>File uploads and RAG functionality</li>
    </ul>
	</div>

  <div class="flex flex-wrap align-center w-1/2 m-auto gap-4 p-4 bg-surface-100-900 rounded">
    <div>
      <h3 class="h3">Current Stack</h3>
    <p class="p opacity-75">The current stack for this website is 
      <a class="underline" href="https://svelte.dev/" target="_blank">
        SvelteKit
      </a> as the metaframework, 
      <a class="underline" href="https://next.skeleton.dev/" target="_blank">
        Skeleton.dev
      </a> for the UI,
      <a class="underline" href="https://ollama.com/" target="_blank">
        Ollama
      </a> for a locally hosted LLM, and 
      <a class="underline" href="https://weaviate.io/" target="_blank">
        Weaviate
      </a> for RAG functionality</p>
    </div>
    <div class="flex flex-row gap-8 p-4">
      <a class="anchor" href="https://svelte.dev/" target="_blank">
        <div class="w-30">
          <img class="h-36 rounded-container" alt="Svelte Logo" src={"svelte.png"} />
        </div>
      </a>
      <a class="anchor" href="https://next.skeleton.dev/" target="_blank">
        <img class="w-36 h-36 rounded-container" alt="Skeleton Logo" src={"skeleton.png"} />
      </a>
      <a class="anchor" href="https://ollama.com/" target="_blank">
        <div class="bg-white w-36 h-36 flex rounded-container justify-center">
          <img class="h-36" alt="Ollama Logo" src={"ollama.png"} />
        </div>
      </a>
      <a class="anchor" href="https://weaviate.io/" target="_blank">
        <div class="flex h-36 items-center justify-center">
          <img class="w-36" alt="Weaviate Logo" src={"weaviate.png"} />
        </div>
        
      </a>
    </div>
      
  </div>
</main>
