import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from '../../axios';


class Blog extends Component {
    state = {
        data: [],
        switchposts: null,
        error: false
    }
    componentDidMount(){
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 3);
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
        this.setState({
            switchposts: id
        })
    }

    render () {
        let posts = <p>Something went wrong</p>
        if(!this.state.error){
        posts = this.state.data.map(post => {
            return <Post 
            title = {post.title} 
            key={post.id}
            author ={post.author}
            clicked = {() => this.personHandler(post.id)}
            />

        }
    )}
        

        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><a href = '/'>Home</a></li>
                            <li><a href = '/new-post'>New post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.switchposts}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;