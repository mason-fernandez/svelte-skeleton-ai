<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton-svelte';
  import ArrowLeft from 'lucide-svelte/icons/arrow-left';
  import Paperclip from 'lucide-svelte/icons/paperclip';
  import Calendar from 'lucide-svelte/icons/calendar';
  import CircleUser from 'lucide-svelte/icons/circle-user';
  import Github from 'lucide-svelte/icons/github';
</script>
  
<AppBar>
  {#snippet lead()}
    <CircleUser size={32} />
    <span>370 AI App</span>
    <div class="flex gap-2">
      <button type="button" class="btn preset-filled-primary-500">Home</button>
      <button type="button" class="btn preset-tonal-primary">Chatbot</button>
      <button type="button" class="btn preset-outlined-primary-500">Weaviate</button>
    </div>
  {/snippet}
  {#snippet trail()}
    <Github size={20} />
  {/snippet}
</AppBar>