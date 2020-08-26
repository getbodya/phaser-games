import { SceneKeys } from "../common/constants";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.PRELOAD
        });
    }

    preload(): void { }

    create(): void {
        this.scene.start(SceneKeys.START)
    }
}

