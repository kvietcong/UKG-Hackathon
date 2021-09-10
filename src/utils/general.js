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

const getSelectionStatuses = lobby => {
    const {players, rounds} = lobby;
    if (rounds.length === 0) return {selected: lobby.players, notSelected: []};
    const round = rounds.at(-1);
    const playersReady = Object.keys(round);
    const playersNotReady = players.filter(player =>
        !playersReady.includes(player));
    return {selected: playersReady, notSelected: playersNotReady};
};

const getSelected = lobby => getSelectionStatuses(lobby).selected;
const getNotSelected = lobby => getSelectionStatuses(lobby).notSelected;

const isReadyForNextRound = lobby => getNotSelected(lobby).length === 0;

const hasPlayerSelected = (lobby, player) => getSelected(lobby).includes(player);

// Just a shortcut to not have ternaries everywhere
// Maybe make this more robust?
const lazyLoad = (lobby, fun) => lobby ? JSON.stringify(fun(lobby)) : "Loading";

export {
    calculatePointsForRound,
    calculatePoints,
    getPoints,
    getSelected,
    getNotSelected,
    isReadyForNextRound,
    hasPlayerSelected,
    lazyLoad,
};