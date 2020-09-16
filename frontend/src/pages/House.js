import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import houseActions from '../redux/actions/houseActions'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import '../styles/house.css'
import Header from '../components/Header'
import { faBed, faCheck, faCross, faDollarSign, faToilet, faTree, faBookHeart, faAddressCard, faMapMarked, faMapMarkedAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/Footer'

class House extends React.Component {

    state = {
        house: null,
        user: null
    }
    async componentDidMount() {
        const idSearch = this.props.match.params.id
        this.props.uploadViews(idSearch)
        const response = await this.props.getHouseById(idSearch)
        console.log(response)
        this.setState({
            ...this.state,
            house: response.house,
            user: response.dataUser
        })
    }

    render() {

        console.log(this.state.house)

        if (this.state.house === null) {
            return null
        } else if (this.state.house !== null) {
            var address = this.state.house.address
            var photo = this.state.house.photo
            var photo2 = this.state.house.photo2
            var bathrooms = this.state.house.bathrooms
            var squareMeters = this.state.house.squareMeters
            var bedrooms = this.state.house.bedrooms
            var garden = this.state.house.garden
            var neighborhood = this.state.house.neighborhood
            var price = this.state.house.price

            console.log(address)
        }

        return (
            <>
                <Header />

                <div className ="seller__details">
                    <p>{this.state.user.mail}</p>
                    <p>{this.state.user.name}, {this.state.user.surname}</p>
                </div>
                <AliceCarousel mouseTrackingDisabled  touchTrackingEnabled={true}  autoPlay autoPlayInterval={4000}>
                    <img src={photo} className="photo__house" />
                    <img src={photo2} className="photo__house" />
                </AliceCarousel>

                <div className="details__house">
                    <p><FontAwesomeIcon icon={faMapMarked} /> {address}</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {neighborhood}</p>
                    <p>Square Meters: {squareMeters}m2</p>
                    <p><FontAwesomeIcon icon={faToilet} /> {bathrooms}</p>
                    <p><FontAwesomeIcon icon={faBed} /> {bedrooms}</p>
                    <p>{garden ? <><FontAwesomeIcon icon={faCheck} /> <FontAwesomeIcon icon={faTree} /></> : <><FontAwesomeIcon icon={faCross} /> <FontAwesomeIcon icon={faTree} /></>}</p>
                </div>
                <div className="price__house">
                    <span>${price} USD</span>
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