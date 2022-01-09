import React from "react";
import Player from "./Player";

const PlayerList = (props) => {

    const players = props.players || [];

    if (players.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="player-list" >
            {players.map((p, i) =>
                <Player
                    key={i}
                    index={i}
                    data={p}
                />
            )}
        </div>
    )
}


export default PlayerList;