const velocity = 3
const angle = Math.PI / 320

class Car {
  constructor(x, y, sprite) {
    this.x = x
    this.y = y
    this.isMovingForward = false
    this.rotate
    this.sprite = sprite

    this.leftWheelX = sprite.width / 6
    this.rightWheelX = (sprite.width / 6) * 5

    this.rotationCenterY = sprite.height / 6
  }

  /**
   *
   * @param {WebGL2RenderingContext} ctx
   */
  draw(ctx) {
    if (this.isMovingForward) this.y -= velocity

    ctx.drawImage(this.sprite, this.x, this.y)

    if (!this.rotate || this.rotate === 'both') return

    const rotationCenterX =
      this.x + (this.rotate === 'left' ? this.leftWheelX : this.rightWheelX)
    const rotationCenterY = this.y + this.rotationCenterY
    const _angle = this.rotate == 'left' ? -angle : angle

    ctx.translate(rotationCenterX, rotationCenterY)
    ctx.rotate(_angle)
    ctx.translate(-rotationCenterX, -rotationCenterY)
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

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const sprite = document.getElementById('monster-truck')

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio

  const x = canvas.width / 2
  const y = canvas.height / 2

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'red'

  const car = new Car(x, y, sprite)

  const draw = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    car.draw(ctx)
    window.requestAnimationFrame(draw)
  }

  draw()

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        car.moveForward()
        break
      case 'a':
        car.rotateLeft()
        break
      case 'd':
        car.rotateRight()
    }
  })

  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w':
        car.stopMovingForward()
        break
      case 'a':
        car.stopRotatingLeft()
        break
      case 'd':
        car.stopRotatingRight()
    }
  })
}
