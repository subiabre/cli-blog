<script lang="ts">
    import { CommandShell, type CommandMatch } from "$lib/commands";
    import { getPosts } from "$lib/utils";
    import { onMount } from "svelte";
    import CommandLogs from "./CommandLogs.svelte";
    import ShellInput from "./ShellInput.svelte";
    import ShellOutput from "./ShellOutput.svelte";
    import ShellPrompt from "./ShellPrompt.svelte";
    import { afterNavigate } from "$app/navigation";
    import CommandWhoami from "./CommandWhoami.svelte";

    let commandMatches: CommandMatch[] = [];
    let commandShell = new CommandShell();

    let section: HTMLElement;
    let input: ShellInput;

    onMount(async () => {
        commandShell = new CommandShell([
            {
                name: "logs",
                help: ["List and print log files.", "Usage: logs [file]"],
                comps: (await getPosts()).map((post) => post.slug),
                component: CommandLogs,
            },
            {
                name: "whoami",
                help: ["Print info about me.", "Usage: whoami"],
                component: CommandWhoami
            }
        ]);
    });

    afterNavigate(() => {
        section.focus();
        clear();
    });

    export function focus() {
        input.focus();
        scrollToBottom();
    }

    export function clear() {
        commandMatches = [];
        scrollToTop();
    }

    function scrollToTop() {
        section.scroll({
            top: 0,
            behavior: "auto",
        });
    }

    function scrollToBottom() {
        section.scroll({
            top: section.scrollHeight,
            behavior: "auto",
        });
    }

    function handleSubmit(event: CustomEvent) {
        commandMatches = [
            ...commandMatches,
            commandShell.match(event.detail.value),
        ];

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

    {#each commandMatches as match}
        <ShellPrompt>
            {match.input.raw}
        </ShellPrompt>
        <svelte:component
            on:clear={clear}
            this={match.command.component}
            shell={match.shell}
            input={match.input}
        />
    {/each}

    <ShellPrompt>
        <ShellInput
            bind:this={input}
            on:submit={handleSubmit}
            autocompletions={commandShell.comps}
        />
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
