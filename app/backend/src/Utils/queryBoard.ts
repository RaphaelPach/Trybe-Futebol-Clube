const leaderBoard = `SELECT
team_name as name,
SUM(h.totalVictories * 3 + h.draw) as totalPoints,
SUM(h.totalGames) as totalGames,
SUM(h.totalVictories) as totalVictories,
SUM(h.draw) as totalDraws,
SUM(h.loses) as totalLosses,
SUM(h.GP) as goalsFavor,
SUM(h.GS) as goalsOwn,
SUM(h.GP - h.GS) as goalsBalance,
ROUND(SUM((h.totalVictories * 3 + h.draw) / (h.totalGames * 3) * 100), 2) as efficiency
FROM teams
LEFT JOIN(
SELECT home_team_id, SUM(home_team_goals > away_team_goals) as totalVictories,
 SUM(home_team_goals < away_team_goals) as loses,
 SUM(home_team_goals = away_team_goals) as draw,
 SUM(home_team_goals) as GP,
 SUM(away_team_goals) as GS, 
 COUNT(home_team_id) as totalGames FROM matches
WHERE in_progress = 0
GROUP BY home_team_id) as h ON id = home_team_id
GROUP BY team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

export default leaderBoard;
