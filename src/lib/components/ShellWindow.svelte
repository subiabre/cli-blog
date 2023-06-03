<script lang="ts">
    import { Shell, type ShellCommandMatch } from "$lib/commands";
    import ShellInput from "./ShellInput.svelte";
    import ShellOutput from "./ShellOutput.svelte";
    import ShellPrompt from "./ShellPrompt.svelte";

    let shell = new Shell([]);
    let matches: ShellCommandMatch[] = [];

    let section: HTMLElement;
    let input: ShellInput;

    export function focus() {
        input.focus();
        scrollToBottom();
    }

    function scrollToBottom() {
        section.scroll({
            top: section.scrollHeight,
            behavior: "auto",
        });
    }

    function handleSubmit(event: CustomEvent) {
        matches = [...matches, shell.match(event.detail.value)];
        setTimeout(() => focus());
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey) return;
        if (event.isComposing) return;

        switch (event.key) {
            case "Alt":
            case "ArrowUp":
            case "ArrowDown":
                break;
            default:
                focus();
                break;
        }
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<section tabindex="0" on:keydown={handleKeyDown} bind:this={section}>
    <ShellOutput>
        <slot />
    </ShellOutput>

    {#each matches as match}
        <ShellPrompt>
            {match.input.raw}
        </ShellPrompt>
        <svelte:component this={match.command.output} input={match.input} />
    {/each}

    <ShellPrompt>
        <ShellInput bind:this={input} on:submit={handleSubmit} />
    </ShellPrompt>
</section>

<style>
    section {
        height: calc(100% - calc(var(--shell-window-padding) * 2));
        padding: var(--shell-window-padding);

        overflow-y: scroll;
        scroll-behavior: auto;
    }
</style>
