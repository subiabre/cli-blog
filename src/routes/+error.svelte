<script>
    import { page } from "$app/stores";
</script>

<p>
    ERROR: {$page.status}: {$page.error?.message}
</p>