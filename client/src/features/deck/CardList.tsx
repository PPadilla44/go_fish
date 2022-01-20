import React, { useState } from 'react';
import { useEffect } from 'react';
import { CardInterface } from '../game/gameInterfaces';
import { Card } from "./Card"

interface Props {
    cardList: Array<CardInterface>;
    isUser: boolean;
}

export const CardList: React.FC<Props> = ({cardList, isUser}) => {

    const [rotateAmt, setRotateAmt] = useState(new Array(cardList.length));

    useEffect(() => {

        const rotateCards = () => {

            let half = Math.floor(cardList.length / 2);
            let copyRotateAmt = [...rotateAmt];

            let rotate = 3;
            for (let i = half; i >= 0; i--) {
                copyRotateAmt[i] = rotate;
                rotate -= 5;
            }

            rotate = 8;
            for (let j = half + 1; j < cardList.length; j++) {
                copyRotateAmt[j] = rotate;
                rotate += 5;
            }

            setRotateAmt(copyRotateAmt);
        }
        rotateCards();
        
    }, [cardList])

    return (
        <div className={isUser ? 'card-list card-list-user': "card-list card-list-other"}>
            {
                cardList.map((c, i) =>
                    <Card
                        key={i}
                        data={c}
                        rotation={rotateAmt[i]}
                        isUser={isUser}
                    />
                )
            }
        </div>
    )
}