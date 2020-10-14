import React from 'react'
import '../styles/popularHouses.css'
import { faBed, faCheck, faTimes, faDollarSign, faToilet, faTree, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//componente que muestra los detalles de una casa en la home

const PopularHouse = (props) =>{

    return (
        <>
        <div className="house">
            <img src={props.house.photo}></img>
            <div className="details">
                <p><FontAwesomeIcon icon={faToilet} /> {props.house.bathrooms}</p>
                <p><FontAwesomeIcon icon={faBed} /> {props.house.bedrooms}</p>
                <p><FontAwesomeIcon icon={faMoneyBillAlt}/> {props.house.price} USD</p>
                <p>{props.house.garden ? <> <FontAwesomeIcon icon={faTree} /><FontAwesomeIcon icon={faCheck} /></>: <><FontAwesomeIcon icon={faTree} /> <FontAwesomeIcon icon={faTimes} /></>}</p>
            </div>
        </div>
         </>
    )

}

export default PopularHouse