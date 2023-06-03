<script lang="ts">
    export let logs: { data: any, slug: string }[];
</script>

<ul>
    {#each logs as log}
        <li>
            <a href="/log/{log.slug}">{log.slug}</a>
        </li>
    {/each}
</ul>
