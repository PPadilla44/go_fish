import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { List } from "../list";
import { Player } from "../player";
import { PlayerInterface } from "./gameInterfaces";
import { fetchGame, selectGame, doComputerTurn, incrementIfOdd } from "./gameSlice";



export const Game = () => {

    const game = useAppSelector(selectGame);
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        dispatch(fetchGame());
    }, [])
    
    const data = game.data;
    const { text, players } = data;
    
        useEffect(() => {
            dispatch(incrementIfOdd())
        },[data])

        console.log(data);
        
    
    if (game.status === "loading") {
        return <p>Loading...</p>
    }


    if (game.status === "failed") {
        return <p>FAILED...</p>
    }

    const renderText = (text: string, i: number) => {
        return (
            <p key={i}>{text}</p>
        )
    }

    const renderPlayer = (player: PlayerInterface, i: number) => {
        return (
            <Player
                key={i}
                index={i}
                data={player}
            />
        )
    }

    return (
        <div className="grid grid-cols-3 grid-rows-3 w-screen h-screen bg-gray-200  place-items-center">
            <List
                data={text}
                renderMethod={renderText}
                className="row-start-2 col-start-2 font-semibold"
            />
            
            { players.map((item, i) => renderPlayer(item, i)) }

        </div>
    );
};
