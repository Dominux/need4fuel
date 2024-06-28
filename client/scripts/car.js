import { VELOCITY, ANGLE } from './constants.js'

export class Car {
  constructor(x, y, sprite, texture) {
    this.carCenterX = x
    this.carCenterY = y
    this.carX = this.carCenterX - sprite.width / 2
    this.carY = this.carCenterY - sprite.height / 2

    this.x = this.carCenterX - texture.width / 2
    this.y = this.carCenterY - texture.height / 2

    this.isMovingForward = false
    this.rotation = 0
    this.rotate
    this.sprite = sprite
    this.texture = texture
  }

  /**
   *
   * @param {WebGL2RenderingContext} ctx
   */
  draw(ctx) {
    if (this.isMovingForward) {
      if (this.rotate && this.rotate !== 'both') {
        this.rotation += this.rotate === 'right' ? ANGLE : -ANGLE
      }

      this.x -= VELOCITY * Math.cos(this.rotation)
      this.y -= VELOCITY * Math.sin(this.rotation)
    }

    ctx.drawImage(this.texture, this.x, this.y)

    ctx.save()
    ctx.translate(this.carCenterX, this.carCenterY)
    ctx.rotate(this.rotation)
    ctx.translate(-this.carCenterX, -this.carCenterY)
    ctx.drawImage(this.sprite, this.carX, this.carY)
    ctx.restore()
  }

  moveForward() {
    this.isMovingForward = true
  }

  rotateRight() {
    this.rotate = this.rotate === 'left' ? 'both' : 'right'
  }

  rotateLeft() {
    this.rotate = this.rotate === 'right' ? 'both' : 'left'
  }

  stopMovingForward() {
    this.isMovingForward = false
  }

  stopRotatingRight() {
    if (this.rotate === 'right') {
      this.rotate = null
    } else if (this.rotate === 'both') {
      this.rotate = 'left'
    }
  }

  stopRotatingLeft() {
    if (this.rotate === 'left') {
      this.rotate = null
    } else if (this.rotate === 'both') {
      this.rotate = 'right'
    }
  }
}
