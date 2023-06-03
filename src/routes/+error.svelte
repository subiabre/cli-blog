<script>
    import { page } from "$app/stores";
    import ColorError from "$lib/components/ColorError.svelte";
</script>

<p>
    <ColorError>ERROR</ColorError>: {$page.status} {$page.error?.message}: {$page.url.pathname}
</p>