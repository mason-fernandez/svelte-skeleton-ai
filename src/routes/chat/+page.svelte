<script lang="ts">
	import { Send, FileUp, MessageSquareOff, XCircle, CircleX, CirclePlus } from 'lucide-svelte'
	import { Avatar } from '@skeletonlabs/skeleton-svelte'
	import TypingIndicator from '$lib/utils/typingIndicator.svelte'
	import { readableStreamStore } from '$lib/readableStreamStore.svelte'
	import { Marked } from 'marked'
	import { markedHighlight } from 'marked-highlight'
	import DOMPurify from 'dompurify'
	import ChatAppBar from '$lib/components/ChatAppBar.svelte'
	import FileUploadAside from '$lib/components/FileUploadAside.svelte'

	import { Modal } from '@skeletonlabs/skeleton-svelte'

	let openState = $state(false)

	function modalClose() {
		openState = false
	}

	import hljs from 'highlight.js'
	import javascript from 'highlight.js/lib/languages/javascript'
	import typescript from 'highlight.js/lib/languages/typescript'
	import css from 'highlight.js/lib/languages/css'
	hljs.registerLanguage('javascript', javascript)
	hljs.registerLanguage('typescript', typescript)
	hljs.registerLanguage('css', css)

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight: (code, lang) => {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext'
				return hljs.highlight(code, { language }).value
			}
		})
	)

	interface PageData {
		fileNames?: string[]
	}

	let { data } = $props<{ data: PageData }>()

	let systemPrompt = $state('')
	let examplePrompt = $state('')
	let deepSeek = $state(false)
	let fileNames = $state([] as string[])

	let chatHistory = $state(
		typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('chatHistory') || '[]') : []
	)

	$effect(() => {
		if (data?.fileNames) {
			fileNames = [...data.fileNames]
		}
	})

	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
		}
	})

	const response = readableStreamStore()

	let responseText = $state('')

	// Add this helper function
	function stripThinkTags(text: string): string {
		const thinkRegex = /<think>[\s\S]*?<\/think>/g
		return text.replace(thinkRegex, '')
	}

	$effect(() => {
		if (response.text !== '') {
			;(async () => {
				// Strip <think> tags from the response text
				//const cleanedText = stripThinkTags(response.text);
				const parsedText = await marked.parse(response.text)
				responseText = DOMPurify.sanitize(parsedText)
					.replace(/<script>/g, '&lt;script&gt;')
					.replace(/<\/script>/g, '&lt;/script&gt;')
			})()
		}
	})

	async function handleSubmit(this: HTMLFormElement, event: Event) {
		event?.preventDefault()
		if (response.loading) {
			console.log('busy')
			return // prevent request while waiting for response
		}
		const formData: FormData = new FormData(this)
		const message = formData.get('message')

		if (!message) {
			return
		}

		chatHistory = [...chatHistory, { role: 'user', content: message as string }]

		try {
			console.log('attempting to make POST request')

			const answer = response.request(
				new Request('/api/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						chats: chatHistory,
						systemPrompt,
						deepSeek,
						fileNames
					})
				})
			)

			this.reset() // clear the form

			const answerText = (await answer) as string

			const parsedAnswer = await marked.parse(answerText)
			//const cleanedAnswer = stripThinkTags(parsedAnswer);
			const purifiedText = DOMPurify.sanitize(parsedAnswer)
				.replace(/<script>/g, '&lt;script&gt;')
				.replace(/<\/script>/g, '&lt;/script&gt;')

			// put the answer into the chat history with role 'assistant'

			chatHistory = [...chatHistory, { role: 'assistant', content: purifiedText }]

			console.log(answerText)
		} catch (error) {
			console.error(error)
		}
	}

	function deleteAllChats() {
		chatHistory = []
	}

	function deleteFileName(fileName: string) {
		// Update the local state instead of the prop
		fileNames = fileNames.filter((name) => name !== fileName)
	}
</script>

<main class="flex flex-col flex-wrap justify-center gap-4 p-4">
	<div class="bg-surface-100-900 m-auto w-1/2 gap-4 rounded p-4">
		<h1>Chat persona creation</h1>
		<ChatAppBar
			bind:selectedSystemPrompt={systemPrompt}
			bind:selectedExamplePrompt={examplePrompt}
			bind:deepSeek />
	</div>
	<div class="m-auto w-1/2 gap-4 rounded p-4">
		<!-- Need to display each chat item here -->
		{#each chatHistory as chat, i}
			{#if chat.role === 'user'}
				<div class="ml-auto flex justify-end">
					<div class="card bg-primary-50-950 max-w-xl rounded-xl rounded-br-none p-4">
						{chat.content}
					</div>
				</div>
				<!-- this else handles the assistant role chat display -->
			{:else}
				<div class="mr-auto flex">
					<div class="py-8 mr-24">
						{@html chat.content}
					</div>
				</div>
			{/if}
		{/each}

		{#if response.loading}
			{#await new Promise((res) => setTimeout(res, 400)) then _}
				<div class="flex">
					<div class="py-8 mr-24">
						{#if response.text === ''}
							<TypingIndicator />
						{:else}
							{@html responseText}
						{/if}
					</div>
				</div>
			{/await}
		{/if}
	</div>
	<div class="bg-surface-100-900 m-auto w-1/2 gap-4 rounded p-4">
		<div class="">
			<form onsubmit={handleSubmit} class="">
				<div class="space-y-4">
					<div class="space-y-4">
						<div class="flex space-x-4">
							<textarea
								class="textarea"
								required
								placeholder="Type your message..."
								name="message"
								rows="3"
								bind:value={examplePrompt}></textarea>
							<div class="flex flex-col items-end justify-around">
								<button type="submit" class="btn preset-tonal-surface px-4 py-2"
									><Send size={36} /></button>
								<button type="button" class="px-auto" onclick={deleteAllChats}
									><MessageSquareOff /></button>
							</div>
						</div>
					</div>
				</div>
				<Modal
					bind:open={openState}
					triggerBase="btn preset-tonal"
					contentBase="card bg-surface-100-900 p-4 space-y-4 max-w-screen-sm"
					backdropClasses="">
					{#snippet trigger()}<CirclePlus />{/snippet}
					{#snippet content()}
						<div class="flex flex-col">
							<div class="flex flex-row items-center justify-between">
								<h2 class="h2">Upload File</h2>
								<button type="button" class="btn" onclick={modalClose}>
									<XCircle size={32} />
								</button>
							</div>

							<FileUploadAside />
						</div>
					{/snippet}
				</Modal>
				<div class="flex w-full flex-col items-center">
					{#if fileNames.length > 0}
						<div class="flex items-center gap-4">
							{#each fileNames as fileName}
								<div class="flex items-center gap-2">
									<button type="button" class="btn preset-filled-primary-500">
										<span>{fileName}</span>
										<CircleX onclick={() => deleteFileName(fileName)} />
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</form>
		</div>
	</div>
</main>

<!-- <style lang="postcss">
	.assistant-chat {
		@apply rounded-lg bg-primary-100 p-2;
	}

	.assistant-chat :global {
		ol {
			@apply ml-4 list-inside list-decimal;
		}
		ul {
			@apply ml-4 list-inside list-disc;
		}
		/* Code blocks */
		/* 	pre {
			@apply my-4 overflow-x-auto rounded-lg bg-surface-700 p-4;
		}
		code {
			@apply rounded bg-surface-100 px-1 py-0.5 font-mono;
		}
 */
		/* Headers */
		h1 {
			@apply mb-4 text-2xl font-bold;
		}
		h2 {
			@apply mb-3 text-xl font-bold;
		}
		h3 {
			@apply mb-2 text-lg font-bold;
		}

		/* Links */
		a {
			@apply text-primary-500 hover:underline;
		}

		/* Blockquotes */
		blockquote {
			@apply border-l-4 border-surface-500 pl-4 italic;
		}
	}
</style> -->
