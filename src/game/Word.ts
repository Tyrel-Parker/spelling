const TIER_COLORS = ['#00ff88', '#00ccff', '#ffcc00', '#ff8800', '#ff4444', '#dd44ff']

export class Word {
  text: string
  x: number
  y: number
  direction: 1 | -1
  speed: number
  tier: number
  fontSize: number
  width: number
  color: string
  destroyed: boolean

  private stepHeight: number
  private leftBound: number
  private rightBound: number

  constructor(
    text: string,
    leftBound: number,
    rightBound: number,
    tier: number,
    speed: number,
    fontSize: number,
  ) {
    this.text = text
    this.tier = tier
    this.speed = speed
    this.fontSize = fontSize
    this.stepHeight = Math.round(fontSize * 1.8)
    this.destroyed = false
    this.color = TIER_COLORS[tier] ?? '#ffffff'
    this.leftBound = leftBound
    this.rightBound = rightBound

    const tmp = document.createElement('canvas').getContext('2d')!
    tmp.font = `${fontSize}px monospace`
    this.width = tmp.measureText(text).width

    const pad = 12
    const lo = leftBound + pad
    const hi = rightBound - this.width - pad
    this.direction = Math.random() < 0.5 ? 1 : -1
    this.x = lo + Math.random() * Math.max(0, hi - lo)
    this.y = fontSize + 8
  }

  update(dt: number): void {
    const pad = 12
    this.x += this.direction * this.speed * dt

    if (this.direction === 1 && this.x + this.width > this.rightBound - pad) {
      this.x = this.rightBound - this.width - pad
      this.direction = -1
      this.y += this.stepHeight
    } else if (this.direction === -1 && this.x < this.leftBound + pad) {
      this.x = this.leftBound + pad
      this.direction = 1
      this.y += this.stepHeight
    }
  }

  reachedBottom(canvasHeight: number): boolean {
    return this.y > canvasHeight - 90
  }

  centerX(): number { return this.x + this.width / 2 }
  centerY(): number { return this.y - this.fontSize * 0.4 }

  draw(ctx: CanvasRenderingContext2D, typedPrefix: string): void {
    const lower = this.text.toLowerCase()
    const prefix = typedPrefix.toLowerCase()
    const isTargeted = prefix.length > 0 && lower.startsWith(prefix)

    ctx.save()
    ctx.font = `${this.fontSize}px monospace`

    if (isTargeted) {
      ctx.shadowColor = this.color
      ctx.shadowBlur = 18
    }

    const matched = this.text.slice(0, typedPrefix.length)
    const rest = this.text.slice(typedPrefix.length)
    let drawX = this.x

    if (matched.length > 0) {
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#ffffff'
      ctx.fillText(matched, drawX, this.y)
      drawX += ctx.measureText(matched).width
    }

    ctx.fillStyle = this.color
    if (isTargeted) ctx.shadowColor = this.color
    ctx.fillText(rest, drawX, this.y)

    ctx.restore()
  }
}
