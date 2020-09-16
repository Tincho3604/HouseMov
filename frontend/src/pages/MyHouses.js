import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import houseActions from'../redux/actions/houseActions'
import userActions from '../redux/actions/userActions'
import { faBed, faCheck, faCross, faDollarSign, faToilet, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

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

        
            if(this.state.data.length === 0){
            console.log("Entraste a la primera opccion") 
            return <h1>Loading...</h1>
        }else{
    return (
    
    <>
    <Header />   
    <h3 className="titleHouses">My houses published</h3>
    {console.log("Entraste a la segunda opccion")}
      {datos.response.map(info => {
        return (
      <>
    
    <div className="house">
    <AliceCarousel mouseTrackingEnabled touchTrackingEnabled={true} autoPlay autoPlayInterval={4000}> 
        <img src={info.photo}/>
        <img src={info.photo2}/>
    </AliceCarousel>    
            <div className="details">
                <p>{info.address}</p>
                <p>{info.neighborhood}</p>
            </div>
            <div className="details">
                <p><FontAwesomeIcon icon={faToilet} /> {info.bathrooms}</p>
                <p><FontAwesomeIcon icon={faBed} /> {info.bedrooms}</p>
                <p><FontAwesomeIcon icon={faDollarSign} />{info.price} USD</p>
                <p>{info.garden ? <><FontAwesomeIcon icon={faCheck} /> <FontAwesomeIcon icon={faTree} /></>: <><FontAwesomeIcon icon={faCross} /> <FontAwesomeIcon icon={faTree} /></>}</p>
            </div>
        </div>
                 
                
            
      </>     
               
            
            
         
        )
    })}  
    </>
                )
            }
        }
    }


const mapStateToProps = (state) =>{
    return{
        token: state.userRed.token,
        myHouses: state.houseRed.myHouses
    }
}

const mapDispatchToProps = {
    getHouseByUser: houseActions.getHouseByUser,
    getUser: userActions.getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(MyHouses)