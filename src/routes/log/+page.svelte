<script lang="ts">
    import LogListing from "$lib/components/LogListing.svelte";
    import ShellPrompt from "$lib/components/ShellPrompt.svelte";

    export let data;
</script>

<ShellPrompt>
    logs
</ShellPrompt>
<LogListing logs={data.posts} />
