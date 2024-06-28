import { MOVING_INTERVAL, VELOCITY } from './constants.js'

export class Car {
  constructor(x, y, sprite, texture) {
    // car center
    this.carCenterX = x
    this.carCenterY = y

    // car up-left corner
    this.carX = this.carCenterX - sprite.width / 2
    this.carY = this.carCenterY - sprite.height / 2

    // playground up-left corner
    this.x = this.carCenterX - texture.width / 2
    this.y = this.carCenterY - texture.height / 2

    // direction angle
    this.directionAngle = 0

    // sprites to draw
    this.sprite = sprite
    this.texture = texture

    // moving algo
    setInterval(() => this.move(), MOVING_INTERVAL)
  }

  /**
   *
   * @param {WebGL2RenderingContext} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.texture, this.x, this.y)

    ctx.save()
    ctx.translate(this.carCenterX, this.carCenterY)
    ctx.rotate(this.directionAngle)
    ctx.translate(-this.carCenterX, -this.carCenterY)
    ctx.drawImage(this.sprite, this.carX, this.carY)
    ctx.restore()
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  setMovingDirection(x, y) {
    this.directionAngle = Math.atan2(y - this.carY, x - this.carX)
  }

  move() {
    this.x -= VELOCITY * Math.cos(this.directionAngle)
    this.y -= VELOCITY * Math.sin(this.directionAngle)
  }
}
