<script lang="ts">
	import '../app.css';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
  	import CircleUser from 'lucide-svelte/icons/circle-user';
  	import Github from 'lucide-svelte/icons/github';
	let { children } = $props();
</script>

<nav>
	<AppBar>
		{#snippet lead()}
		<a href="/"><CircleUser size={32} />
		  <span class="h5">370 AI App</span></a>
		  
		  <div class="flex gap-2">
			<a class="anchor" href="/">Home</a>
			<a class="anchor" href="/chat">Chatbot</a>
			<a class="anchor" href="/check_readiness">Weaviate</a>
		  </div>
		{/snippet}
		{#snippet trail()}
		  <a href="https://github.com/mason-fernandez/svelte-skeleton-ai.git" target="_blank"><Github size={20} /></a>
		{/snippet}
	  </AppBar>
</nav>

{@render children()}
