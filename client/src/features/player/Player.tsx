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
            "row-start-3 col-start-2",
            
            // LEFT player 2
            "row-start-2 col-start-1",
            
            // Right Plyaer 4
            "row-start-2 col-start-3",
            
            // Player 3
            "row-start-1 col-start-2",
    ]

    const handleSelectUser = () => {
        if (!is_user && turn === 0) {
            dispatch(setSelectedPlayer(data))
        }
    }

    return (
        <div 
        className={`${position[index]} flex flex-col items-center w-80 h-40 
        rounded-full bg-red-600 cursor-pointer `}
        onClick={handleSelectUser}>
            <h1 className='text-3xl font-semibold' >{name}</h1>
            <CardList cardList={hand} isUser={is_user} />
        </div>
    )
}
