<script lang="ts">
    import type { PageData } from '/$types'

    let { data }: { data: PageData } = $props()
    console.log(data)
</script>

<h1>Check readiness</h1>
<p>Is Weaviate Ready?: { data.ready ? 'yes' : 'no'}</p>