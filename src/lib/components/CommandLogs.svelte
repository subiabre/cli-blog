<script lang="ts">
    import { onMount } from "svelte";
    import type { CommandInput } from "$lib/commands";
    import { goto } from "$app/navigation";
    import { getPosts } from "$lib/utils";

    export let input: CommandInput;

    onMount(async () => {
        if (input.args.length === 1) {
            goto(`/log`);
        }

        const logs = await getPosts();
        if (logs.map(log => log.slug).includes(input.args[1])) {
            goto(`/log/${input.args[1]}`);
        }
    });
</script>
