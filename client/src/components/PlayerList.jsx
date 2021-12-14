import React from "react";
import { connect } from "react-redux";

const PlayerList = (props) => {
    const players = props.players || [];

    if (players.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        players.map((p, i) => {
            return (
                <div key={i}>
                    <h1>{p.name}</h1>
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

const mapStateToProps = (state) => {
    return {
        players: state.players
    };
};

export default connect(mapStateToProps, null)(PlayerList)