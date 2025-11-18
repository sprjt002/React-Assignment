export function Preprocess({ inputText, volume, cpm, checkboxStates }) {


    let outputText = inputText + "\n//Hello, this is a test";

    outputText += `\n//all(x => x.gain(${volume}))`;

    outputText = outputText.replaceAll("{$VOLUME}", volume);
    outputText = outputText.replaceAll("{$CPM}", cpm); // cpm replacement
    outputText = outputText.replaceAll("{$S1}", checkboxStates?.s1 ? "1" : "0");
    outputText = outputText.replaceAll("{$D1}", checkboxStates?.d1 ? "1" : "0");
    outputText = outputText.replaceAll("{$D2}", checkboxStates?.d2 ? "1" : "0");


    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;
    let matches = [];

    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            // console.log(`Found match, group ${groupIndex}: ${match}`);
            matches.push(match);
        });
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]), outputText
    );

    console.log(matches3);

    return matches3;
}
