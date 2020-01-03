import React, { useEffect, useState } from "react";
import axios from "axios";
import Game from "./components/games";
import "./App.css";

const App = () => {
  const getYesterday = date => {
    let unformattedDate = date;
    unformattedDate.setDate(unformattedDate.getDate() - 1);
    if (unformattedDate.getMonth() + 1 < 10) {
      if (unformattedDate.getDate() < 10) return `${unformattedDate.getFullYear()}-0${unformattedDate.getMonth() + 1}-0${unformattedDate.getDate()}`;
      return `${unformattedDate.getFullYear()}-0${unformattedDate.getMonth() + 1}-${unformattedDate.getDate()}`;
    } else if (unformattedDate.getDate() < 10) return `${unformattedDate.getFullYear()}-${unformattedDate.getMonth() + 1}-0${unformattedDate.getDate()}`;
    return `${unformattedDate.getFullYear()}-${unformattedDate.getMonth() + 1}-${unformattedDate.getDate()}`;
  };

  const [games, setGames] = useState([]);

  const today = new Date();
  const yesterday = getYesterday(today);

  const getGames = async gameDate => {
    if (window.localStorage.getItem("games") === null) {
      console.log("Fetching Data...");
      const response = await axios({
        method: "GET",
        url: `https://api-nba-v1.p.rapidapi.com/games/date/${gameDate}`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": "ee184c6f8bmsh73e96c83871d6ddp1d6c0djsn1fec248949a2"
        }
      });
      console.log(response.data.api.games);
      const realGames = await removeNullGames(response.data.api.games);
      setGames(realGames);
      window.localStorage.setItem("games", JSON.stringify(response.data.api.games));
    } else {
      console.log("Getting Cache...");
      const realGames = await removeNullGames(JSON.parse(window.localStorage.getItem("games")));
      console.log(realGames);
      setGames(realGames);
    }
  };

  const removeNullGames = games => games.filter(game => game.seasonYear !== "0");

  useEffect(() => {
    getGames(yesterday);
  }, [yesterday]);

  return (
    <div className="App">
      <div className="Games">
        {games.map(game => (
          <Game key={game.gameId} />
        ))}
      </div>
    </div>
  );
};

export default App;
