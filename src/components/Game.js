import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal } from "antd";
import { getGameStats } from "../api/Games";
import { GameDetails } from "./GameDetails";

const Game = ({ gameData }) => {
  const [gameDetails, setGameDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const getGameDetails = async gameId => {
    if (window.localStorage.getItem(`${gameId}`) === null) {
      const gameData = await getGameStats(gameId);
      setGameDetails(gameData);
      window.localStorage.setItem(`${gameId}`, JSON.stringify(gameData));
      setModalVisible(true);
    } else {
      console.log("CACHE HIT");
      const gameData = JSON.parse(window.localStorage.getItem(`${gameId}`));
      setGameDetails(gameData);
      setModalVisible(true);
    }
  };

  const { vTeam, hTeam, gameId } = gameData;
  const handleCancel = () => {
    setModalVisible(false);
  };
  // const logoStyle = {
  //   width: "25px",
  //   height: "25px"
  // };

  const cardStyle = {
    padding: "0",
    margin: "auto",
    marginTop: ".5rem",
    width: "350px"
  };

  const teamNameStyle = {
    textAlign: "left",
    height: "40px",
    margin: "0",
    marginLeft: "1rem",
    padding: "0"
  };

  const scoreStyle = {
    textAlign: "right",
    height: "40px",
    margin: "0",
    padding: "0"
  };

  const rowStyle = {
    height: "40px",
    lineHeight: "40px"
  };

  return (
    <>
      <Card style={cardStyle} hoverable="true" bodyStyle={{ padding: 0 }} onClick={() => getGameDetails(gameId)}>
        <Row style={{ ...rowStyle, ...{ borderBottom: "1px solid #80808038" } }}>
          {/* <Col span={4}>
          <img src={vTeam.logo} alt={vTeam.shortName} style={logoStyle} />
        </Col> */}
          <Col span={18}>
            <h2 style={teamNameStyle}>{vTeam.nickName}</h2>
          </Col>
          <Col span={4}>
            <h2 style={scoreStyle}>{vTeam.score.points}</h2>
          </Col>
        </Row>

        <Row style={rowStyle}>
          {/* <Col span={4}>
          <img src={hTeam.logo} alt={hTeam.shortName} style={logoStyle} />
        </Col> */}
          <Col span={18}>
            <h2 style={teamNameStyle}>{hTeam.nickName}</h2>
          </Col>
          <Col span={4}>
            <h2 style={scoreStyle}>{hTeam.score.points}</h2>
          </Col>
        </Row>
      </Card>

      <Modal title="Game Stats" visible={modalVisible} footer={[]} maskClosable={true} onCancel={handleCancel}>
        <GameDetails gameDetails={gameDetails} />
      </Modal>
    </>
  );
};

export default Game;
