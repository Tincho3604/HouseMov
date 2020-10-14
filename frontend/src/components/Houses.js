import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/popularHouses.css'
import '../styles/comments.css'
import PopularHouse from './PopularHouse'


//Componente que muestra las casas populares en la home
class Houses extends React.Component{
    state={
        firstFour: [],
        secondFour:[],
        viewMore:false
    }

    async componentDidMount(){
        //Cuando el componente se monta
        //Ordeno las casas por cantidad de vistas
        var ordered = await this.props.houses.sort((a,b) => b.views-a.views)
        //Se dividen las ocho casas mas populares en dos arrays
        var first = ordered.slice(0,4)
        var second = ordered.slice(4, 8)
        //Guardo dichos arrays en el state
        this.setState({
            ...this.state,
            firstFour:first,
            secondFour: second
        })

    }
    changeStatus = () =>{
        //Funcion que me permite darle funcionalidad al boton de ver mas/ver menos
        this.setState({
            ...this.state,
            viewMore: !this.state.viewMore
        })
    }
    render(){
 
        return(
            <div className= "containerHouses">
                <div className="firstFour">
                    {this.state.firstFour.map(house =>
                        <PopularHouse house={house}/>
                        )}
                </div>
                
                
                {this.state.viewMore && 
                <>
                <div className ="firstFour">
                    {this.state.secondFour.map(house =>
                        
                        <PopularHouse key= {house._id} house={house}/>
                        
                    )}
                        
                </div>
                <NavLink to ='/buy'><button className="moreBtn">View All</button></NavLink>
                </>}
                <button onClick={this.changeStatus} className="moreBtn">{this.state.viewMore ? "View Less" : "View More"}</button>
            </div>
        )
        
    }

}

export default Houses