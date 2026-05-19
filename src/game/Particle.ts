export class Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  char: string

  constructor(x: number, y: number, char: string, color: string) {
    this.x = x
    this.y = y
    const angle = Math.random() * Math.PI * 2
    const speed = 60 + Math.random() * 160
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed - 60
    this.life = 1
    this.color = color
    this.char = char
  }

  update(dt: number): boolean {
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.vy += 220 * dt
    this.life -= dt * 2.2
    return this.life > 0
  }

  draw(ctx: CanvasRenderingContext2D, fontSize: number): void {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.life)
    ctx.fillStyle = this.color
    ctx.font = `${Math.round(fontSize * 0.75)}px monospace`
    ctx.fillText(this.char, this.x, this.y)
    ctx.restore()
  }
}
