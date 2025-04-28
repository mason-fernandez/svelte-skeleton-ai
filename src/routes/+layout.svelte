<script lang="ts">
	import '../app.css'
	import CircleUser from 'lucide-svelte/icons/circle-user'
	import Github from 'lucide-svelte/icons/github'
	import LightSwitch from '$lib/components/LightSwitch.svelte'
	let { children } = $props()
</script>

<nav class="bg-surface-100-900 relative w-full">
	<div class="m-auto flex w-2/3 flex-row items-center justify-between p-2">
		<div class="flex flex-row items-center gap-4">
			<a class="flex gap-2" href="/"><CircleUser size={32} /> </a>

			<div class="flex gap-4">
				<a class="anchor text-surface-900-100 font-semibold" href="/">Home</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/chat">Chatbot</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/images">Gallery</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/imageGen">Generate</a>
				<a class="anchor text-surface-900-100 font-semibold" href="/check_readiness">Status</a>
			</div>
		</div>

		<div class="flex gap-4">
			<LightSwitch />
			<a
				class="flex flex-row items-center gap-2 rounded bg-green-700 p-2"
				href="https://github.com/mason-fernandez/svelte-skeleton-ai.git"
				target="_blank">
				<p class="text-surface-950-50">Github</p>
				<Github size={20} />
			</a>
		</div>
	</div>
</nav>

{@render children()}
