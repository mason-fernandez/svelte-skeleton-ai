<script lang="ts">
    import { FileUpload, type FileUploadApi } from '@skeletonlabs/skeleton-svelte';
    let isSubmitted = false

    let apiRef: FileUploadApi;

    function handleSubmit() {
        isSubmitted = true
        console.log('Submitting form...')
    }

</script>

<div class="flex flex-col items-center justify-start">
    <form class="flex flex-col gap-4" method="POST" action="/chat?/uploadFile" enctype="multipart/form-data" onsubmit={handleSubmit}>
        <p class="opacity-60">Choose the <code class="code">.pdf</code> file that you would like to upload</p>
        <section class="w-full space-y-4">
            <FileUpload name="file" accept=".pdf" maxFiles={1} bind:internalApi={apiRef} />
            <div class="flex justify-end gap-2">
                <button type="button" class="btn preset-filled" onclick={apiRef.clearFiles}>Clear</button>
                <button class="btn preset-filled-primary-200-800" type="submit">Upload</button>
            </div>
          </section>
    </form>
</div>
