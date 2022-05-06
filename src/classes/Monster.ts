import {GamePiece, IGamePiece} from './GamePiece';
import {Player} from './Player';

interface IMonster {
  player: Player;
}

export class Monster extends GamePiece {
  player: Player;
  dx: number = 0;
  dy: number = 0;

  constructor({ctx, position, player}: Omit<IGamePiece, 'image'> & IMonster) {
    const image = new Image();
    image.src = './images/game/obstacle.png';

    super({
      ctx,
      image,
      position,
    });

    this.player = player;
  }

  hauntPlayer() {
    this.dx = ((this.position.x - this.player.position.x) / 200) * -1;
    this.dy = ((this.position.y - this.player.position.y) / 200) * -1;
    const shouldMove = Math.abs(this.position.x - this.player.position.x) > 1 || Math.abs(this.position.y - this.player.position.y) > 1;

    if(shouldMove) {
      this.position.x += this.dx;
      this.position.y += this.dy;
    } else {
      this.dx = 0;
      this.dy = 0;
    }

    super.clearRect();
    super.paint();
  }
}
