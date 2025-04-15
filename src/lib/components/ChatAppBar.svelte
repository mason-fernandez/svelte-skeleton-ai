<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte'
	import { Accordion } from '@skeletonlabs/skeleton-svelte'
	//let { selectedSystemPrompt = $bindable() } = $props()

	let systemPrompts = [
		'Helpful Assistant',
		'Emoji Pirate',
		'Web Development Instructor',
		'Physics Tutor'
	]

	let examplePrompts = [
		'Tell me a joke',
		'Explain quantum computing',
		'Write a haiku about programming',
		'Describe the benefits of exercise'
	]

	let {
		selectedSystemPrompt = $bindable(systemPrompts[0]),
		selectedExamplePrompt = $bindable(''),
		deepSeek = $bindable(false)
	} = $props<{
		selectedSystemPrompt?: string
		selectedExamplePrompt?: string
		deepSeek?: boolean
	}>()

	/* 
    function handleSystemPromptChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
        selectedSystemPrompt = (event.currentTarget as HTMLSelectElement).value;
    }

    function handleExamplePromptChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
        selectedExamplePrompt = event.currentTarget.value;
    } */
</script>

<nav class="bg-primary-800 w-full rounded p-4">
  <div class="h3 mb-4">My AI Chatbot</div>
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<!-- System Prompt Dropdown -->
			<div class="relative">
				<select
					class="btn preset-filled-surface-500 rounded-md px-4 py-2 text-white"
					bind:value={selectedSystemPrompt}>
					<option value="">Choose Role</option>
					{#each systemPrompts as prompt}
						<option value={prompt}>{prompt}</option>
					{/each}
				</select>
			</div>

			<!-- Example Prompts Dropdown -->
			<div class="relative">
				<select
					class="btn preset-filled-surface-500 rounded-md px-4 py-2 text-white"
					bind:value={selectedExamplePrompt}>
					<option value="">Choose a prompt</option>
					{#each examplePrompts as prompt}
						<option value={prompt}>{prompt}</option>
					{/each}
				</select>
			</div>

			<!-- JSON Mode Toggle -->
			<div class="flex items-center justify-center flex-wrap">
				<span class="mr-2 text-white">DeepSeek?</span>
				<button
					class={`h-6 w-12 rounded-full p-1 ${deepSeek ? 'bg-green-400' : 'bg-gray-400'}`}
					onclick={() => (deepSeek = !deepSeek)}>
					<div
						class={`h-4 w-4 transform rounded-full bg-white transition-transform ${
							deepSeek ? 'translate-x-6' : ''
						}`}>
					</div>
				</button>
			</div>
		</div>
	</div>
</nav>

{#if selectedSystemPrompt}
	<div class="mt-4 bg-yellow-100 p-4">
		<p class="text-yellow-800">System Prompt: {selectedSystemPrompt}</p>
	</div>
{/if}
