export class Projectile {
  x: number
  y: number
  angle: number
  isHit: boolean
  done: boolean

  private targetX: number
  private targetY: number
  private speed = 1100

  constructor(x: number, y: number, targetX: number, targetY: number, isHit: boolean) {
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.isHit = isHit
    this.done = false

    const baseAngle = Math.atan2(targetY - y, targetX - x)
    if (isHit) {
      this.angle = baseAngle
    } else {
      // Wildly off angle — guaranteed visible miss
      const spread = (Math.random() * 0.6 + 0.5) * (Math.random() < 0.5 ? 1 : -1)
      this.angle = baseAngle + spread
    }
  }

  // Returns true when a hit projectile reaches its target
  update(dt: number): boolean {
    this.x += Math.cos(this.angle) * this.speed * dt
    this.y += Math.sin(this.angle) * this.speed * dt

    if (this.isHit) {
      if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < 22) {
        this.done = true
        return true
      }
    }
    return false
  }

  isOffScreen(w: number, h: number): boolean {
    return this.x < -60 || this.x > w + 60 || this.y < -60 || this.y > h + 60
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    const color = this.isHit ? '#ffee44' : '#ff4444'
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.moveTo(
      this.x - Math.cos(this.angle) * 14,
      this.y - Math.sin(this.angle) * 14,
    )
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    ctx.restore()
  }
}
