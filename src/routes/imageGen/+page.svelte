<script lang="ts">
	import ImageGenerator from '$lib/components/ImageGen.svelte'
</script>

<svelte:head>
	<title>Generate AI Images | Future Image</title>
</svelte:head>

<main class="flex flex-col flex-wrap justify-center gap-4 p-4">
	<div class="bg-surface-100-900 m-auto w-1/2 gap-4 rounded p-4">
		<h1 class="text-primary-700 mb-6 text-center text-3xl font-bold">AI Image Generator</h1>

		<p class="mb-8 text-center text-lg text-gray-600">
			Create stunning AI-generated images from text prompts using Gemma 3
		</p>

		<ImageGenerator />

		<div class="mt-12 text-center">
			<a href="/images" class="text-primary-600 hover:underline"> View your image collection </a>
		</div>
	</div>
</main>
