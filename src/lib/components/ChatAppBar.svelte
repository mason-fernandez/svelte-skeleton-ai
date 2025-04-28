<script lang="ts">
	import { Pencil, FishSymbol, Sparkle } from 'lucide-svelte'
	import { Avatar } from '@skeletonlabs/skeleton-svelte'
	import { Switch } from '@skeletonlabs/skeleton-svelte'
	import { SYSTEM_PROMPTS, type SystemPromptKey } from '$lib/prompts/systemPrompts'
	import { Modal } from '@skeletonlabs/skeleton-svelte'
	import { onMount } from 'svelte';

	let openState = $state(false)
	let avatarImages = $state<string[]>([])

	onMount(async () => {
		try {
			const response = await fetch('/api/avatars');
			if (response.ok) {
				avatarImages = await response.json();
			}
		} catch (error) {
			console.error('Failed to fetch avatars:', error);
		}
	});

	function modalClose() {
		openState = false
	}

	let systemPrompts = [
		'Helpful Assistant',
		'Emoji Pirate',
		'Web Development Instructor',
		'Physics Tutor'
	] as const

	let examplePrompts = [
		'Tell me a joke',
		'Explain quantum computing',
		'Write a haiku about programming',
		'Describe the benefits of exercise'
	]

	let {
		selectedSystemPrompt = $bindable(systemPrompts[0]),
		selectedExamplePrompt = $bindable(''),
		deepSeek = $bindable(false),
		selectedAvatar = $bindable('')
	} = $props<{
		selectedSystemPrompt?: string
		selectedExamplePrompt?: string
		deepSeek?: boolean
		selectedAvatar?: string
	}>()

	$effect(() => {
		if (avatarImages.length > 0 && !selectedAvatar) {
			selectedAvatar = avatarImages[0];
		}
	})

	let promptContent = $state('')

	$effect(() => {
		promptContent = selectedSystemPrompt
			? SYSTEM_PROMPTS[selectedSystemPrompt as SystemPromptKey]
			: ''
	})
</script>

<nav class="w-full rounded">
	<div class="flex justify-between">
		<div class="my-auto">
			<div class="rounded-xl w-36 h-36 h-max-36">
				<Avatar size="24" src={selectedAvatar} rounded="" name="filtered" />
			</div>
		</div>
		<div class="m-2 w-full">
			<div class="align-center flex w-full flex-row justify-between">
				<div class="flex flex-row gap-2">
					<span class="h3">{selectedSystemPrompt || 'Select a Role'}</span>
					<Modal
						open={openState}
						onOpenChange={(e) => (openState = e.open)}
						triggerBase="btn m-0 mt-2 p-0"
						contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
						backdropClasses="backdrop-blur-sm">
						{#snippet trigger()}<Pencil />{/snippet}
						{#snippet content()}
							<header class="flex justify-between">
								<h2 class="h2">Change Agent</h2>
							</header>
							<div class="container mx-auto flex flex-wrap items-center justify-between">
								<div class="py-4">
									<select
										class="btn preset-filled-surface-500 rounded-md px-4 py-2"
										bind:value={selectedAvatar}>
										{#each avatarImages as avatar}
											<option value={avatar}>{avatar.replace(/\.(png|jpg|jpeg|gif)$/i, '')}</option>
										{/each}
									</select>
									<div class="p-4">
										<Avatar size="" src={selectedAvatar} rounded="" name="filtered" />
									</div>
								</div>
								<div class="flex items-center space-x-4">
									<!-- System Prompt Dropdown -->
									<div class="relative">
										<select
											class="btn preset-filled-surface-500 rounded-md px-4 py-2"
											bind:value={selectedSystemPrompt}>
											<option value="">Choose Role</option>
											{#each systemPrompts as prompt}
												<option value={prompt}>{prompt}</option>
											{/each}
										</select>
									</div>
								</div>
							</div>
							<div class="min-h-64 max-h-64 overflow-y-auto">
								<p class="text-sm whitespace-pre-wrap opacity-75">{promptContent}</p>
							</div>
							<footer class="flex justify-end gap-4">
								<button type="button" class="btn preset-filled" onclick={modalClose}
									>Confirm</button>
							</footer>
						{/snippet}
					</Modal>
				</div>
				<div class="">
					<span class="">Llama 3.2</span>
					<Switch
						controlInactive="bg-secondary-500"
						checked={deepSeek}
						onCheckedChange={() => (deepSeek = !deepSeek)}>
						{#snippet inactiveChild()}<Sparkle size="14" />{/snippet}
						{#snippet activeChild()}<FishSymbol size="14" />{/snippet}
					</Switch>
					<span class="">DeepSeek</span>
				</div>
			</div>
			<div class="max-h-24 min-h-24 overflow-y-auto">
				<p class="text-sm whitespace-pre-wrap opacity-75">{promptContent}</p>
			</div>
		</div>
	</div>
</nav>
