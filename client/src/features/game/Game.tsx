import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { List } from "../list";
import { Player } from "../player";
import { PlayerInterface } from "./gameInterfaces";
import { fetchGame, selectGame, turnCheck } from "./gameSlice";



export const Game = () => {

    const game = useAppSelector(selectGame);
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        dispatch(fetchGame());
    }, [])
    
    const data = game.data;
    const { text, players } = data;
    
        useEffect(() => {
            dispatch(turnCheck())
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
        <div className="game grid place grid-cols-3 grid-rows-3 bg-gray-200">
            <List
                data={text}
                renderMethod={renderText}
                className="row-start-2 col-start-2 font-semibold place-self-center"
            />
            
            { players.map((item, i) => renderPlayer(item, i)) }

        </div>
    );
};
