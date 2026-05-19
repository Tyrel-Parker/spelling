import { Word } from './Word';
import { Projectile } from './Projectile';
import { Turret } from './Turret';
import { Particle } from './Particle';
import { WORD_TIERS } from '../words';
import { getHighScores, isHighScore, addHighScore } from '../scores';
import { resume, playShoot, playExplode, playMiss, playLifeLost, playExtraLife, playGameOver } from '../audio';
const EXTRA_LIFE_INTERVAL = 5000;
const MAX_LIVES = 5;
const INPUT_AREA_HEIGHT = 60;
export class Game {
    constructor(canvas, input) {
        Object.defineProperty(this, "canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "input", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'MENU'
        });
        Object.defineProperty(this, "words", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "projectiles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "projectileTargets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new WeakMap()
        });
        Object.defineProperty(this, "particles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "popups", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "turret", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stars", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "score", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lives", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        Object.defineProperty(this, "speedMult", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1.0
        });
        Object.defineProperty(this, "diffMult", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1.0
        });
        Object.defineProperty(this, "gameTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "spawnTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "nextExtraLife", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: EXTRA_LIFE_INTERVAL
        });
        Object.defineProperty(this, "finalScore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "highScores", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "animId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lastTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "loop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (time) => {
                const dt = Math.min((time - this.lastTime) / 1000, 0.05);
                this.lastTime = time;
                this.update(dt);
                this.draw();
                this.animId = requestAnimationFrame(this.loop);
            }
        });
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.input = input;
        this.turret = new Turret(0, 0);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => this.resize());
        }
        input.addEventListener('keydown', (e) => this.onKeyDown(e));
        canvas.addEventListener('pointerdown', () => { input.focus(); resume(); });
        input.focus();
        this.loop(0);
    }
    resize() {
        const vv = window.visualViewport;
        const w = vv ? Math.round(vv.width) : window.innerWidth;
        const h = vv ? Math.round(vv.height) : window.innerHeight;
        this.canvas.width = w;
        this.canvas.height = h - INPUT_AREA_HEIGHT;
        this.turret.x = this.canvas.width / 2;
        this.turret.y = this.canvas.height - 32;
        this.stars = Array.from({ length: 90 }, () => ({
            x: Math.random() * w,
            y: Math.random() * (h - INPUT_AREA_HEIGHT),
            r: Math.random() * 1.4 + 0.3,
        }));
    }
    get W() { return this.canvas.width; }
    get H() { return this.canvas.height; }
    fontSize() {
        return Math.max(14, Math.min(22, Math.round(this.W / 26)));
    }
    spawnInterval() {
        return Math.max(0.7, 3.8 / this.diffMult);
    }
    maxWords() {
        return Math.min(10, Math.floor(this.diffMult * 1.6));
    }
    wordTier() {
        return Math.min(4, Math.max(0, Math.floor((this.diffMult - 1) / 0.85)));
    }
    wordSpeed() {
        return 38 + this.speedMult * 28;
    }
    spawnWord() {
        if (this.words.length >= this.maxWords())
            return;
        const tier = this.wordTier();
        const useTier = Math.random() < 0.25 && tier > 0 ? tier - 1 : tier;
        const pool = WORD_TIERS[useTier];
        const onScreen = new Set(this.words.map(w => w.text));
        const available = pool.filter(w => !onScreen.has(w));
        if (available.length === 0)
            return;
        const text = available[Math.floor(Math.random() * available.length)];
        this.words.push(new Word(text, this.W, useTier, this.wordSpeed(), this.fontSize()));
    }
    startGame() {
        this.words = [];
        this.projectiles = [];
        this.particles = [];
        this.popups = [];
        this.score = 0;
        this.lives = 3;
        this.speedMult = 1.0;
        this.diffMult = 1.0;
        this.gameTime = 0;
        this.spawnTimer = 0;
        this.nextExtraLife = EXTRA_LIFE_INTERVAL;
        this.input.value = '';
        this.input.placeholder = 'type a word, press enter...';
        this.state = 'PLAYING';
        this.spawnWord();
    }
    endGame() {
        this.finalScore = this.score;
        playGameOver();
        if (isHighScore(this.finalScore)) {
            this.input.value = '';
            this.input.placeholder = 'your name...';
            this.state = 'HIGH_SCORE_ENTRY';
        }
        else {
            this.highScores = getHighScores();
            this.input.value = '';
            this.input.placeholder = '';
            this.state = 'HIGH_SCORE_VIEW';
        }
    }
    fire() {
        const typed = this.input.value.trim();
        if (!typed)
            return;
        resume();
        const lower = typed.toLowerCase();
        const exactMatch = this.words.find(w => w.text.toLowerCase() === lower);
        if (exactMatch) {
            const proj = new Projectile(this.turret.x, this.turret.y, exactMatch.centerX(), exactMatch.centerY(), true);
            this.projectileTargets.set(proj, exactMatch);
            this.projectiles.push(proj);
            this.turret.aimAt(exactMatch.centerX(), exactMatch.centerY());
            this.turret.fire();
            playShoot();
        }
        else {
            const target = this.targeted();
            const tx = target ? target.centerX() : this.turret.x + (Math.random() - 0.5) * 200;
            const ty = target ? target.centerY() : this.turret.y - 200;
            const proj = new Projectile(this.turret.x, this.turret.y, tx, ty, false);
            this.projectiles.push(proj);
            this.turret.fire();
            playMiss();
        }
        this.input.value = '';
    }
    // Word that currently matches the typed prefix (lowest = most dangerous)
    targeted() {
        const prefix = this.input.value.trim().toLowerCase();
        if (!prefix)
            return null;
        const matches = this.words.filter(w => w.text.toLowerCase().startsWith(prefix));
        if (matches.length === 0)
            return null;
        return matches.reduce((lowest, w) => (w.y > lowest.y ? w : lowest), matches[0]);
    }
    destroyWord(word) {
        word.destroyed = true;
        const gameH = this.H - 90;
        const heightRatio = Math.max(0, Math.min(1, 1 - word.y / gameH));
        const heightBonus = 1 + heightRatio * 2;
        const pts = Math.round(word.text.length * 10 * heightBonus * this.speedMult * this.diffMult);
        this.score += pts;
        this.popups.push({ x: word.centerX(), y: word.centerY(), text: `+${pts}`, life: 1.4 });
        for (const ch of word.text) {
            this.particles.push(new Particle(word.centerX() + (Math.random() - 0.5) * word.width, word.centerY(), ch, word.color));
        }
        if (this.score >= this.nextExtraLife) {
            this.nextExtraLife += EXTRA_LIFE_INTERVAL;
            this.lives = Math.min(MAX_LIVES, this.lives + 1);
            playExtraLife();
        }
        playExplode();
    }
    loseLife(word) {
        for (const ch of word.text) {
            this.particles.push(new Particle(word.centerX() + (Math.random() - 0.5) * word.width, word.centerY(), ch, '#ff2222'));
        }
        this.lives--;
        playLifeLost();
        if (this.lives <= 0)
            this.endGame();
    }
    onKeyDown(e) {
        resume();
        if (this.state === 'MENU') {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.startGame();
            }
            return;
        }
        if (this.state === 'HIGH_SCORE_ENTRY') {
            if (e.key === 'Enter') {
                e.preventDefault();
                const name = this.input.value.trim() || 'PLAYER';
                addHighScore(name, this.finalScore);
                this.highScores = getHighScores();
                this.input.value = '';
                this.input.placeholder = '';
                this.state = 'HIGH_SCORE_VIEW';
            }
            return;
        }
        if (this.state === 'HIGH_SCORE_VIEW') {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.state = 'MENU';
                this.input.placeholder = 'press enter to start';
            }
            return;
        }
        if (this.state === 'PLAYING') {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.fire();
            }
        }
    }
    update(dt) {
        if (this.state !== 'PLAYING')
            return;
        this.gameTime += dt;
        // Speed: +0.1 per 20s (so 2x at 200s, 3x at 400s)
        this.speedMult = 1.0 + (this.gameTime / 20) * 0.1;
        // Difficulty: +0.1 per 25s (slightly slower — controls tier + spawn rate)
        this.diffMult = 1.0 + (this.gameTime / 25) * 0.1;
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval()) {
            this.spawnTimer = 0;
            this.spawnWord();
        }
        const tgt = this.targeted();
        if (tgt)
            this.turret.aimAt(tgt.centerX(), tgt.centerY());
        this.turret.update(dt);
        // Update words
        const dead = [];
        this.words = this.words.filter(word => {
            if (word.destroyed)
                return false;
            word.update(dt, this.W);
            if (word.reachedBottom(this.H)) {
                dead.push(word);
                return false;
            }
            return true;
        });
        dead.forEach(w => { if (this.state === 'PLAYING')
            this.loseLife(w); });
        // Update projectiles
        this.projectiles = this.projectiles.filter(proj => {
            const hit = proj.update(dt);
            if (hit) {
                const tw = this.projectileTargets.get(proj);
                if (tw && !tw.destroyed)
                    this.destroyWord(tw);
                return false;
            }
            return !proj.isOffScreen(this.W, this.H) && !proj.done;
        });
        this.particles = this.particles.filter(p => p.update(dt));
        this.popups = this.popups.filter(sp => {
            sp.y -= 55 * dt;
            sp.life -= dt;
            return sp.life > 0;
        });
    }
    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = '#050a15';
        ctx.fillRect(0, 0, this.W, this.H);
        this.drawStars();
        switch (this.state) {
            case 'MENU':
                this.drawMenu();
                break;
            case 'PLAYING':
                this.drawGame();
                break;
            case 'HIGH_SCORE_ENTRY':
                this.drawGame();
                this.drawHighScoreEntry();
                break;
            case 'HIGH_SCORE_VIEW':
                this.drawHighScoreView();
                break;
        }
    }
    drawStars() {
        const t = Date.now() / 1200;
        this.ctx.fillStyle = '#ffffff';
        for (const s of this.stars) {
            this.ctx.globalAlpha = 0.25 + Math.sin(t + s.x * 0.01) * 0.18;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }
    drawMenu() {
        const ctx = this.ctx;
        const cx = this.W / 2;
        const titleSize = Math.min(46, Math.round(this.W / 8));
        ctx.textAlign = 'center';
        ctx.font = `bold ${titleSize}px monospace`;
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 22;
        ctx.fillText('SPELLING', cx, this.H * 0.2);
        ctx.shadowBlur = 0;
        ctx.font = `${Math.round(titleSize * 0.32)}px monospace`;
        ctx.fillStyle = '#556688';
        ctx.fillText('TYPE THE WORDS · SHOOT THEM DOWN', cx, this.H * 0.2 + titleSize * 0.72);
        // High scores preview
        const scores = getHighScores();
        const lh = Math.min(26, Math.round(this.H / 22));
        const startY = this.H * 0.38;
        ctx.font = `${Math.round(lh * 0.72)}px monospace`;
        ctx.fillStyle = '#ffcc00';
        ctx.shadowColor = '#ffcc00';
        ctx.shadowBlur = 8;
        ctx.fillText('HIGH SCORES', cx, startY);
        ctx.shadowBlur = 0;
        if (scores.length === 0) {
            ctx.fillStyle = '#334455';
            ctx.font = `${Math.round(lh * 0.6)}px monospace`;
            ctx.fillText('no scores yet', cx, startY + lh * 1.8);
        }
        else {
            scores.slice(0, 5).forEach((s, i) => {
                ctx.font = `${Math.round(lh * 0.6)}px monospace`;
                ctx.fillStyle = i === 0 ? '#ffcc00' : '#667788';
                const rank = `${i + 1}.`;
                const name = s.name.substring(0, 10).toUpperCase().padEnd(11);
                const pts = s.score.toString().padStart(7);
                ctx.fillText(`${rank} ${name}${pts}`, cx, startY + lh * (1.8 + i * 1.2));
            });
        }
        const pulse = 0.55 + Math.sin(Date.now() / 420) * 0.45;
        ctx.globalAlpha = pulse;
        ctx.font = `${Math.round(lh * 0.68)}px monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('PRESS ENTER TO START', cx, this.H * 0.88);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'left';
    }
    drawGame() {
        const ctx = this.ctx;
        const typed = this.input.value.trim().toLowerCase();
        for (const w of this.words)
            w.draw(ctx, typed);
        for (const p of this.projectiles)
            p.draw(ctx);
        for (const p of this.particles)
            p.draw(ctx, this.fontSize());
        this.turret.draw(ctx);
        this.drawHUD();
        ctx.textAlign = 'center';
        for (const sp of this.popups) {
            ctx.save();
            ctx.globalAlpha = Math.min(1, sp.life);
            ctx.font = `bold ${Math.round(this.fontSize() * 0.9)}px monospace`;
            ctx.fillStyle = '#ffee44';
            ctx.shadowColor = '#ffee44';
            ctx.shadowBlur = 8;
            ctx.fillText(sp.text, sp.x, sp.y);
            ctx.restore();
        }
        ctx.textAlign = 'left';
    }
    drawHUD() {
        const ctx = this.ctx;
        const fs = this.fontSize();
        ctx.textAlign = 'left';
        ctx.font = `${fs}px monospace`;
        ctx.fillStyle = '#ccddee';
        ctx.fillText(`SCORE  ${this.score}`, 10, fs + 6);
        ctx.font = `${Math.round(fs * 0.62)}px monospace`;
        ctx.fillStyle = '#445566';
        ctx.fillText(`SPD ${this.speedMult.toFixed(1)}×  DIFF ${this.diffMult.toFixed(1)}×`, 10, fs * 2 + 8);
        // Hearts
        const heartFs = Math.round(fs * 1.1);
        ctx.font = `${heartFs}px monospace`;
        for (let i = 0; i < this.lives; i++) {
            ctx.fillStyle = '#ee3355';
            ctx.fillText('♥', this.W - (this.lives - i) * (heartFs + 2), fs + 6);
        }
    }
    drawHighScoreEntry() {
        const ctx = this.ctx;
        const cx = this.W / 2;
        const fs = Math.min(26, Math.round(this.W / 16));
        // Dim overlay
        ctx.fillStyle = 'rgba(5,10,21,0.78)';
        ctx.fillRect(0, 0, this.W, this.H);
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.round(fs * 1.5)}px monospace`;
        ctx.fillStyle = '#ff8800';
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 18;
        ctx.fillText('GAME OVER', cx, this.H * 0.25);
        ctx.shadowBlur = 0;
        ctx.font = `${fs}px monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`SCORE  ${this.finalScore}`, cx, this.H * 0.38);
        ctx.font = `${Math.round(fs * 0.85)}px monospace`;
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.fillText('NEW HIGH SCORE!', cx, this.H * 0.5);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#667788';
        ctx.fillText('ENTER YOUR NAME', cx, this.H * 0.61);
        // Mirror input value
        const display = (this.input.value || '_').toUpperCase();
        ctx.font = `bold ${Math.round(fs * 1.1)}px monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(display, cx, this.H * 0.72);
        const pulse = 0.5 + Math.sin(Date.now() / 440) * 0.5;
        ctx.globalAlpha = pulse;
        ctx.font = `${Math.round(fs * 0.65)}px monospace`;
        ctx.fillStyle = '#445566';
        ctx.fillText('PRESS ENTER TO SUBMIT', cx, this.H * 0.85);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'left';
    }
    drawHighScoreView() {
        const ctx = this.ctx;
        const cx = this.W / 2;
        const fs = Math.min(22, Math.round(this.W / 18));
        const lh = Math.min(30, Math.round(this.H / 16));
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.round(fs * 1.2)}px monospace`;
        ctx.fillStyle = '#ffcc00';
        ctx.shadowColor = '#ffcc00';
        ctx.shadowBlur = 16;
        ctx.fillText('HIGH SCORES', cx, this.H * 0.12);
        ctx.shadowBlur = 0;
        this.highScores.forEach((s, i) => {
            ctx.font = `${Math.round(fs * 0.72)}px monospace`;
            ctx.fillStyle = i === 0 ? '#ffcc00' : i < 3 ? '#99aacc' : '#445566';
            const rank = `${i + 1}.`.padEnd(3);
            const name = s.name.substring(0, 12).toUpperCase().padEnd(13);
            const pts = s.score.toString().padStart(7);
            ctx.fillText(`${rank} ${name}${pts}`, cx, this.H * 0.22 + lh * i);
        });
        if (this.highScores.length === 0) {
            ctx.fillStyle = '#334455';
            ctx.font = `${Math.round(fs * 0.7)}px monospace`;
            ctx.fillText('no scores yet', cx, this.H * 0.4);
        }
        const pulse = 0.55 + Math.sin(Date.now() / 420) * 0.45;
        ctx.globalAlpha = pulse;
        ctx.font = `${Math.round(fs * 0.68)}px monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('PRESS ENTER TO CONTINUE', cx, this.H * 0.92);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'left';
    }
}
