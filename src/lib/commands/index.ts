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
    shell: CommandShell;
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
        const parsedInput = this.parse(input);
        const matchedCommand = this.list.find(c => c.name === parsedInput.args[0]);

        return {
            shell: this,
            input: parsedInput,
            command: matchedCommand || { name: "", help: [], component: CommandError }
        }
    }
}
