import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'


class FormEdit extends React.Component{
    state = {
        userMod:{
            name: '',
            surname:'',
            mail:'',
            user:'',
            country:'',
            role:'',
            photo:''
        },
        errors:{
            name: '',
            surname:'',
            mail:'',
            user:'',
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
                mail: res.mail,
                user: res.user,
                country: res.country,
                role: res.role,
                photo:res.photo
            }
        })
        console.log(this.state)
        
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
        console.log(this.state)
       
    }

    submit = async e =>{
        
        const errors = this.state.errors
        
        const validEmailRegex = RegExp( 	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        errors.user =
            this.state.userMod.user.length < 2
            ? "The user must be at least 2 characters long! "
            : ""
        
        
        errors.name =
            this.state.userMod.name.length < 2
            ? "The name must be 2 at least characters long! "
            : ""
        errors.surname =
            this.state.userMod.surname.length < 2
            ? "The surname must be at least 2 characters long! "
            : ""
        errors.mail = 
            validEmailRegex.test(this.state.userMod.mail)
            ? ""
            : "Enter a valid email"
        errors.role = 
            this.state.userMod.role == ""
            ? "Select an option"
            : ""
        await this.setState({
            errors
        })
        console.log(this.state)
        if (this.state.errors.user === "" &&   this.state.errors.name=== "" && this.state.errors.surname=== "" && this.state.errors.mail=== "" && this.state.errors.photo=== "" && this.state.errors.country=== "" ){
             const response = await this.props.modAccount(this.state.userMod)
            
             /* if (response.success === true){
               
                
                
            }else{
                if (response.user !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            user:response.user
                        } 
                    })
                }
                if (response.mail !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            mail:response.mail
                        } 
                    })
                }
            } */
             
        }
        
        
        //
    }



    render(){

        return(
            <>
            
            {<div className="signContainer">
                    
                <div className="inputs">
                    <span className={this.state.errors.mail === "" ? "" : "logError"}>{this.state.errors.mail}</span>
                    <label htmlFor="mail">Your mail:</label>
                    <input className="mail" id="mail" type="mail" placeholder= {this.state.userMod.mail} name="mail" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.user === "" ? "" : "logError"}>{this.state.errors.user}</span>
                    <label htmlFor="user">Your user name:</label>
                    <input className="account" id="user" type="text" placeholder={this.state.userMod.user} name="user" onChange={this.getForm}></input>
                    
                    <label htmlFor="name">Your name:</label>
                    <span className={this.state.errors.name === "" ? "" : "logError"}>{this.state.errors.name}</span>
                    <input className="name" id="name" type="text" placeholder={this.state.userMod.name} name="name" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.surname === "" ? "" : "logError"}>{this.state.errors.surname}</span>
                    <label htmlFor="surname">Your surname:</label>
                    <input className="surname" id="surname" type="text" placeholder={this.state.userMod.surname} name="surname" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.country === "" ? "" : "logError"}>{this.state.errors.country}</span>
                    <label htmlFor="country">Your country:</label>
                    <input className="country" id="country" type="text" placeholder={this.state.userMod.country === "Undefined" ? "You dont have a country loaded" : this.state.userMod.country } name="country" onChange={this.getForm}></input>
                    
                    <label htmlFor="country">Your photo:</label>
                    <span className={this.state.errors.photo === "" ? "" : "logError"}>{this.state.errors.photo}</span>
                    <input className="pic" type="text" placeholder={this.state.userMod.photo} name="photo" onChange={this.getForm}></input>

                            <label htmlFor="role">Your role:</label>
                            <select id="role" onChange={this.getForm} className="inputRole" name="role" >
                                <option disabled selected>You want tu buy or sell a house:</option>
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