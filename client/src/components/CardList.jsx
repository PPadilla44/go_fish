import React, { useState } from 'react';
import { useEffect } from 'react';
import Card from './Card';



const CardList = (props) => {

    const { cardList } = props;
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
        
    }, [cardList, rotateAmt])

    return (
        <div className='card-list'>
            {
                cardList.map((c, i) =>
                    <Card
                        key={i}
                        data={c}
                        rotation={rotateAmt[i]}
                    />
                )
            }
        </div>
    )
}

export default CardList
