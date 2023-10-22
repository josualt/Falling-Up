import Shot from "./shot";

class Player extends Phaser.GameObjects.Rectangle {
    constructor (scene, x, y, number) {
      super(scene, x, y, 32, 32, 0x00ff00)
      this.setOrigin(0.5)
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.collideWorldBounds = true;
      this.setScale(1)
      this.jumping = false;
      this.invincible = false;
      this.health = 10;
      this.body.mass = 10;
      this.body.setDragY = 10;
      this.body.setAllowGravity(false )
      this.init()
    }  
    init(){
      this.SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.cursor = this.scene.input.keyboard.createCursorKeys();
      this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.scene.events.on("update", this.update, this);
    }

    update(){
      if (this.cursor.up.isDown || this.W.isDown){
        this.y = this.y - 5
      } else if (this.y < this.scene.center_height -5 && this.cursor.down.isDown || this.S.isDown){
        this.y = this.y + 5
      }
      if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
        this.shot();
      }
    }
    shot(){
    this.scene.shots.add(new Shot(this.scene, this.x +20, this.y))
    }
  }

export default Player;
  