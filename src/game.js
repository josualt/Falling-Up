import {Player, Player2} from "./player";
import Generator from "./generator";
import Explosion from "./explosion";
export default class Game extends Phaser.Scene {
    constructor () {
        super({ key: "game" });
        this.player = null;
        this.score = 0;
        this.scoreText = null;
    }

    init (data) {
      this.name = data.name;
      this.number = data.number;
  }

    preload () {
      this.registry.set("score", "0")
        this.load.audio("explosion", "assets/sounds/explosion.mp3");
        this.load.audio("pistol-shot", "assets/sounds/pistol-shot.mp3");
        this.load.audio("coin", "assets/sounds/coin.mp3");
        this.load.audio("jump", "assets/sounds/jump.mp3");
        this.load.audio("linder", "assets/sounds/linder.mp3");
        this.load.audio("theme", "assets/sounds/theme.mp3");
        this.load.spritesheet('coin', './assets/images/coin.png',{ frameWidth: 32, frameHeight: 32 })
        this.load.bitmapFont("arcade", "assets/fonts/arcade.png", "assets/fonts/arcade.xml");
        this.score = 0;
        this.load.image('spaceship', 'assets/images/spaceship.png')
        this.load.image('spaceship2', 'assets/images/spaceship2.png')
    }

    create () {
      this.width = this.sys.game.config.width;
      this.height = this.sys.game.config.height;
      this.center_width = this.width / 2;
      this.center_height = this.height / 2;

      this.cameras.main.setBackgroundColor(0x87ceeb);
      this.obstacles = this.add.group();
      this.coins = this.add.group();
      this.shots = this.add.group();
      this.players = this.add.group();
      this.generator = new Generator(this);
      this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.hell = this.add.rectangle(0, this.center_height, this.width, this.center_height, 0xffff00 ).setOrigin(0)
      this.player = new Player(this, this.center_width - 100, this.height - 200)
      this.player2 = new Player2(this, this.center_width - 100, this.height -100);
      this.players.add(this.player)
      this.players.add(this.player2)
      this.scoreText = this.add.bitmapText(this.center_width, 10, "arcade", this.score, 20)
      this.coinText = this.add.bitmapText(100, 10, "arcade", this.score, 20)
      this.physics.add.collider(this.players, this.obstacles, this.hitObstacle, ()=>{
        return true;
      }, this);

      this.physics.add.overlap(this.players, this.coins, this.hitCoin, ()=>{
        return true;
      }, this);
      this.physics.add.overlap(this.obstacles, this.shots, this.killObstacle, ()=>{
        return true;
      }, this);
      this.loadAudios(); 
      //this.playMusic();

      this.input.on('pointerdown', (pointer) => this.jump(), this);
      this.updateScoreEvent = this.time.addEvent({ delay: 100, callback: () => this.updateScore(), callbackScope: this, loop: true });
    }

    killObstacle (obstacle, shot) {
      shot.destroy()
      obstacle.destroy()
    }

    hitObstacle (player, obstacle) {
      this.updateScoreEvent.destroy()
      this.playAudio('linder')
      new Explosion(this, player.x, player.y)
      this.player.destroy()
      this.player2.destroy()
    }

    hitCoin(player, coin) {
      this.playAudio("coin")
      this.updateScore(1000);
      coin.destroy();
      player.bullets++
      this.updateCoins()
    }

      loadAudios () {
        this.audios = {
          "pistol-shot": this.sound.add("pistol-shot"),
          "jump": this.sound.add("jump"),
          "coin": this.sound.add("coin"),
          "linder": this.sound.add("linder"),
        };
      }

      playAudio(key) {
        this.audios[key].play();
      }

      playMusic (theme="theme") {
        this.theme = this.sound.add(theme);
        this.theme.stop();
        this.theme.play({
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
      })
      }


    jump () {
      if (!this.player.body.blocked.down) return
      this.player.body.setVelocityY(-300)
      
      this.playAudio("jump")
      this.jumpTween = this.tweens.add({
        targets: this.player,
        duration: 1000,
        angle: {from: 0, to: 360},
        repeat: -1
      })
    }

    finishScene () {
      if (this.theme) {
        this.theme.stop();

      }
      this.playAudio("linder")
      this.registry.set("score", ""+this.score)
      this.scene.start("splash");
     }

    updateScore (points = 1) {
        this.score += points;
        this.scoreText.setText(this.score);
    }

    updateCoins () {
      this.coinText.setText(this.player.bullets);
  }
}