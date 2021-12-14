import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchGame } from "../store/utils/thunkCreators";
import PlayerList from "./PlayerList";

const Game = (props) => {
    const { game, fetchGame } = props;

    useEffect(() => {
        fetchGame();
    }, [fetchGame])

    return (
        <div>
            <h1>GO FISH</h1>    

            <PlayerList />


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