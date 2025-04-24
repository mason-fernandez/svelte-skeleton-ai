<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'
	import type { ActionResult } from '@sveltejs/kit'
	import { CircleArrowLeft, Search } from 'lucide-svelte'

	interface SearchResultImage {
		id: string
		title: string
		thumbnailUrl: string
		matchScore: number | null
		distance: number | undefined
		rank: number
	}

	const props = $props<{ data: PageData; form: ActionData }>()

	// Track search state
	let searchPerformed = $state(false)
	let searchQuery = $state('')
	let results = $state<SearchResultImage[]>([])

	function processSubmit() {
		return async ({ result }: { result: ActionResult }) => {
			console.log('Form submission result:', result)
			if (result.type === 'success' && result.data) {
				searchPerformed = true
				searchQuery = result.data.searchQuery || ''

				// Ensure we have an array of properly typed objects
				if (Array.isArray(result.data.images)) {
					results = result.data.images.map((img: any) => ({
						id: img.id || '',
						title: img.title || 'Untitled',
						thumbnailUrl: img.thumbnailUrl || '',
						...img // Include any other properties
					}))
				} else {
					results = []
				}

				console.log(`Got ${results.length} results for "${searchQuery}"`)
			}
		}
	}
</script>

<main class="flex flex-col flex-wrap justify-center gap-4 p-4">
	<div class="bg-surface-100-900 m-auto w-1/2 gap-4 rounded p-4">
		<div class="grid grid-cols-3">
			<a href="/images" class="btn mt-2 mr-auto p-2">
				<CircleArrowLeft size={32} />
				<p class="p">Gallery</p>
			</a>
			<h1 class="h2 mx-auto flex justify-center py-2">Scan Search</h1>
			<div></div>
		</div>
		<div class="rounded-lg">
			<form
				method="POST"
				action="?/imageSearch"
				use:enhance={processSubmit}
				class="flex justify-start py-4">
				<div class="flex-grow">
					<input
						type="text"
						name="query"
						placeholder="Search for images"
						class="w-full rounded-lg border-2 border-gray-300 p-2" />
				</div>
				<button type="submit" class="bg-primary-500 ml-2 rounded-lg p-2 font-bold text-white"
					>Search</button>
			</form>
		</div>

		<div>
			<h4 class="h4 font-medium">Results</h4>
			<ul>
				{#each results as result, i}
					<li
						class="bg-surface-800 my-4 grid grid-cols-3 place-content-center space-x-4 rounded-lg">
						<div class="align-center flex p-4">
							<span
								class="bg-primary-100 text-primary-800 mr-4 flex h-8 w-8 items-center justify-center rounded-full align-top font-bold">
								{i + 1}
							</span>
							<img src={result.thumbnailUrl} alt={result.title} class="h-32 w-32 rounded-md" />
						</div>
						<p class="py-4">Title: {result.title}</p>
						<p class="py-4">Distance: {result.distance}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</main>
