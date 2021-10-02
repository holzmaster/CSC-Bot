// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

// Dependencies
import parseOptions from "minimist";
import type { Client, Message } from "discord.js";

/**
 * Sends instructions on how to ask better questions
 */
export const run = async(client: Client, message: Message, args: string[]): Promise<string | void> => {
    // parse options
    let options = parseOptions(args, {
        "boolean": [
            "english"
        ],
        alias: {
            english: "e"
        }
    });

    if (args.length === 0 || (args.length === 1 && options.english)) {
        // insult collections, feel free to expand
        let germanInsults: string[] = [
            "du Sohn einer ranzigen Hafendirne!",
            "möge dich der Blitz beim scheißen treffen!",
            "du verdammter Troglodyt!",
            "sonst muss ich heute Nacht noch deine Mama besuchen!"
        ];
        let englishInsults: string[] = [
            "you fucking imbecile!",
            "retard!",
            "you troglodyte!"
        ];
        // by default, just pick the first or a fixed insult, just in case
        let choice: number = 0;
        let insult: string = "Idiot!";

        if (!options.english) {
            // insult user, then explain meta questions
            choice = Math.max(choice, Math.floor(Math.random() * germanInsults.length));
            insult = germanInsults[choice];
            await message.channel.send(`
            Hör auf, Metafragen zu stellen, ${insult}
            Das ist reine Zeitverschwendung und hindert uns nur daran, ~~uns zu beleidigen~~ an echten Problemen zu arbeiten.
            Für Tipps zum besser machen: <https://metafrage.de>
            `);
        }
        else {
            // insult user, then explain meta questions - but this time in english!
            choice = Math.max(choice, Math.floor(Math.random() * englishInsults.length));
            insult = englishInsults[choice];

            await message.channel.send(`
            Stop asking meta questions, ${insult}
            It's a waste of time and stops us from ~~insulting each other~~ working on real problems.
            Here's a few hints on how to do it better: <https://metaquestion.net>
            `);
        }
    }
    else {
        await message.channel.send(`
        Bruder, es gibt genau eine Option und die heißt -e! Versuch gar nicht erst, mich zu verarschen!
        `);
    }
};

export const description = "Weist freundlich darauf hin, keine Metafragen zu stellen. -e für englischsprachige Hurensöhne.";
