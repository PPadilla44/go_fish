import React from "react";

const CardFace = (props) => {

    const {top, pointVal, suit} = props;

    
    const letters = {
        "1": "A",
        "11": "J",
        "12": "Q",
        "13": "K"
    }

    return (
        <div className={ top ? "card-top" : "card-btm"}>
            <h4>{letters[pointVal] || pointVal}</h4>
            <h4>{suit}</h4>
        </div>
    );
};

export default CardFace;