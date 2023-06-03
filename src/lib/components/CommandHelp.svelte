<script lang="ts">
    import type { CommandInput, CommandShell } from "$lib/commands";
    import ColorInfo from "./ColorInfo.svelte";

    export let shell: CommandShell;
    export let input: CommandInput;

    const commands = shell.list;
    const command = shell.list.find(
        (command) => command.name === input.args[1]
    );
</script>

{#if command}
    {#each command.help as help}
        <p>{help}</p>
    {/each}
{:else}
    <p>Type <ColorInfo>help</ColorInfo> [command] to see details about any command.</p>
    <p>Available commands:</p>
    <ul>
        {#each commands as command}
            <li>
                <ColorInfo>{command.name}</ColorInfo> - {command.help[0]}
            </li>
        {/each}
    </ul>
{/if}
