<script>
    import ShellPrompt from "$lib/components/ShellPrompt.svelte";

    export let data;
</script>

<ShellPrompt>logs {data.slug}</ShellPrompt>
<article>
    <h1>{ data.metadata.title }</h1>
    <p>Published: {data.metadata.date}</p>
    <svelte:component this={data.content} />
</article>