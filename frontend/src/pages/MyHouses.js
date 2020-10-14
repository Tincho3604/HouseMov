import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import houseActions from'../redux/actions/houseActions'
import userActions from '../redux/actions/userActions'
import { faMeh, faCheck, faTimes, faDollarSign, faToilet, faTree, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { NavLink } from 'react-router-dom'

import '../styles/myHouses.css'
import Footer from '../components/Footer'

//Pagina donde el usuario ve las casas que cargó
class MyHouses extends React.Component {
    state = {
        data:[]
    }
    
        async componentDidMount(){
            //Cuando el componente se monta verifico que el usuario exista
        await this.props.getUser()
        //Obtengo los datos de las casas asociadas al usuario
        const housesUser = await this.props.getHouseByUser(this.props.token)
        this.setState({
        data:housesUser
        })
    }


    
    render(){

    const datos = this.state.data

        
        if(this.state.data.length === 0) {

            return <h1 style={{textAlign: "center"}}>Loading...</h1>
        } else {

            if(this.state.data.response.length == 0){
                return (
                        
                <>
                    <Header /> 
                    <h3 className="titleHouses">My houses published</h3>
                    <div className="housisContainer">
                        <img src={require("../images/casa.png")}></img>
                        <img src={require("../images/casa(1).png")}></img>
                        <img src={require("../images/casa(3).png")}></img>
                        <img src={require("../images/casa(5).png")}></img>
                        <img src={require("../images/casa(6).png")}></img>
                        <img src={require("../images/casa(4).png")}></img>
                        <img src={require("../images/casa(7).png")}></img>
                        <img src={require("../images/casa(2).png")}></img>
                    </div>
                    <div className="message">
                        <h1 className="titmes">You dont upload any house yet</h1>
                        <FontAwesomeIcon className="iconmes" icon={faMeh} />
                        <h3 className="submes">Please go to "Sell a house" section and upload one</h3>
                    </div>
                    <div className="housisContainer">
                        <img src={require("../images/casa.png")}></img>
                        <img src={require("../images/casa(1).png")}></img>
                        <img src={require("../images/casa(2).png")}></img>
                        <img src={require("../images/casa(3).png")}></img>
                        <img src={require("../images/casa(5).png")}></img>
                        <img src={require("../images/casa(6).png")}></img>
                        <img src={require("../images/casa(7).png")}></img>
                        <img src={require("../images/casa(4).png")}></img>
                    </div>
                    <Footer/>
                </>
                )
            }else{
            return (
                <>
                <Header />    
                <h3 className="titleHouses">My houses published</h3>
                <div className="houseContainer1">
                {datos.response.map(house => {
                    return (
                        
                        <div className="house1">
                            <div className="divHouse1">
                                <img src={house.photo}/>
                                <div className="details1" >
                                    <p>{house.address}</p>
                                    <p>{house.neighborhood}</p>
                                    <p><FontAwesomeIcon icon={faDollarSign} />{house.price} USD</p>
                                    <p><FontAwesomeIcon icon={faEye} /> {house.views}</p>
                                </div>
                            </div>
                            <NavLink to={`/modifyHouse/${house._id}`}><button className="send1">Edit Info</button></NavLink>
                        </div>
                        
                        
                    )
                })}  
                </div>
                <Footer/>
                </>
            )
        }
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
