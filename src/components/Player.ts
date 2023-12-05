import {Elements} from "./Elements";

export class Player {
    constructor(speed: number) {
        this.setSpeed(speed);
    }

    setSpeed(speed: number) {
        const video = Elements.video();
        if (video !== null) {
            video.playbackRate = speed;
        }
    }
}
