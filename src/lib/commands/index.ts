import CommandError from "$lib/components/CommandError.svelte";
import CommandHelp from "$lib/components/CommandHelp.svelte";

export interface Command {
    name: string;
    help: string[];
    comps?: string[];
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
    readonly comps: string[];

    constructor(commands: Command[] = []) {
        this.list = this.compileCommands(commands);
        this.comps = this.compileAutocompletions(this.list);
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

    private compileCommands(commands: Command[]): Command[] {
        return [
            ...commands,
            {
                name: "help",
                help: ["Display help about commands.", "Usage: help [command]"],
                component: CommandHelp
            }
        ];
    }

    public compileAutocompletions(commands: Command[]): string[] {
        let comps: string[] = [];

        commands.map(c => {
            comps = [
                ...comps,
                c.name,
                ...c.comps?.map(comp => `${c.name} ${comp}`) || []
            ]
        });

        return comps;
    }
}
