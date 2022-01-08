import React from "react";
import Card from "./Card";
import Player from "./Player";

const PlayerList = (props) => {
    const players = props.players || [];
    const { setSelectedPlayer } = props;

    if (players.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="player-list" >
            {players.map((p, i) =>
                <Player
                    onClick={() => setSelectedPlayer(p)}
                    key={i}
                    index={i}
                    name={p.name}
                    hand={p.hand}
                />
            )}
        </div>
    )
}


export default PlayerList