import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { getGames } from "../api/Games";
import Game from "./Game";

const { Header, Content, Footer } = Layout;

const AppContainer = () => {
  const getYesterday = date => {
    let unformattedDate = date;
    unformattedDate.setDate(unformattedDate.getDate());
    if (unformattedDate.getMonth() + 1 < 10) {
      if (unformattedDate.getDate() < 10) return `${unformattedDate.getFullYear()}-0${unformattedDate.getMonth() + 1}-0${unformattedDate.getDate()}`;
      return `${unformattedDate.getFullYear()}-0${unformattedDate.getMonth() + 1}-${unformattedDate.getDate()}`;
    } else if (unformattedDate.getDate() < 10) return `${unformattedDate.getFullYear()}-${unformattedDate.getMonth() + 1}-0${unformattedDate.getDate()}`;
    return `${unformattedDate.getFullYear()}-${unformattedDate.getMonth() + 1}-${unformattedDate.getDate()}`;
  };

  const [games, setGames] = useState([]);

  const today = new Date();
  const yesterday = getYesterday(today);

  const getGamesFromAPI = async gameDate => {
    if (window.localStorage.getItem("games") === null) {
      const realGames = await getGames(gameDate);
      window.localStorage.setItem("games", JSON.stringify(realGames));
      console.log(realGames);
      setGames(realGames);
    } else {
      const realGames = JSON.parse(window.localStorage.getItem("games"));
      console.log(realGames);
      setGames(realGames);
    }
  };

  useEffect(() => {
    getGamesFromAPI(yesterday);
  }, []);

  return (
    <Layout className="layout">
      <Header></Header>
      <Content>
        {games.map(game => (
          <Game key={game.gameId} gameData={game} />
        ))}
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default AppContainer;
