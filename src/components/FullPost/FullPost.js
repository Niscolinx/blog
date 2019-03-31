import React, { Component } from 'react';
import axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPosts :null
    }
    componentDidMount(){
        console.log(this.props)
        if(this.props.match.params.id){
            if( !this.state.loadedPosts || (this.state.loadedPosts && this.props.id !== this.state.loadedPosts.id)){
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({
                            loadedPosts: response.data
                        })
                    })
            }
        }
    }
    /* God please help me to conquer everything coming my way, and lead my not into temptation but
    deliver me from all  evil, the rod and thy staff , they comfort me. */

    render () {
        let post = <p style = {{textAlign:"center"}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style = {{textAlign: "center"}}>Loading...</p>
        }
        if(this.state.loadedPosts){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPosts.title}</h1>
                    <p>{this.state.loadedPosts.body}</p>
                    <div className="Edit">
                    
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;