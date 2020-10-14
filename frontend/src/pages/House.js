import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import houseActions from '../redux/actions/houseActions'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import '../styles/house.css'
import Header from '../components/Header'
import { faBed, faCheck, faTimes, faDollarSign, faToilet, faTree, faMapMarked, faMapMarkerAlt, faEnvelope, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/Footer'
import Comments from '../components/Comments'
import '../styles/comments.css'


//Page para ver la información de una casa en particular
class House extends React.Component {

    state = {
        house: null,
        user: null
    }
    async componentDidMount() {
        const idSearch = this.props.match.params.id
        this.props.uploadViews(idSearch)
        //Subo la cantidad de vistas de la casa
        const response = await this.props.getHouseById(idSearch)
        //Obtengo la casa y la guardo en el state
        this.setState({
            ...this.state,
            house: response.house,
            user: response.dataUser
        })
    }

    render() {

  

        if (this.state.house === undefined || this.state.house ===null) {
            return null
        }
        
        return (
            <>
                <Header />
                <h3 className="titleHouses">House Details</h3>
                <div className="details__house">
                    <p><FontAwesomeIcon icon={faMapMarked} /> {this.state.house.address}</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {this.state.house.neighborhood}</p>
                    <p>Square Meters: {this.state.house.squareMeters}m2</p>
                    <p><FontAwesomeIcon icon={faToilet} /> {this.state.house.bathrooms}</p>
                    <p><FontAwesomeIcon icon={faBed} /> {this.state.house.bedrooms}</p>
                    <p>{this.state.house.garden ? <> <FontAwesomeIcon icon={faTree} /> <FontAwesomeIcon icon={faCheck} /> </> : <><FontAwesomeIcon icon={faTree} /> <FontAwesomeIcon icon={faTimes} /> </>}</p>
                </div>
                <div className="price__house">
                    <span>${price} USD</span>
                </div>
                <AliceCarousel mouseTrackingDisabled touchTrackingEnabled={true} autoPlay autoPlayInterval={4000}>
                    <img src={this.state.house.photo} className="photo__house" />
                    <img src={this.state.house.photo2} className="photo__house" />
                </AliceCarousel>
                
                
                <div className="seller__details">
    
                    <img src={this.state.user.photo} alt="" />
                    <p><FontAwesomeIcon icon={faEnvelope} />{"  "}{this.state.user.mail}</p>
                    <p><FontAwesomeIcon icon={faUserAlt} />{"  "}{this.state.user.name}, {this.state.user.surname}</p>
                </div>
                <div className="commentsContainer ">
                    <h4 className="title">Ask a question about this house</h4>
                    <Comments idHouse = {this.props.match.params.id}/>
                 </div>
                
                
                <Footer />
            </>


        )
    }
}

const mapDispatchToProps = {
    getHouseById: houseActions.getHouseById,
    uploadViews: houseActions.uploadViews
}


export default connect(null, mapDispatchToProps)(House)