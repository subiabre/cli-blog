<script lang="ts">
    import ShellPrompt from "$lib/components/ShellPrompt.svelte";

    export let data;
</script>

<ShellPrompt path="/log">ls</ShellPrompt>
<ul>
    {#each data.posts as post}
        <li>
            <a href="/log/{post.slug}">{post.slug}</a>
        </li>
    {/each}
</ul>
