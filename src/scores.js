const STORAGE_KEY = 'spelling-high-scores';
const MAX_SCORES = 10;
export function getHighScores() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    catch {
        return [];
    }
}
export function isHighScore(score) {
    if (score === 0)
        return false;
    const scores = getHighScores();
    if (scores.length < MAX_SCORES)
        return true;
    return score > scores[scores.length - 1].score;
}
export function addHighScore(name, score) {
    const scores = getHighScores();
    scores.push({ name, score, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    scores.splice(MAX_SCORES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}
