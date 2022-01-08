import React, { useState } from 'react';
import { useEffect } from 'react';
import Card from './Card';



const CardList = (props) => {

    const { cardList } = props;
    const [rotateAmt, setRotateAmt] = useState(new Array(cardList.length));

    const rotateCards = () => {

        let half = Math.floor( cardList.length / 2 );
        let copyRotateAmt = [ ...rotateAmt ];

        let rotate = 0;
        for(let i = half; i >= 0; i--) {
            copyRotateAmt[i] = rotate;
            rotate += 5;
        }

        rotate = -5;
        for(let j = half + 1; j < cardList.length; j++) {
            copyRotateAmt[j] = rotate;
            rotate -= 5;
        }

        setRotateAmt(copyRotateAmt);
    }

    useEffect(() => {
        rotateCards()
    },[cardList])

    return (
        <div className='card-list'>
            {
                cardList.map((c, i) =>
                    <Card
                        key={i}
                        index={i}
                        pointVal={c.point_val}
                        suit={c.suit}
                        rotation={rotateAmt[i]}
                    />
                )
            }
        </div>
    )
}

export default CardList
