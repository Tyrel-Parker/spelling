export class Projectile {
    constructor(x, y, targetX, targetY, isHit) {
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
        Object.defineProperty(this, "angle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isHit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "done", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "targetX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "targetY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "speed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1100
        });
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.isHit = isHit;
        this.done = false;
        const baseAngle = Math.atan2(targetY - y, targetX - x);
        if (isHit) {
            this.angle = baseAngle;
        }
        else {
            // Wildly off angle — guaranteed visible miss
            const spread = (Math.random() * 0.6 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
            this.angle = baseAngle + spread;
        }
    }
    // Returns true when a hit projectile reaches its target
    update(dt) {
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        if (this.isHit) {
            if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < 22) {
                this.done = true;
                return true;
            }
        }
        return false;
    }
    isOffScreen(w, h) {
        return this.x < -60 || this.x > w + 60 || this.y < -60 || this.y > h + 60;
    }
    draw(ctx) {
        ctx.save();
        const color = this.isHit ? '#ffee44' : '#ff4444';
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(this.x - Math.cos(this.angle) * 14, this.y - Math.sin(this.angle) * 14);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
    }
}
