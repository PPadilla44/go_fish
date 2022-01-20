import { WritableDraft } from "immer/dist/internal";
import { checkForPairs, filterCards } from "./gameHelpers";
import { CardInterface, GameInterface, PlayerInterface, SaidCaidInterface } from "./gameInterfaces";

export const setPlayerToStore = (data: WritableDraft<GameInterface>, payload: PlayerInterface) => {

    const gameCopy = { ...data };


    // return if a user card isn't chosen
    if (Object.keys(gameCopy.selectedCard as CardInterface).length < 1) {
        gameCopy.text = ["Must choose a card first"]
        return gameCopy;
    }

    if (Object.keys(gameCopy.selectedPlayer as PlayerInterface).length > 1) {
        gameCopy.text = ["Player Chosen Already Chosen"]
        return gameCopy;
    }


    gameCopy.selectedPlayer = payload;
    let text = `${gameCopy.players[0].name} asked ${gameCopy.selectedPlayer.name} for a ${gameCopy.selectedCard?.point_val}`;
    gameCopy.text = [text]

    const foundPair: CardInterface | boolean = checkForPairs(gameCopy.selectedPlayer, gameCopy.selectedCard as CardInterface);

    
    if (!foundPair) {
        const playersCopies = [...gameCopy.players];
        const playerCopy = { ...playersCopies[gameCopy.turn] };
        gameCopy.saidCards = [...gameCopy.saidCards, { card: gameCopy.selectedCard, player: playerCopy } as SaidCaidInterface]
        gameCopy.text = ["GO FISH"];
        let turn = gameCopy.turn;
        gameCopy.turn = turn + 1;
        return gameCopy
    }

    return filterCards(gameCopy, foundPair);
}

export const setCardToStore = (data: WritableDraft<GameInterface>, payload: CardInterface) => {
    return { ...data, selectedCard: payload }
}