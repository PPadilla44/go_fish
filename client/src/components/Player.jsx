import React from 'react';
import { connect } from 'react-redux';
import CardList from './CardList';
import { setPlayer } from '../store/utils/thunkCreators';

const Player = (props) => {

    const { index, data, setPlayer } = props;
    const { hand, name, is_user } = data;

    const position = {
        "0" : {
            left: "450px",
            top: "500px"
        },
        "1" : {
            left: "50px",
            top: "300px"
        },
        "2" : {
            left: "850px",
            top: "300px"
        },
        "3" : {
            left: "450px",
            top: "25px"
        },

    }

    
    const styles = {
        player : position[index]
    }

    return (
        <div className='player' style={ styles.player } onClick={() => setPlayer(data)}>
            <h1>{ name }</h1>
            <CardList cardList={hand} isUser={is_user}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPlayer : (player) => {
            dispatch(setPlayer(player))
        }
    }
}

export default connect(null, mapDispatchToProps)(Player);
