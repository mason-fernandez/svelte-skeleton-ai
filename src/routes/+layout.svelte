<script lang="ts">
	import '../app.css';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Github from 'lucide-svelte/icons/github';
	let { children } = $props();
</script>

<nav class="relative w-full bg-surface-100-900">
	<div class="m-auto w-2/3 flex flex-row p-2 justify-between items-center">
		<div class="flex flex-row items-center gap-4">
			<a class="flex gap-2" href="/"
				><CircleUser size={32} />
				</a
			>

			<div class="flex gap-4">
				<a class="anchor text-surface-900-100 font-semibold" href="/">Home</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/chat">Chatbot</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/images">Images</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/check_readiness">Weaviate</a>
			</div>
		</div>
		
		<a
			class="flex flex-row items-center p-2 gap-2 bg-green-700 rounded"
			href="https://github.com/mason-fernandez/svelte-skeleton-ai.git"
			target="_blank"
		>
			<p class="text-surface-950-50">Github</p>
			<Github size={20} />
		</a>
	</div>
	
		
</nav>

{@render children()}
