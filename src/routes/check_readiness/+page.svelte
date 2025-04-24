<script lang="ts">
	import type { PageData } from '/$types';
    import { ServerOff, CircleCheckBig, RefreshCcw } from 'lucide-svelte';
	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<main class="flex flex-wrap flex-col justify-center gap-4 p-4">
	<div class="w-1/2 m-auto gap-4 p-4 bg-surface-100-900 rounded">
		<h1 class="h1">Weaviate Connection Status</h1>
        <p>To start the docker container enter <code class="code">docker compose up</code> or to restart enter <code class="code">npm run localDockerRestart</code></p>
		<div class="flex flex-row items-center m-4 gap-4">
            <div class="flex h-36 items-center justify-center">
			    <img class="w-36" alt="Weaviate Logo" src={'weaviate.png'} />
		    </div>
            <a class="m-4" data-sveltekit-reload href="/check_readiness"><RefreshCcw /></a>
            
            {#if data.ready}
            <CircleCheckBig size={40} class="text-success-800"/>
            <h4 class="h4">Successfully Connected</h4>
            {:else}
            <ServerOff size={40} class="text-error-800"/>
            <h4 class="h4">Failed to Connect</h4>
            {/if}
        </div>
        
	</div>
</main>
