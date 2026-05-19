export class Turret {
  x: number
  y: number
  private angle: number
  private targetAngle: number
  private flashTime: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.angle = -Math.PI / 2
    this.targetAngle = -Math.PI / 2
    this.flashTime = 0
  }

  aimAt(tx: number, ty: number): void {
    this.targetAngle = Math.atan2(ty - this.y, tx - this.x)
  }

  fire(): void {
    this.flashTime = 0.14
  }

  update(dt: number): void {
    let diff = this.targetAngle - this.angle
    while (diff > Math.PI) diff -= Math.PI * 2
    while (diff < -Math.PI) diff += Math.PI * 2
    this.angle += diff * Math.min(1, dt * 12)
    this.flashTime = Math.max(0, this.flashTime - dt)
  }

  get barrelX(): number {
    return this.x + Math.cos(this.angle) * 30
  }

  get barrelY(): number {
    return this.y + Math.sin(this.angle) * 30
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.x, this.y)

    // Base dome
    ctx.fillStyle = this.flashTime > 0 ? '#88aaff' : '#4466cc'
    ctx.shadowColor = '#4488ff'
    ctx.shadowBlur = 12
    ctx.beginPath()
    ctx.arc(0, 0, 16, 0, Math.PI * 2)
    ctx.fill()

    // Barrel
    ctx.save()
    ctx.rotate(this.angle)
    ctx.fillStyle = this.flashTime > 0 ? '#ffffff' : '#99bbee'
    ctx.shadowBlur = 0
    ctx.fillRect(2, -4, 26, 8)

    if (this.flashTime > 0) {
      ctx.fillStyle = `rgba(255, 240, 100, ${this.flashTime / 0.14})`
      ctx.beginPath()
      ctx.arc(30, 0, 7, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

    ctx.restore()
  }
}
