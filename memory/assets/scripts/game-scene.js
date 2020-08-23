class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.image('bg', 'assets/image/background.png');
        this.load.image('card', 'assets/image/card.png');

        this.load.image('card1', 'assets/image/card1.png');
        this.load.image('card2', 'assets/image/card2.png');
        this.load.image('card3', 'assets/image/card3.png');
        this.load.image('card4', 'assets/image/card4.png');
        this.load.image('card5', 'assets/image/card5.png');

        this.load.audio('theme', 'assets/sounds/theme.mp3');
        this.load.audio('card', 'assets/sounds/card.mp3');
        this.load.audio('complete', 'assets/sounds/complete.mp3');
        this.load.audio('success', 'assets/sounds/success.mp3');
        this.load.audio('timeout', 'assets/sounds/timeout.mp3');

    }

    create() {
        this.timeout = config.timeout;

        this.createSounds();
        this.createTimer();
        this.createBackground();
        this.createText();
        this.createCards();
        this.start();
    }

    restart() {
        let cardDestroyedCount = 0;
        const onCardDestroyed = () => {
            cardDestroyedCount++;
            if (cardDestroyedCount >= this.cards.length) {
                this.start()
            }
        }
        this.cards.forEach(card => card.destroyCard(onCardDestroyed));
    }

    start() {
        this.timeout = config.timeout;
        this.timer.paused = false;
        this.openedCard = null;
        this.openedCardCount = 0;
        this.initCards();
        this.showCards();
    }

    createSounds() {
        this.sounds = {
            card: this.sound.add('card'),
            theme: this.sound.add('theme'),
            complete: this.sound.add('complete'),
            success: this.sound.add('success'),
            timeout: this.sound.add('timeout')
        };
        this.sounds.theme.play({
            volume: 0.01
        });
    }

    initCards() {
        let positions = this.getCardPositions();
        this.cards.forEach(card => {
            card.init(positions.pop());
        })
    }

    showCards() {
        this.cards.forEach((card, i) => card.moveToPosition(i * 50))
    }

    createTimer() {
        this.timer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.onTimerTick,
            callbackScope: this
        })
    }

    onTimerTick() {
        this.timeoutText.setText(`Time: ${this.timeout}`);
        if (this.timeout <= 0) {
            this.timer.paused = true;
            this.sounds.timeout.play();
            this.restart();
        } else {
            --this.timeout;
        }
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }

    createText() {
        this.timeoutText = this.add.text(10, 330, '', {
            font: '32px Arial',
            fill: '#fff'
        })
    }

    createCards() {
        this.cards = [];
        for (let value of config.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value))
            }
        }

        this.input.on('gameobjectdown', this.onCardClicked, this)
    }

    onCardClicked(pointer, card) {
        if (card.isOpen) {
            return;
        }

        if (this.openedCard) {
            if (this.openedCard.value === card.value) {
                this.openedCard = null;
                this.openedCardCount++;
                this.sounds.success.play();
            } else {
                this.openedCard.close();
                this.openedCard = card;
            }
        } else {
            this.openedCard = card;
        }

        card.open();

        if (this.openedCardCount === this.cards.length / 2) {
            this.sounds.complete.play();
            this.restart();
        }
    }

    getCardPositions() {
        let positions = [];
        let delay = 0;
        const { width, height } = this.textures.get('card').getSourceImage();
        const margin = 5;
        const cardWidth = width + margin;
        const cardHeight = height + margin;

        const offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + cardWidth / 2;
        const offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + cardHeight / 2;

        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    delay: delay * 50,
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight
                });
                delay++;
            }
        }
        return Phaser.Utils.Array.Shuffle(positions);
    }

}