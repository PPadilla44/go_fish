import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchGame } from "../store/utils/thunkCreators";
import PlayerList from "./PlayerList";

const Game = (props) => {
    const { game, players, fetchGame } = props;

    const [selectedCard, setSelectedCard] = useState({});
    const [selectedPlayer, setSelectedPlayer] = useState({});

    useEffect(() => {
        fetchGame();
    }, [fetchGame])

    useEffect(() => {
        let canRun = Object.keys(selectedCard).length !== 0 && Object.keys(selectedPlayer).length !== 0;
        
        if (canRun) {

            for (const possCard of selectedPlayer.hand) {
                if (selectedCard.point_val === possCard.point_val && selectedCard.suit === possCard.suit ) {
                    console.log(selectedCard);
                }
            }
            // Remove cards and add points
        }

    }, [selectedCard, selectedPlayer])

    if (players.isFetching) {
        return <div>Loading...</div>;
    }


    return (
        <div className="game">
            <PlayerList players={players} setSelectedPlayer={setSelectedPlayer} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        game: state.game,
        players: state.players
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGame: () => {
            dispatch(fetchGame());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);