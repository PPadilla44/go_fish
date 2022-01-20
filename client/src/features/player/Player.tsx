import React from 'react';
import { PlayerInterface } from '../game/gameInterfaces';
import { CardList } from "../deck"
import { setSelectedPlayer } from '../game/gameSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props {
    index: number,
    data: PlayerInterface
}

export const Player: React.FC<Props> = ({ index, data }) => {

    const dispatch = useAppDispatch();
    const turn = useSelector((state: RootState) => state.game.data.turn)
    console.log(turn);


    const { hand, name, is_user } = data;

    const position = [
        {
            left: "450px",
            top: "500px"
        },
        {
            left: "450px",
            top: "0px"
        },
        {
            left: "50px",
            top: "300px"
        },
        {
            left: "850px",
            top: "300px"
        },
        {
            left: "450px",
            top: "25px"
        },
    ]

    const handleSelectUser = () => {
        if (!is_user && turn === 0) {
            dispatch(setSelectedPlayer(data))
        }
    }


    const styles = {
        player: { ...position[index] }
    }

    return (
        <div className={is_user ? ` bg-red-900 player` : `player bg-red-600`} style={styles.player} onClick={handleSelectUser}>
            <h1>{name}</h1>
            <CardList cardList={hand} isUser={is_user} />
        </div>
    )
}
