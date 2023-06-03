<script lang="ts">
    import "../app.css";
    import ShellWindow from "$lib/components/ShellWindow.svelte";
</script>

<main>
    <ShellWindow>
        <slot />
    </ShellWindow>
</main>

<style>
    main {
        height: 100svh;

        color: var(--color-text);
        background-color: var(--color-background);
    }
</style>
