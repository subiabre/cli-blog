import ErrorCommand from "./ErrorCommand.svelte";

export interface ShellCommand {
    name: string;
    help: string[];
    output: ConstructorOfATypedSvelteComponent;
}

export interface ShellCommandInput {
    raw: string;
    args: string[];
}

export interface ShellCommandMatch {
    input: ShellCommandInput;
    command: ShellCommand
}

export class Shell {
    readonly list: ShellCommand[];

    constructor(list: ShellCommand[]) {
        this.list = list;
    }

    public parse(input: string): ShellCommandInput {
        return {
            raw: input,
            args: input.split(" ")
        };
    }

    public match(input: string): ShellCommandMatch {
        return {
            input: this.parse(input),
            command: this.list.find(c => c.name === input) || { name: "", help: [], output: ErrorCommand }
        }
    }
}
