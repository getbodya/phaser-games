class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
        this.setInteractive();
        this.isOpen = false;
    }

    flip(callback) {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 100,
            onComplete: () => {
                callback();
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    ease: 'Linear',
                    duration: 100
                })
            }
        })
    }

    init(position) {
        this.position = position;
        this.close();
        this.setPosition(-this.width, -this.height)
    }

    moveToPosition() {
        const { x, y, delay } = this.position;
        this.scene.tweens.add({
            targets: this,
            ease: 'Linear',
            duration: 100,
            delay,
            x,
            y
        })
    }

    destroyCard(callback) {
        this.scene.tweens.add({
            targets: this,
            ease: 'Linear',
            duration: 100,
            delay: this.position.delay,
            x: this.scene.sys.game.config.width + this.width,
            y: this.scene.sys.game.config.height + this.height,
            onComplete: () => {
                if (callback) {
                    callback();
                }
            }
        })
    }

    open() {
        this.flip(() => {
            this.scene.sounds.card.play();
            this.isOpen = true;
            this.setTexture(`card${this.value}`);
        })
    }

    close() {
        if (this.isOpen) {
            this.flip(() => {
                this.isOpen = false;
                this.setTexture(`card`);
            })
        }
    }
}