import './style.css';
import { Game } from './game/Game';
const canvas = document.getElementById('game-canvas');
const input = document.getElementById('game-input');
new Game(canvas, input);
