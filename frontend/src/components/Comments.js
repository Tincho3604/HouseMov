import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import '../styles/comments.css'
class Comments extends React.Component{

    state={
        newComment:"",
        user:"",
        house: this.props.idHouse,
        comments:[]
    }
    
    //Componente donde se muestran los comentarios de cada caso

componentDidMount(){
    //Al montarse un componente obtengo los comentarios
    this.getComments()
}

getComments = async () =>{
    //Funcion para obtener los comentarios y guardarlos en el state
    var comments = await this.props.getComments(this.state.house)
    this.setState({
        ...this.state,
        comments
    })
}


getNewComment = (e) =>{
    //Funcion para obtener el texto del input
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name

    this.setState({
        ...this.state,
        [name]: value
    })

}

sendComment = async () =>{
    //Funcion para guardar un comentario
    var response = await this.props.commentItinerary(this.props.token, this.state.house, this.state.newComment)
    this.getComments()
    this.setState({
        ...this.state,
        newComment: ""
    })
}

    render(){

        return(
            <div className="commentsContainer">
                <div className="comments">
                    {this.state.comments.map(comment =>{
                        return(
                            <div className="commentContainer">
                                
                                <div className="nameDelete">
                                    <p className="userName">{comment.user} asked:</p>
                                    
                                </div>

                                <p className="comment">{comment.comment}</p> 
                               
                            </div>
                        )
                    })}
                </div>
                <div className="inputContainer">
                    <input 
                    className="input" 
                        onChange={this.getNewComment} 
                        value={this.state.newComment} 
                        type="text" name="newComment" 
                        placeholder="Insert a comment">
                    </input>
                    <button className="submitBtn" onClick={this.sendComment}>Submit</button>
                </div>
            </div>
        )
    }


}

const mapStateToProps  = (state) =>{
    return{
        token: state.userRed.token,
        user: state.userRed.name
    }
}

const mapDispatchToProps = {
    commentItinerary: userActions.commentItinerary,
    getComments: userActions.getComments,
    /* deleteComment: usersActions.deleteComment */
}


export default connect(mapStateToProps, mapDispatchToProps) (Comments)