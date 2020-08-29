import { SceneKeys, SpriteNames } from "../common/constants";
import { PATH_TO_DRAGON_PNG, PATH_TO_DRAGON_JSON } from "../common/assets-path";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.PRELOAD
        });
    }

    preload(): void {
        this.load.atlas(SpriteNames.DRAGON, PATH_TO_DRAGON_PNG, PATH_TO_DRAGON_JSON)
    }

    create(): void {
        this.scene.start(SceneKeys.START)
    }
}

