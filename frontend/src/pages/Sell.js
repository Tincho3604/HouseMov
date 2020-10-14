import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FormSell from '../components/FormSell'
import { connect } from 'react-redux'
const Sell = (props) =>{

  //Pagina para cargar una casa
    return(
        <>
        <Header />
        <FormSell />
        <Footer/>
        </>
    )
}

const mapStateToProps =(state) =>{
    return{
        userLogued: state.userLogued
    }
}

export default connect (mapStateToProps) (Sell)