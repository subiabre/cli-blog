<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let span: HTMLSpanElement;

    let value: string = "";
    let submits: string[] = [];
    let suggestions: string[] = [];
    let suggestionsCurrent: number = 0;

    $: suggestions[suggestionsCurrent] = value;

    /**
     * A list of words to be autocompleted when Tab is pressed
     */
    export let autocompletions: string[] = [];

    export function focus() {
        span.focus();
    }

    function handleSubmit() {
        dispatch("submit", { value });

        submits = [...submits, value];
        suggestions = [...submits.filter((value) => value !== ""), ""];
        suggestionsCurrent = suggestions.length - 1;

        value = "";
    }

    function handleKeydown(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                valuePrevious();
                break;
            case "ArrowDown":
                event.preventDefault();
                valueNext();
                break;
            case "Tab":
                event.preventDefault();
                valueAutocomplete();
                break;
            case "Enter":
                event.preventDefault();
                handleSubmit();
        }
    }

    function valuePrevious() {
        suggestionsCurrent =
            suggestionsCurrent === 0
                ? suggestionsCurrent
                : suggestionsCurrent - 1;

        value = suggestions[suggestionsCurrent];
    }

    function valueNext() {
        suggestionsCurrent =
            suggestionsCurrent === suggestions.length - 1
                ? suggestionsCurrent
                : suggestionsCurrent + 1;

        value = suggestions[suggestionsCurrent];
    }

    function valueAutocomplete() {
        const match = autocompletions.find((autocompletion) => {
            return autocompletion.startsWith(value);
        });

        value = match ?? value;
    }
</script>

<span
    spellcheck="false"
    autocapitalize="none"
    contenteditable="true"
    bind:this={span}
    bind:innerText={value}
    on:keydown={handleKeydown}
/>

<style>
    @keyframes blink {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    span {
        color: var(--color-text);
        outline: none;

        min-inline-size: 100px;
        writing-mode: horizontal-tb;
    }

    span::after {
        content: "\00a0 ";
        white-space: pre;
        background-color: black;
        background-color: var(--color-text);

        animation-name: blink;
        animation-duration: 0.6s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
    }
</style>
