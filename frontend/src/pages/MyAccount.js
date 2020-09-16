import React from 'react'
import Footer from '../components/Footer'
import FormEdit from '../components/FormEdit'
import Header from '../components/Header'

class MyAccount extends React.Component{
    render(){
        return(
            <>
            <Header />
            <FormEdit />
            <Footer/>
            
            </>
        )
    }
}

export default MyAccount