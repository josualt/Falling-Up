import Trail from "./trail";
class Shot extends Phaser.GameObjects.Rectangle {
    constructor (scene, x, y) {
        super(scene, x, y, 16, 16, 0xff0000);
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.init();
        this.body.setVelocityX(300)
    }
    
    init(){
        this.scene.tweens.add({
            targets: this,
            scale: {from: .9, to: 1},
            duration: 300,
            repeat: -1,
            yoyo: true 
        })
        this.scene.events.on("update", this.update, this);
    }
    update(){
        new Trail(this.scene, this.x-8, this.y)
    }
}
export default Shot;