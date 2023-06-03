<script lang="ts">
    import { onMount } from "svelte";
    import ShellInput from "$lib/components/ShellInput.svelte";
    import ShellPrompt from "$lib/components/ShellPrompt.svelte";

    let input: ShellInput;

    onMount(() => input.focus());
</script>

<ShellPrompt>
    <ShellInput bind:this={input} />
</ShellPrompt>
