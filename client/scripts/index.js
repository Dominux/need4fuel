import { Car } from './car.js'

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
