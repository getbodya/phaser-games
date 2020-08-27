import { SceneKeys, SpriteNames } from "../common/constants";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.GAME
        });
    }

    create(): void {
        this.createBackground()
    }

    createBackground(): void {
        this.add.sprite(0, 0, SpriteNames.BACKGROUND).setOrigin(0);
    }
}

