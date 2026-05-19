import './style.css'
import { Game } from './game/Game'

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
const input = document.getElementById('game-input') as HTMLInputElement

new Game(canvas, input)
