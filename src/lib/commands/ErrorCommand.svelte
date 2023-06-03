<script lang="ts">
    import type { ShellCommandInput } from ".";
    import ErrorColor from "./ErrorColor.svelte";

    export let input: ShellCommandInput;
</script>

<p>
    <ErrorColor>ERROR</ErrorColor>: command not found: {input.raw}
</p>