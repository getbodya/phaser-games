import { SceneKeys, SpriteNames } from "../common/constants";
import { Hero } from '../prefabs';

export class GameScene extends Phaser.Scene {
    private hero: Hero;
    public cursors: any;
    private bg: Phaser.GameObjects.TileSprite;
    private width: number;
    private height: number;
    constructor() {
        super({
            key: SceneKeys.GAME
        });
    }
    init(): void {
        this.cursors = this.input.keyboard.createCursorKeys();
        //@ts-ignore
        this.height = this.sys.game.config.height;
        //@ts-ignore
        this.width = this.sys.game.config.width;
    }
    create(): void {
        this.createBackground();
        this.hero = new Hero(this);
    }
    update(): void {
        this.hero.move();
        this.scrollBackground();
    }
    createBackground(): void {
        this.bg = this.add.tileSprite(0, 0, this.width, this.height, SpriteNames.BACKGROUND);
        this.bg.setOrigin(0);
    }
    scrollBackground(): void {
        this.bg.tilePositionX += 1;
    }
}

