import { SpriteNames, SceneKeys } from '../common/constants';
import { PATH_TO_BACKGROUND } from '../common/assets-path';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.BOOT
        });
    }

    preload(): void {
        this.load.image(SpriteNames.BACKGROUND, PATH_TO_BACKGROUND)
    }

    create(): void {
        this.scene.start(SceneKeys.PRELOAD)
    }
}

