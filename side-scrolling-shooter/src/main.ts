import 'phaser';

import { StartScene, BootScene, PreloadScene } from './scenes';


const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  scene: [
    BootScene,
    PreloadScene,
    StartScene
  ]
};

new Phaser.Game(config);
