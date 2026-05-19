let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

export function resume(): void {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
}

function tone(freq: number, duration: number, type: OscillatorType, gain: number): void {
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.connect(g)
  g.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  g.gain.setValueAtTime(gain, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export function playShoot(): void {
  tone(900, 0.08, 'square', 0.18)
}

export function playExplode(): void {
  const ctx = getCtx()
  const bufferSize = Math.floor(ctx.sampleRate * 0.18)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.35, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
  source.connect(g)
  g.connect(ctx.destination)
  source.start()
}

export function playMiss(): void {
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.connect(g)
  g.connect(ctx.destination)
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(320, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.25)
  g.gain.setValueAtTime(0.18, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.25)
}

export function playLifeLost(): void {
  [380, 280, 180].forEach((freq, i) => {
    setTimeout(() => tone(freq, 0.18, 'square', 0.28), i * 130)
  })
}

export function playExtraLife(): void {
  [380, 480, 580, 760].forEach((freq, i) => {
    setTimeout(() => tone(freq, 0.1, 'square', 0.22), i * 75)
  })
}

export function playGameOver(): void {
  [560, 460, 360, 260, 160].forEach((freq, i) => {
    setTimeout(() => tone(freq, 0.22, 'square', 0.28), i * 160)
  })
}
