import React from "react";
import { connect } from "react-redux";

const PlayerList = (props) => {
    const players = props.players || [];
    const { setSelectedPlayer } = props;

    if (players.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        players.map((p, i) => {
            return (
                <div key={i}>
                    <h1 onClick={() => setSelectedPlayer(p)} >{p.name}</h1>
                    {p.hand.map((c, i) => {
                        return (
                            <div key={i}>
                                <p>{c.point_val} {c.suit}</p>
                            </div>
                        )
                    })}
                </div>
            )
        })
    )
}


export default PlayerList