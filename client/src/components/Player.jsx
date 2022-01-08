import React from 'react';
import CardList from './CardList';

const Player = (props) => {

    const { index, name, hand } = props;

    const position = {
        "0" : {
            backgroundColor: "blue",
            left: "300px",
            top: "500px"
        },
        "1" : {
            backgroundColor: "blue",
            left: "0px",
            top: "300px"
        },
        "2" : {
            backgroundColor: "blue",
            left: "683px",
            top: "300px"
        },
        "3" : {
            backgroundColor: "blue",
            left: "300px",
            top: "0px"
        },

    }

    
    const styles = {
        test : position[index]
    }

    return (
        <div className='player' style={ styles.test }>
            <h1>{ name }</h1>
            <CardList cardList={hand} />
        </div>
    )
}

export default Player
