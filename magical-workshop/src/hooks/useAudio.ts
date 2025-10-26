import { Howl } from 'Howler';

let ambientSound: Howl | null = null;
let clickSound: Howl | null = null;
let chimeSound: Howl | null = null;
let bubblePopSound: Howl | null = null;

const useAudio = () => {
    const initAmbient = () => {
        ambientSound = new Howl({
            src: ['/sounds/forest-ambience.mp3'],
            loop: true,
            volume: 0.25,
            html5: true,
        });
        ambientSound.play();
    };

    const playClick = () => {
        if (!clickSound) {
            clickSound = new Howl({
                src: ['/sounds/click.mp3'],
                volume: 0.6,
            });
        }
        clickSound.play();
    };

    const playChime = () => {
        if (!chimeSound) {
            chimeSound = new Howl({
                src: ['/sounds/chime.mp3'],
                volume: 0.8,
            });
        }
        chimeSound.play();
    };

    const playBubblePop = () => {
        if (!bubblePopSound) {
            bubblePopSound = new Howl({
                src: ['/sounds/bubble-pop.mp3'],
                volume: 0.7,
            });
        }
        bubblePopSound.play();
    };

    return {
        initAmbient,
        playClick,
        playChime,
        playBubblePop,
    };
};