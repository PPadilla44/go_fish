import React from 'react'
import { useRef } from 'react';
import { connect } from 'react-redux';
import { setCard } from '../store/utils/thunkCreators';
import CardFace from './CardFace';

const Card = (props) => {

    const { data, rotation, setCard, isUser } = props
    const { point_val: pointVal, suit } = data;

    const suits = {
        "spades": "♠︎",
        "hearts": "♥︎",
        "clubs": "♣︎",
        "diamonds": "♦︎"
    };


    const ref = useRef(null)

    const styles = {
        card: {
            transform: `rotate(${rotation}deg)`
        }
    }


    const onHover = (e) => {
        if (ref.current.style.transform.length < 20 && isUser) {
            ref.current.style.transform += `translateY(-15px)`
        }
    }

    const offHover = () => {
        if(isUser) {
            ref.current.style.transform = `rotate(${rotation}deg)`
        }
    }

    return (
        <div className={isUser ? "card card-user" : "card card-other"}
            ref={ref}
            style={styles.card}
            onMouseOver={onHover}
            onMouseLeave={offHover}
            onClick={() => setCard(data, isUser)}
        >
            <CardFace
                top={true}
                pointVal={pointVal}
                suit={suits[suit]}
            />
            <CardFace
                top={false}
                pointVal={pointVal}
                suit={suits[suit]}
            />

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card, isUser) => {
            dispatch(setCard(card, isUser))
        }
    }
}


export default connect(null, mapDispatchToProps)(Card);
