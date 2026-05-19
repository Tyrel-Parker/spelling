const TIER_COLORS = ['#00ff88', '#00ccff', '#ffcc00', '#ff8800', '#ff4444'];
export class Word {
    constructor(text, canvasWidth, tier, speed, fontSize) {
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
        Object.defineProperty(this, "direction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "speed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "width", {
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
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stepHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = text;
        this.tier = tier;
        this.speed = speed;
        this.fontSize = fontSize;
        this.stepHeight = Math.round(fontSize * 1.8);
        this.destroyed = false;
        this.color = TIER_COLORS[tier] ?? '#ffffff';
        // Measure actual rendered width
        const tmp = document.createElement('canvas').getContext('2d');
        tmp.font = `${fontSize}px monospace`;
        this.width = tmp.measureText(text).width;
        const pad = 12;
        const maxX = canvasWidth - this.width - pad;
        this.direction = Math.random() < 0.5 ? 1 : -1;
        this.x = pad + Math.random() * Math.max(0, maxX - pad);
        this.y = fontSize + 8;
    }
    update(dt, canvasWidth) {
        const pad = 12;
        this.x += this.direction * this.speed * dt;
        if (this.direction === 1 && this.x + this.width > canvasWidth - pad) {
            this.x = canvasWidth - this.width - pad;
            this.direction = -1;
            this.y += this.stepHeight;
        }
        else if (this.direction === -1 && this.x < pad) {
            this.x = pad;
            this.direction = 1;
            this.y += this.stepHeight;
        }
    }
    reachedBottom(canvasHeight) {
        // 90px reserved for turret + margin
        return this.y > canvasHeight - 90;
    }
    centerX() { return this.x + this.width / 2; }
    centerY() { return this.y - this.fontSize * 0.4; }
    draw(ctx, typedPrefix) {
        const lower = this.text.toLowerCase();
        const prefix = typedPrefix.toLowerCase();
        const isTargeted = prefix.length > 0 && lower.startsWith(prefix);
        ctx.save();
        ctx.font = `${this.fontSize}px monospace`;
        if (isTargeted) {
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 18;
        }
        const matched = this.text.slice(0, typedPrefix.length);
        const rest = this.text.slice(typedPrefix.length);
        let drawX = this.x;
        if (matched.length > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.fillText(matched, drawX, this.y);
            drawX += ctx.measureText(matched).width;
        }
        ctx.fillStyle = this.color;
        if (isTargeted)
            ctx.shadowColor = this.color;
        ctx.fillText(rest, drawX, this.y);
        ctx.restore();
    }
}
