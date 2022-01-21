import React from 'react'
import { useRef } from 'react';
import { CardInterface } from '../game/gameInterfaces';
import { CardFace } from './CardFace';
import { setSelectedCard } from "../game/gameSlice"
import { useAppDispatch } from '../../app/hooks';

interface Props {
    data: CardInterface;
    rotation: number;
    isUser: boolean;
}

export const Card: React.FC<Props> = ({ data, rotation, isUser }) => {

    const dispatch = useAppDispatch();

    const { point_val: pointVal, suit } = data;

    const suits: any = {
        "spades": "♠︎",
        "hearts": "♥︎",
        "clubs": "♣︎",
        "diamonds": "♦︎"
    };


    const ref = useRef<HTMLDivElement>(null)

    const styles = {
        card: {
            transform: `rotate(${rotation}deg)`
        }
    }


    const onHover = () => {
        if (ref.current) {
            if (ref.current.style.transform.length < 20 && isUser) {
                ref.current.style.transform += `translateY(-15px)`
            }
        }
    }

    const offHover = () => {
        if (isUser && ref.current) {
            ref.current.style.transform = `rotate(${rotation}deg)`
        }
    }

    return (
        <div
            className={isUser ? 
                "card card-user" 
                : 
                "card card-other"}
            ref={ref}
            style={styles.card}
            onMouseOver={onHover}
            onMouseLeave={offHover}
            onClick={() => { isUser && dispatch(setSelectedCard(data)) }}
        >
            <CardFace
                isTop={true}
                pointVal={pointVal}
                suit={suits[suit]}
            />
            <CardFace
                isTop={false}
                pointVal={pointVal}
                suit={suits[suit]}
            />

        </div>
    )
}
