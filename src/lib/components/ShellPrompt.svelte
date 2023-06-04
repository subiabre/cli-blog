<script lang="ts">
    import { page } from "$app/stores";

    export let user: string = "guest";
    export let path: string = "/";
</script>

<div>
    <div class="prompt">
        <span class="who">{user}@{$page.url.host}</span>:<span class="cwd">~{path}</span>$
    </div>
    <slot />
</div>

<style>
    .prompt {
        display: inline;
        line-break: anywhere;
    }

    .who {
        color: var(--shell-prompt-color-user);
    }

    .cwd {
        color: var(--shell-prompt-color-path);
    }
</style>
