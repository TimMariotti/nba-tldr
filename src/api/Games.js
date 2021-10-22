import axios from "axios";
const removeNullGames = games => games.filter(game => game.statusGame === "Finished");
export const getGames = async gameDate => {
  const response = await axios({
    method: "GET",
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${gameDate}`,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": "ee184c6f8bmsh73e96c83871d6ddp1d6c0djsn1fec248949a2"
    }
  });

  return await removeNullGames(response.data.api.games);
};

export const getGameStats = async gameID => {
  console.log(gameID);
  const responce = await axios({
    method: "GET",
    url: `https://api-nba-v1.p.rapidapi.com/statistics/games/gameId/${gameID}`,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": "ee184c6f8bmsh73e96c83871d6ddp1d6c0djsn1fec248949a2"
    }
  });
  console.log(responce.data.api.statistics);
  return responce.data.api.statistics;
};
