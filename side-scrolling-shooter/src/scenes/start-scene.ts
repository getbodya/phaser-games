import { SceneKeys, SpriteNames } from "../common/constants";
import { getSceneCenter } from "../common/utils";

export class StartScene extends Phaser.Scene {
	private text: string = 'Tap space to start';

	constructor() {
		super({
			key: SceneKeys.START
		});
	}

	create(): void {
		this.createBackground();
		this.createText();
		this.initEvents();
	}

	createBackground(): void {
		this.add.sprite(0, 0, SpriteNames.BACKGROUND).setOrigin(0);
	}

	createText(): void {
		const { x, y } = getSceneCenter(this);
		this.add.text(x, y, this.text, {
			font: '40px Arial',
			fill: '#000'
		}).setOrigin(0.5);
	}

	initEvents() {
		this.input.keyboard.on('keydown_SPACE', () => {
			this.scene.start(SceneKeys.GAME);
		})
	}

}

