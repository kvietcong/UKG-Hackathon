const calculatePointsForRound = (round) => {
    const roundPoints = {};
    for (const player in round) {
        const moves = round[player];
        let points = 0;
        for (const otherPlayer in moves) {
            const move = moves[otherPlayer];

            // This means that the other player hasn't made a move against current player
            if (!round[otherPlayer]) continue;
            const otherMove = round[otherPlayer][player];
            if (!otherMove) continue;

            if (move === "CHEAT") {
                points += otherMove === "CHEAT" ? 0 : 2;
            } else {
                points += otherMove === "CHEAT" ? -1 : 4;
            }
        }
        roundPoints[player] = points
    }
    return roundPoints;
};

const calculatePoints = rounds => {
    const allPoints = {};
    for (const round of rounds) {
        const roundPoints = calculatePointsForRound(round);
        for (const player in roundPoints) {
            if (!allPoints[player]) allPoints[player] = 0;
            allPoints[player] = allPoints[player] + roundPoints[player];
        }
    }
    return allPoints;
};

// Returns total points of all all
const getPoints = lobby => calculatePoints(lobby.rounds);

const getPlayerStatuses = lobby => {
    const {players, rounds} = lobby;
    const currentRound = rounds.at(-1);
    const playersReady = Object.keys(currentRound);
    const playersNotReady = players.filter(player =>
        !playersReady.includes(player));
    return {ready: playersReady, notReady: playersNotReady};
};

const getReady = lobby => getPlayerStatuses(lobby).ready;
const getNotReady = lobby => getPlayerStatuses(lobby).notReady;

// NOT ZERO INDEXED.
// If everyone has made their move, the round will be incremented here
// Feel free to make this just return the rounds length and manual increment if
// that is more convenient.
const getRound = lobby => {
    let round = lobby.rounds.length;
    return getNotReady(lobby).length === 0 ? round + 1 : round;
};

export {
    calculatePointsForRound,
    calculatePoints,
    getPoints,
    getReady,
    getNotReady,
    getRound,
};