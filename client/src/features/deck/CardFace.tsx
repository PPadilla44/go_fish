import React from "react";

interface Props {
    isTop: boolean;
    pointVal: number;
    suit: string;
}

export const CardFace: React.FC<Props> = ({ isTop, pointVal, suit }) => {

    const letters : any = {
        "1": "A",
        "11": "J",
        "12": "Q",
        "13": "K"
    }

    return (
        <div className={ `text-xs font-semibold ${isTop ? "self-start" : "self-end rotate-180"}`}>
            <h4>{letters[pointVal] || pointVal}</h4>
            <h4>{suit}</h4>
        </div>
    );
};