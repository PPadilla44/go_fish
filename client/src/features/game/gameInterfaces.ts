
export interface GameInterface {
    cards: Array<CardInterface>;
    players: Array<PlayerInterface>;
    text: Array<string>;
    saidCards: Array<SaidCaidInterface>;
    selectedCard?: CardInterface;
    selectedPlayer?: PlayerInterface;
    turn: number
}

export interface CardInterface {
    id: string;
    point_val: number;
    string_val: string;
    suit: string;
}

export interface PlayerInterface {
    id: string;
    name: "string";
    hand: Array<CardInterface>;
    is_user: boolean;
}

export interface SaidCaidInterface {
    card: CardInterface;
    player: PlayerInterface
}

