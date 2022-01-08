import React from 'react'
import { useRef } from 'react';

const Card = (props) => {

    const { pointVal, suit, rotation } = props;
    const ref = useRef(null)

    const styles = {
        card: {
            transform: `rotate(${rotation}deg)`
        }
    }


    const onHover = (e) => {
        if(ref.current.style.transform.length < 20) {
            ref.current.style.transform += `translateY(-15px)`
        }
    }

    const offHover = () => {
        ref.current.style.transform = `rotate(${rotation}deg)`
    }

    return (
        <div className='card' ref={ref} style={styles.card} onMouseOver={onHover} onMouseLeave={offHover}>
            <h4>{pointVal}</h4>
            <h4>{suit}</h4>
        </div>
    )
}


export default Card
