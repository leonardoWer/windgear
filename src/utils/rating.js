export const calculateRating = (stats) => {
    if (!stats) return 0;
    return (stats.projects * 10) + (stats.builds * 5) + (stats.orders * 3);
};

// Возвращает отсортированный массив игроков с добавленным полем rating
export const getRankedPlayers = (players) => {
    return [...players]
        .map(p => ({ ...p, rating: calculateRating(p.stats) }))
        .sort((a, b) => b.rating - a.rating);
};