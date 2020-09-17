import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'




class FormEdit extends React.Component{
    state = {
        userMod:{
            name: '',
            surname:'',
            country:'',
            role:'',
            photo:''
        },
        errors:{
            name: '',
            surname:'',
            country:'',
            role:'',
            photo:''
        }
    }
    

    async componentDidMount(){
  

        const res = await this.props.getUser(this.props.token)
        this.setState({
            
            userMod:{
                ...this.state.userMod,
                name: res.name,
                surname: res.surname,
                country: res.country,
                role: res.role,
                photo:res.photo
            }
        })
       
        
    }

    getForm = async e =>{
        const property = e.target.name
        const value = e.target.value
        await this.setState({
            userMod:{
                ...this.state.userMod,
                [property]: value
            }
        })
     
       
    }

    submit = async (e, props) =>{
        
        const errors = this.state.errors
        
        const validEmailRegex = RegExp( 	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


        errors.name =
            this.state.userMod.name.length < 2
            ? "The name must be 2 at least characters long! "
            : ""
        errors.surname =
            this.state.userMod.surname.length < 2
            ? "The surname must be at least 2 characters long! "
            : ""

        errors.role = 
            this.state.userMod.role == ""
            ? "Select an option"
            : ""
        await this.setState({
            errors
        })
    
        if ( this.state.errors.name=== "" && this.state.errors.surname=== "" &&  this.state.errors.photo=== "" && this.state.errors.country=== "" ){

             const response = await this.props.modAccount(this.props.token, this.state.userMod)
         
             if (response.success === true){
                await Swal.fire({  title: 'User Modified!',  text: `enjoy`,  icon: 'success',  showConfirmButton: false, timer: 3000, allowOutsideClick: false})
                this.props.history.push('/')
            }else{
                await Swal.fire({  title: 'User was not modified!',  text: `Due to error, try again`,  icon: 'warning',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
                this.props.history.push('/')
            }
        } 
        
    }



    render(){
  
        return(
            <>
            
            {<div className="signContainer">
                    
                <div className="inputs">
                    
                    
                    <label className="labelEdit" htmlFor="name">Your name:</label>
                    <span className={this.state.errors.name === "" ? "" : "logError"}>{this.state.errors.name}</span>
                    <input className="name" id="name" type="text" value={this.state.userMod.name} name="name" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.surname === "" ? "" : "logError"}>{this.state.errors.surname}</span>
                    <label className="labelEdit" htmlFor="surname">Your surname:</label>
                    <input className="surname" id="surname" type="text" value={this.state.userMod.surname} name="surname" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.country === "" ? "" : "logError"}>{this.state.errors.country}</span>
                    <label className="labelEdit" htmlFor="country">Your country:</label>
                    <input className="country" id="country" type="text" placeholder={this.state.userMod.country === "Undefined" || this.state.userMod.country === "undefined" ? "You dont have a country loaded" : this.state.userMod.country } name="country" onChange={this.getForm}></input>
                    
                    <label className="labelEdit" htmlFor="country">Your photo:</label>
                    <span className={this.state.errors.photo === "" ? "" : "logError"}>{this.state.errors.photo}</span>
                    <input className="pic" type="text" value={this.state.userMod.photo} name="photo" onChange={this.getForm}></input>

                            <label className="labelEdit" htmlFor="role">Your want to:</label>
                            <select value={this.state.userMod.role} id="role" onChange={this.getForm} className="inputRole" name="role" >
                                <option disabled >You want tu buy or sell a house:</option>
                                <option value="buy"className="option">Buy a House</option>
                                <option value="sell" className="option">Sell a House</option>
                            </select>
                </div>
                    <button className="send" onClick={this.submit}>Upload your account</button>
                    
                
            </div>}
            </>
        )
    }
}

const mapDispatchToProps = {
    getUser: userActions.getFullUser,
    modAccount: userActions.modAccount
}
const mapStateToProps = (state) =>{
    return{
        token: state.userRed.token
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (FormEdit)