const velocity = 2
const angle = Math.PI / 360

class Car {
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
        this.rotation += this.rotate === 'right' ? angle : -angle
      }

      this.x -= velocity * Math.cos(this.rotation)
      this.y -= velocity * Math.sin(this.rotation)
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

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const sprite = document.getElementById('monster-truck')
  const texture = document.getElementById('canvas-texture')

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio

  const x = canvas.width / 2
  const y = canvas.height / 2

  const ctx = canvas.getContext('2d')

  const car = new Car(x, y, sprite, texture)

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
