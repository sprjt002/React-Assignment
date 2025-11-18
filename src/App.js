import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune, algorave_dave_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PlayButtons from './components/PlayButtons';
import TextArea from './components/TextArea';
import Editor from './components/Editor'
import { Preprocess } from './utils/Preprocess';
import Swal from "sweetalert2";



let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        let outputText = Preprocess({ inputText: procText, volume: volume });
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const [procText, setProcText] = useState(algorave_dave_tune)

    const [volume, setVolume] = useState(1);

    const [cpm, setCpm] = useState(120);

    const [state, setState] = useState("stop");

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume])

    const saveJson = () => {
        const projectData = {
            cpm,
            volume,
            strudelCode: procText,
        };
        // converting to JSON file
        const jsonString = JSON.stringify(projectData, null, 2);
        // saving to local storage
        localStorage.setItem("projectData", jsonString);
        //alert
        Swal.fire({
            title: "Saved",
            text: "preset saved",
            icon: "success"
        })
    };

    const loadJson = () => {
        // getting local stored data
        const jsonString = localStorage.getItem("projectData");
        if (jsonString) {
            // converting from JSON file
            const data = JSON.parse(jsonString);
            // printing to console for tests
            console.log("Loaded data:", data);

            // checking datais there
            if (data.cpm !== undefined) setCpm(data.cpm);
            if (data.volume !== undefined) setVolume(Number(data.volume));
            if (data.strudelCode !== undefined) setProcText(data.strudelCode);

            //alert
            Swal.fire({
                title: "Successful",
                text: "preset loaded",
                icon: "success"
            })
        } else {
            Swal.fire({
                title: "Error",
                text: "no preset found",
                icon: "error"
            })
        }
    };

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = algorave_dave_tune
            //SetupButtons()
            //Proc()
        }
        globalEditor.setCode(procText);

    }, [procText]);


    return (
        <div>
            <div className="app-container">
                <br />
                <h2 className="header-title" >Strudel Demo</h2>
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <button className="btn btn-outline-primary" onClick={saveJson}>Save JSON</button>
                    <button className="btn btn-outline-primary" onClick={loadJson}>Load JSON</button>
                </div>
                <main>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8" >
                                <TextArea value={procText} onChange={(e) => setProcText(e.target.value)} />
                                <br />
                            </div>
                            <div className="col-md-4">
                                <nav>
                                    <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} volumeChange={volume} onVolumeChange={(e) => setVolume(Number(e.target.value))} />
                                </nav>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: '' }}>
                                <Editor />
                            </div>
                        </div>
                    </div>
                    <canvas id="roll"></canvas>
                </main >
            </div>
        </div >
    );
}