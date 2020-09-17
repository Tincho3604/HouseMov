import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import houseActions from'../redux/actions/houseActions'
import userActions from '../redux/actions/userActions'
import { faBed, faCheck, faTimes, faDollarSign, faToilet, faTree, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { NavLink } from 'react-router-dom'

import '../styles/myHouses.css'

class MyHouses extends React.Component {
    state = {
        data:[]
    }
    
        async componentDidMount(){
        await this.props.getUser()
        const housesUser = await this.props.getHouseByUser(this.props.token)
        this.setState({
        data:housesUser
        })
    }


    
    render(){

    const datos = this.state.data

        
        if(this.state.data.length === 0) {

            return <h1>Loading...</h1>
        } else {
            return (
                <>
                <Header />    
                <h3 className="titleHouses">My houses published</h3>
                <div className="houseContainer1">
                {datos.response.map(info => {
                    return (
                        
                        <div className="house1">
                            <div className="divHouse1">
                                <img src={info.photo}/>
                                <div className="details1" >
                                    <p>{info.address}</p>
                                    <p>{info.neighborhood}</p>
                                    <p><FontAwesomeIcon icon={faDollarSign} />{info.price} USD</p>
                                    <p><FontAwesomeIcon icon={faEye} /> {info.views}</p>
                                </div>
                            </div>
                            <NavLink to={`/modifyHouse/${info._id}`}><button className="send1">Edit Info</button></NavLink>
                        </div>
                        
                        
                    )
                })}  
                </div>
                </>
            )
        }
    }
}


const mapStateToProps = (state) =>{
    return{
        token: state.userRed.token,
        userLoged: state.user
    }
}

const mapDispatchToProps = {
    getHouseByUser: houseActions.getHouseByUser,
    getUser: userActions.getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(MyHouses)
