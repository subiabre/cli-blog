<script lang="ts">
    import "../../../styles/posts.css";
    import ShellPrompt from "$lib/components/ShellPrompt.svelte";

    export let data;

    function formatDate(date: Date): string {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        let mm = `${month}`;
        if (month < 10) {
            mm = `0${month}`;
        }

        let dd = `${day}`;
        if (day < 10) {
            dd = `${day}`;
        }

        return `${year}-${mm}-${dd}`;
    }
</script>

<ShellPrompt>logs {data.slug}</ShellPrompt>
<article>
    <header>
        <h1>
            <span>{data.metadata.title}</span>
        </h1>
        <p>date: {formatDate(data.metadata.date)}</p>
    </header>
    <svelte:component this={data.content} />
</article>
