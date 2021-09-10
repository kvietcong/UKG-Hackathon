const calculatePointsForMoves = (move1, move2) => {
    if (move1 === "CHEAT") {
        return move2 === "CHEAT" ? 0 : 3;
    } else {
        return move2 === "CHEAT" ? -1 : 2;
    }
};

const calculatePointsForRound = round => {
    const roundPoints = {};
    for (const player in round) {
        const moves = round[player];
        let points = 0;
        for (const otherPlayer in moves) {
            const move1 = moves[otherPlayer];

            // This means that the other player hasn't made a move against current player
            if (!round[otherPlayer]) continue;
            const move2 = round[otherPlayer][player];
            if (!move2) continue;
            points += calculatePointsForMoves(move1, move2);
        }
        roundPoints[player] = points
    }
    return roundPoints;
};

const getPoints = ({players, rounds}) => {
    const allPoints = {};
    for (const player of players) allPoints[player] = 0;
    for (const round of rounds) {
        const roundPoints = calculatePointsForRound(round);
        for (const player in roundPoints) {
            allPoints[player] = allPoints[player] + roundPoints[player];
        }
    }
    return allPoints;
};

const getVsPoints = (lobby, user1, user2) => {
    const rounds = lobby.rounds;
    let points = 0;
    for (const round of rounds) {
        const move1 = round?.[user1]?.[user2];
        if (!move1) continue;
        const move2 = round?.[user2]?.[user1];
        if (!move2) continue;
        points += calculatePointsForMoves(move1, move2);
    }
    return points;
};

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
    getPoints,
    getVsPoints,
    getSelected,
    getNotSelected,
    isReadyForNextRound,
    hasPlayerSelected,
    lazyLoad,
};