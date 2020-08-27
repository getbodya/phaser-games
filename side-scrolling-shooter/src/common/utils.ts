import { SceneCoordinates } from "./interfaces";

export const getSceneCenter = (scene: Phaser.Scene): SceneCoordinates => ({
    x: scene.sys.game.canvas.width / 2,
    y: scene.sys.game.canvas.height / 2
})