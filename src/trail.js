class Trail extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, color = 0xffffff, velocity = -100) {
      super(scene, x, y, 8, 8, color)
      this.scene = scene
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this)
      this.body.allowGravity = false
      this.body.setVelocityX(velocity)
      this.init()
    }
    init(){
      this.scene.tweens.add({
        targets: this,
        scale: { from: 1, to: 0 },
        duration: 1000,
        onComplete: () => { this.destroy() }
      })
    }
  }
  export default Trail