import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchGame } from "../store/utils/thunkCreators";
import PlayerList from "./PlayerList";

const Game = (props) => {
    const { game, fetchGame } = props;
    const text = game.text || [];
    const players = game.players || [];

    useEffect(() => {
        fetchGame();
    }, [fetchGame])

    if (game.isFetching) {
        return <div>Loading...</div>;
    }


    return (
        <div className="game">
            {
                text.map((t, i) => {
                    return (
                        <p key={i}>{t}</p>
                    )
                })
            }
            <PlayerList
                players={players}
            />
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
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);