import CommandHelp from "$lib/components/CommandHelp.svelte";
import type { Command } from ".";

export const help: Command = {
    name: "help",
    help: ["Display help about commands.", "Usage: help [command]"],
    component: CommandHelp
}
