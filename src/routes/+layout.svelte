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
		  <CircleUser size={32} />
		  <span>370 AI App</span>
		  <div class="flex gap-2">
			<a href="/"><button type="button" class="btn preset-filled-primary-500">Home</button></a>
			<a href="/chat"><button type="button" class="btn preset-tonal-primary">Chatbot</button></a>
			<a href="/check_readiness"><button type="button" class="btn preset-outlined-primary-500">Weaviate</button></a>
		  </div>
		{/snippet}
		{#snippet trail()}
		  <Github size={20} />
		{/snippet}
	  </AppBar>
</nav>

{@render children()}
