export class Particle {
    constructor(x, y, char, color) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "life", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "char", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 160;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 60;
        this.life = 1;
        this.color = color;
        this.char = char;
    }
    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vy += 220 * dt;
        this.life -= dt * 2.2;
        return this.life > 0;
    }
    draw(ctx, fontSize) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.font = `${Math.round(fontSize * 0.75)}px monospace`;
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
    }
}
