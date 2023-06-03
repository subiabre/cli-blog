<script lang="ts">
    import type { CommandInput } from "$lib/commands";
    import ErrorColor from "./ColorError.svelte";

    export let input: CommandInput;
</script>

<p>
    <ErrorColor>ERROR</ErrorColor>: command not found: {input.raw}
</p>