<script lang="ts">
	import { ScanSearch } from 'lucide-svelte'
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'
	import { invalidateAll } from '$app/navigation'

	// Converting props to $props rune
	const { data, form } = $props<{ data: PageData; form: ActionData }>()

	let selectedFile: File | null = null
	let previewUrl = $state<string | null>(null)
	let loading = $state(false)

	// Get existing images from server data
	let images = data.images || []

	const maxSizeInBytes = 10 * 1024 * 1024 // 10MB

	// Handle file selection
	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement
		if (!input.files?.length) {
			selectedFile = null
			previewUrl = null
			return
		}
		// Check if the file is too large
		selectedFile = input.files[0]
		if (selectedFile.size > maxSizeInBytes) {
			alert('File is too large. Maximum size is 5MB.')
			input.value = '' // Clear the input
			return
		}

		// Create a preview URL for the selected image
		if (selectedFile && selectedFile.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = (e) => {
				previewUrl = (e.target?.result as string) || null
			}
			reader.readAsDataURL(selectedFile)
		}
	}

	// Reset the form
	function resetForm() {
		selectedFile = null
		previewUrl = null
		const fileInput = document.getElementById('image-upload') as HTMLInputElement
		if (fileInput) fileInput.value = ''
	}

	// Converting reactive statement to $effect rune
	$effect(() => {
		if (images.length > 0) {
			console.log('First few images:', images.slice(0, 3))
		}
	})
</script>

<svelte:head>
	<title>Image Upload | AI Image Collection</title>
</svelte:head>

<main class="flex flex-col flex-wrap justify-center gap-4 p-4">
	<div class="bg-surface-900 m-auto w-1/2 gap-4 rounded p-4">
		<div class="grid grid-cols-3">
			<div></div>
			<h1 class="h2 mx-auto pb-4">
				{#if data.searchPerformed}
					Search Results: "{data.searchQuery}"
				{:else}
					Image Gallery
				{/if}
			</h1>
			<a href="/search" class="btn preset-tonal-primary mb-4 ml-auto">
				<p class="h6">Scan Search</p>
				<ScanSearch size={32} />
			</a>
		</div>

		
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			<div class="bg-surface-700 rounded-lg p-4 shadow-lg">	
				<form
					method="POST"
					action="?/imageToBase64"
					enctype="multipart/form-data"
					use:enhance={() => {
						loading = true
	
						return async ({ update }) => {
							await update()
							invalidateAll()
							if (form?.success) {
								resetForm()
								 // Add this line to refresh the page data
							}
							loading = false
						}
					}}
					class="space-y-4">
					<div>
						<label for="image-upload" class="mb-1 block text-sm font-medium">
							Select Image
						</label>
						<input
							type="file"
							id="image-upload"
							name="image"
							accept="image/*"
							required
							onchange={handleFileSelect}
							class="file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 block
								   w-full text-sm text-gray-400
								   file:mr-4 file:rounded-md
								   file:border-0 file:px-4
								   file:py-2 file:text-sm
								   file:font-semibold" />
					</div>
					
					{#if previewUrl}
						<div class="mt-4">
							<p class="mb-1 text-sm font-medium">Preview</p>
							<div class="rounded-md border p-2">
								<img
									src={previewUrl}
									alt="Preview"
									class="mx-auto max-h-60 max-w-full object-contain" />
							</div>
						</div>
					{/if}

					<div>
						<label for="title" class="mb-1 block text-sm font-medium">
							Image Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="Enter a descriptive title"
							required
							class="focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none" />
					</div>

	
					<button
						type="submit"
						disabled={loading}
						class="bg-primary-600 hover:bg-primary-700 w-full rounded-md px-4 py-2 font-bold text-white transition duration-200 disabled:bg-gray-400">
						{loading ? 'Uploading...' : 'Upload Image'}
					</button>
	
					{#if form}
						<div
							class={`mt-4 rounded-md p-3 ${form.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
							{form.message}
						</div>
					{/if}
				</form>
			</div>
			{#if images.length > 0}
					{#each images as image}
						<div class="rounded-md border p-2 transition-shadow hover:shadow-md">
							{#if image.thumbnailUrl}
								{@const debugUrl = image.thumbnailUrl}
								{@const showDebug = () => console.log('Thumbnail URL:', debugUrl)}
								<img
									src={image.thumbnailUrl}
									alt={image.title}
									class="h-50 w-full rounded object-cover"
									loading="lazy"
									onerror={() => console.error(`Failed to load thumbnail: ${image.thumbnailUrl}`)}
									onload={showDebug} />
							{:else}
								<div class="flex h-40 items-center justify-center rounded bg-gray-200">
									<div class="text-gray-500">[No thumbnail: {JSON.stringify(image)}]</div>
								</div>
							{/if}
							<p class="mt-2 truncate text-center font-medium">{image.title}</p>
						</div>
					{/each}
			{:else}
				<p class="text-gray-500">No images uploaded yet. Add your first image above!</p>
			{/if}
		</div>
	</div>
</main>
