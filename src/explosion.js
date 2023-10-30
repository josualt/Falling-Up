class Explosion extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, color = 0xffffff, velocity = -100) {
      super(scene, x, y, 88, 88, color)
      this.scene = scene
      this.scene.add.existing(this)
      this.init()
    }
    init(){
      this.scene.tweens.add({
        targets: this,
        scale: { from: 1, to: 0 },
        duration: 1000,
        onComplete: () => { 
          this.scene.finishScene();
          this.destroy() 
        }
      })
    }
  }
  export default Explosion