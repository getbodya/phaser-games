import { SpriteNames } from "../common/constants";
import { GameScene } from "../scenes";

export class Hero extends Phaser.GameObjects.Sprite {
    private scene: GameScene;
    private velocity: number = 500;
    constructor(scene: GameScene) {
        //@ts-ignore
        super(scene, 150, scene.sys.game.config.height / 2, SpriteNames.DRAGON, SpriteNames.DRAGON1);
        this.scene = scene;
        this.init();
    }
    init(): void {
        //@ts-ignore
        this.scene.add.existing(this);
        //@ts-ignore
        this.scene.physics.add.existing(this);
        //@ts-ignore
        this.body.enable = true;
    }

    move() {
        //@ts-ignore
        this.body.setVelocity(0)
        if (this.scene.cursors.left.isDown) {
            //@ts-ignore
            this.body.setVelocityX(-this.velocity);
        }
        if (this.scene.cursors.right.isDown) {
            //@ts-ignore
            this.body.setVelocityX(this.velocity);
        }
        if (this.scene.cursors.up.isDown) {
            //@ts-ignore
            this.body.setVelocityY(-this.velocity);
        }
        if (this.scene.cursors.down.isDown) {
            //@ts-ignore
            this.body.setVelocityY(this.velocity);
        }
    }
}