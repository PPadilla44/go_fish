import React from 'react';
import { PlayerInterface } from '../game/gameInterfaces';
import { CardList } from "../deck"
import { setSelectedPlayer } from '../game/gameSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props {
    index: number;
    data: PlayerInterface;
}

export const Player: React.FC<Props> = ({ index, data }) => {

    const dispatch = useAppDispatch();
    const turn = useSelector((state: RootState) => state.game.data.turn)


    const { hand, name, is_user } = data;

    const position : string[] = [
            // Bottom PLayer 1
            "row-start-3 col-start-2 self-end justify-self-center",
            
            // LEFT player 2
            "row-start-2 col-start-1 self-center justify-self-end",
            
            // TOP Player 3
            "row-start-1 col-start-2 self-start justify-self-center",
            
            // Right Player 4
            "row-start-2 col-start-3 self-center justify-self-start",
    ]
    const cardsListClass = [
        "",
        "rotate-90",
        "rotate-180",
        "-rotate-90",
    ]

    const handleSelectUser = () => {
        if (!is_user && turn === 0) {
            dispatch(setSelectedPlayer(data))
        }
    }

    return (
        <div 
        className={`${position[index]} flex flex-col items-center w-60 h-32
        cursor-pointer relative`}
        onClick={handleSelectUser}>
            <h1 className='text-3xl font-semibold absolute right-0 bottom-0' >{name}</h1>
            <CardList cardList={hand} isUser={is_user} className={cardsListClass[index]} />
        </div>
    )
}
