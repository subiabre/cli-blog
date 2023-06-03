import CommandError from "$lib/components/CommandError.svelte";

export interface Command {
    name: string;
    help: string[];
    component: ConstructorOfATypedSvelteComponent;
}

export interface CommandInput {
    raw: string;
    args: string[];
}

export interface CommandMatch {
    input: CommandInput;
    command: Command
}

export class CommandShell {
    readonly list: Command[];

    constructor(list: Command[]) {
        this.list = list;
    }

    public parse(input: string): CommandInput {
        return {
            raw: input,
            args: input.split(" ")
        };
    }

    public match(input: string): CommandMatch {
        return {
            input: this.parse(input),
            command: this.list.find(c => c.name === input) || { name: "", help: [], component: CommandError }
        }
    }
}
