<script lang="ts">
    import { Switch } from '@skeletonlabs/skeleton-svelte';

    import IconMoon from 'lucide-svelte/icons/moon';
    import IconSun from 'lucide-svelte/icons/sun';

  
    let checked = $state(false);
  
    $effect(() => {
      const mode = localStorage.getItem('mode') || 'light';
      checked = mode === 'dark';
    });
  
    const onCheckedChange = (event: { checked: boolean }) => {
      const mode = event.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-mode', mode);
      localStorage.setItem('mode', mode);
      checked = event.checked;
    };
  </script>
  
  <svelte:head>
    <script>
      const mode = localStorage.getItem('mode') || 'light';
      document.documentElement.setAttribute('data-mode', mode);
    </script>
  </svelte:head>
  
  <Switch controlActive="bg-surface-200" {checked} {onCheckedChange}>
    {#snippet inactiveChild()}<IconMoon size="14" />{/snippet}
    {#snippet activeChild()}<IconSun size="14" />{/snippet}
  </Switch>