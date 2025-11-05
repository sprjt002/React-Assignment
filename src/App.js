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
import DJcontrols from './components/DJcontrols';
import PlayButtons from './components/PlayButtons';
import TextArea from './components/TextArea';
import Editor from './components/Editor'
import { Preprocess } from './utils/Preprocess';




let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//export function SetupButtons() {

//    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    document.getElementById('process').addEventListener('click', () => {
//        Proc()
//    }
//    )
//    document.getElementById('process_play').addEventListener('click', () => {
//        if (globalEditor != null) {
//            Proc()
//            globalEditor.evaluate()
//        }
//    }
//    )
//}



//export function ProcAndPlay() {
//    if (globalEditor != null && globalEditor.repl.state.started == true) {
//        console.log(globalEditor)
//        Proc()
//        globalEditor.evaluate();
//    }
//}

//export function Proc() {

//    let proc_text = document.getElementById('proc').value
//    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//    ProcessText(proc_text);
//    globalEditor.setCode(proc_text_replaced)
//}

//export function ProcessText(match, ...args) {

//    let replace = ""
//    //if (document.getElementById('flexRadioDefault2').checked) {
//    //    replace = "_"
//    //}

//    return replace
//}

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

    const [state, setState] = useState("stop");

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume])

    //function saveJson() {
    //    let projectData = {
    //        cpm: cpm,
    //        volume: volume,
    //        strudelCode = strudelCode
    //    }

    //    JSONString = JSON.stringify(projectData);
    //    localStorage.setItem('projectData', JSONString);
    //}

    //function loadJson() {
    //    const JSONString = localStorage.getItem('projectData');
    //    if (JSONString) {
    //        const data = JSON.parse(JSONString);
    //        setCpm(data.cpm);
    //        // the rest
    //    }
        
    //}

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
            <h2 className="header-title" >Strudel Demo</h2>
            <button class="btn btn-primary">Save JSON</button>
            <button class="btn btn-primary">Load JSON</button>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" >
                            <TextArea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                            <br />
                        </div>
                        <div className="col-md-4">

                            <nav>
                                <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: '' }}>
                            <Editor />
                        </div>
                        <div className="col-md-4">
                            <DJcontrols volumChange={volume} onVolumeChange={(e) => setVolume(e.target.value)} />
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div>
    </div >
);


}