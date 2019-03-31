import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../../../components/FullPost/FullPost';
import NewPost from '../../../components/NewPost/NewPost';
//import { Link } from 'react-router-dom';


export default class Posts extends Component{
    state = {
        data: [],
        switchposts: null,
        error: false
    }

    componentDidMount(){
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedposts = posts.map(posts => {
                return{
                    ...posts,
                    author: 'Collins',
                }
            })
            this.setState({
                data: updatedposts
            })
        }).catch(error => {
            this.setState({
                error: true
            })
        });
        
    }
    personHandler = (id) => {
       this.props.history.push({pathname: '/' + id});
    }

    render(){
            let posts = <p>Something went wrong</p>
        if(!this.state.error){
            posts = this.state.data.map(post => {
                return ( 
                   <Link to = { '/' + post.id} key={post.id}>
                <Post 
                key={post.id}
                title = {post.title} 
                author ={post.author}
                clicked = {() => this.personHandler(post.id)}
                />
               // </Link>
                )
                
            })
            }
            return(<div>
            <section className="Posts">
            {posts}
            </section>
            <section>
                <FullPost id = {this.state.switchposts}/>
            </section>
            <section>
                <NewPost />
            </section></div>
        )
    }
}