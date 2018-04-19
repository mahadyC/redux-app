import React, { Component } from 'react';
import './App.css';
import *as API from './APIs';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoriesFetchData,
  postsFetchData,
  reactCategoryPostsFetchData,
  reduxCategoryPostsFetchData,
  reactNativeCategoryPostsFetchData,
  postDelete,
  votePost,
  editPost,
  addPost,
  fetchComments,
  voteComment,
  deleteComment,
  addComment,
  editComment

   } from './actions';


class App extends Component {

  state = {
    title: "",
    author: "",
    category: "",
    body: "",
    postFormVisible: false,
    editFormVisible: false,
    editPostId: "",
    editTitle: "",
    editBody: "",
    sortOption: "",
    commentFormVisible:false,
    commentAuthor: "",
    commentBody: "",
    editCommentId: "",
    commentEditBody: "",
    deletedPostId: ""
  }

  componentDidMount() {

    this.props.fetchCategories()
    this.props.fetchPosts()
    this.props.fetchReactPosts()
    this.props.fetchReduxPosts()
    this.props.fetchReactNativePosts()
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }

  /*------Form---------- */
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value})
  }

  /*------Post-Form---------- */

  handleSubmit(event) {
    event.preventDefault();
    const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let postObj = {}
    postObj =
     {
      id: uuid ,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    this.props.addPost(postObj)
    this.props.fetchPosts()

    event.target.reset();
    this.setState({postFormVisible: false})
    this.setState({editFormVisible: false})
    this.props.fetchReactPosts()
    this.props.fetchReduxPosts()
    this.props.fetchReactNativePosts()
  }

  handleEditSubmit(event, post) {
    event.preventDefault();
    let editPost = {}

    this.state.editTitle && this.state.editBody ?
    editPost = {
      title: this.state.editTitle,
      body: this.state.editBody
    }
    : this.state.editTitle && !this.state.editBody ?
    editPost = {
      title: this.state.editTitle,
      body: post.body
    }
    : !this.state.editTitle && this.state.editBody ?
    editPost = {
      title: post.title,
      body: this.state.editBody
    }
    :
    editPost = {
      title: post.title,
      body: post.body
    }

    this.props.editPost(post.id, editPost)
    this.props.fetchPosts();
    event.target.reset();
    this.setState({editFormVisible: false, editPostId: ""})
    this.props.fetchReactPosts()
    this.props.fetchReduxPosts()
    this.props.fetchReactNativePosts()

  }

  deletingPost = (postId) => {
    this.props.deletePost(postId)
    this.setState({deletedPostId: postId})
    this.props.fetchPosts()
    this.props.fetchReactPosts()
    this.props.fetchReduxPosts()
    this.props.fetchReactNativePosts()
  }

  upVotePostFromMainPage = (postId) => {
    const optionParam = { option: "upVote"}
    this.props.votePost(postId, optionParam)
    this.props.fetchPosts()
  }

  downVotePostFromMainPage = (postId) => {
    const optionParam = { option: "downVote"}
    this.props.votePost(postId, optionParam)
    this.props.fetchPosts()
  }

  upVotePostFromReactCategoryPage = (postId) => {
    const optionParam = { option: "upVote"}
    API.votePost(postId, optionParam)
    this.props.fetchReactPosts()
  }

  downVotePostFromReactCategoryPage = (postId) => {
    const optionParam = { option: "downVote"}
    API.votePost(postId, optionParam)
    this.props.fetchReactPosts()
  }

  upVotePostFromReduxCategoryPage = (postId) => {
    const optionParam = { option: "upVote"}
    API.votePost(postId, optionParam)
    this.props.fetchReduxPosts()
  }

  downVotePostFromReduxCategoryPage = (postId) => {
    const optionParam = { option: "downVote"}
    API.votePost(postId, optionParam)
    this.props.fetchReduxPosts()
  }

  upVotePostFromReactNativeCategoryPage = (postId) => {
    const optionParam = { option: "upVote"}
    API.votePost(postId, optionParam)
    this.props.fetchReactNativePosts()
  }

  downVotePostFromReactNativeCategoryPage = (postId) => {
    const optionParam = { option: "downVote"}
    API.votePost(postId, optionParam)
    this.props.fetchReactNativePosts()
  }

  toggleEditForm = (postId) => {
    (!this.state.editFormVisible) ? this.setState({editFormVisible: true, editPostId: postId}) : this.setState({editFormVisible: false, editPostId: ""})
  }

  sortHandle = (event) => {
    this.setState({sortOption: event.target.value})
  }

  timeToString = (timeInMilliseconds) => {
    const date = new Date(timeInMilliseconds).toDateString()
    return date
  }

  /*---------Comment-Form----------*/

  commentSubmit(event, postId) {
    event.preventDefault();
    const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let commentObj = {
      id: uuid,
      timestamp: Date.now(),
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      parentId: postId
    }

    this.props.addComment(commentObj)
    this.props.fetchCommentsList(postId)
    this.props.fetchPosts()
    event.target.reset();
    this.setState({commentFormVisible: false})
  }

  handleCommentEditSubmit(event, comment) {
    event.preventDefault();
    let editCommentObj = {};
    this.state.commentEditBody ?
    editCommentObj = {
      timestamp: Date.now(),
      body: this.state.commentEditBody
    }
    :
    editCommentObj = {
      timestamp: Date.now(),
      body: comment.body
    }

    this.props.editComment(comment.id, editCommentObj)
    this.props.fetchCommentsList(comment.parentId)
    event.target.reset();
    this.setState({editFormVisible: false, editCommentId: ""})
  }

  toggleCommentEditForm = (commentId) => {
    (!this.state.editFormVisible) ? this.setState({editFormVisible: true, editCommentId: commentId}) : this.setState({editFormVisible: false, editCommentId: ""})
  }

  getCommentsList = (postId) => {
    this.props.fetchCommentsList(postId)
  }

  upVoteComment = (commentId, parentId) => {
    const optionParam = { option: "upVote"}
    this.props.voteComment(commentId, optionParam)
    this.props.fetchCommentsList(parentId)
  }

  downVoteComment = (commentId, parentId) => {
    const optionParam = { option: "downVote"}
    this.props.voteComment(commentId, optionParam)
    this.props.fetchCommentsList(parentId)
  }

  deletingComment = (commentId, parentId) => {
    this.props.deleteComment(commentId)
    this.props.fetchCommentsList(parentId)
    this.props.fetchPosts()
  }

  render() {
        /*----------Sort-Posts----------*/
        let sortPosts = []
        let sortReactPosts = []
        let sortReduxPosts = []
        let sortReactNativePosts = []
        this.state.sortOption === 'score' ? sortPosts = this.props.posts.sort((firstPost, secondPost) => firstPost.voteScore - secondPost.voteScore) : sortPosts = this.props.posts.sort((firstPost, secondPost) => firstPost.timestamp - secondPost.timestamp)
        sortPosts.reverse()
        this.state.sortOption === 'score' ? sortReactPosts = this.props.reactPosts.sort((firstPost, secondPost) => firstPost.voteScore - secondPost.voteScore) : sortReactPosts = this.props.reactPosts.sort((firstPost, secondPost) => firstPost.timestamp - secondPost.timestamp)
        sortReactPosts.reverse()
        this.state.sortOption === 'score' ? sortReduxPosts = this.props.reduxPosts.sort((firstPost, secondPost) => firstPost.voteScore - secondPost.voteScore) : sortReduxPosts = this.props.reduxPosts.sort((firstPost, secondPost) => firstPost.timestamp - secondPost.timestamp)
        sortReduxPosts.reverse()
        this.state.sortOption === 'score' ? sortReactNativePosts = this.props.reactNativePosts.sort((firstPost, secondPost) => firstPost.voteScore - secondPost.voteScore) : sortReactNativePosts = this.props.reactNativePosts.sort((firstPost, secondPost) => firstPost.timestamp - secondPost.timestamp)
        sortReactNativePosts.reverse()

        const find = id => this.props.posts.find(post => post.id === id);
        /*-----Error-Page------*/
        const Error = ({ match }) => {
          const id = find(match.params.id)
          return (
             !id ? <h1>Page Not Found</h1> : ""
          )
        }
    return (
      <div className="App">
        <div className="navigation-bar">
          <ol className="categoriesList">
            <a href="/"> HOME </a>
            {this.props.categories.map(category =>(
              <a href={`/${category.name}`} className="categoryLinks" key={category.name}>
                <li className="category" key={category.name}>{category.name.toUpperCase()}</li>
              </a>
            ))
            }
          </ol>
        </div>

        <Route exact path="/" render={() => (
          <div className="rootView">
            <div className="listedPosts">
              <h3>Posts List</h3>
              <button onClick={()=> (!this.state.postFormVisible) ? this.setState({postFormVisible: true}) : this.setState({postFormVisible: false})}>Add New Post</button>
              <select value={this.state.sortOption} onChange={this.sortHandle}>
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="score">Score</option>
              </select>
              {(this.state.postFormVisible) ?
                (<div className="formContainer">
                  <form onSubmit={this.handleSubmit}>
                    <ul className="form-style">
                      <li>
                        <label>Title <span className="required">*</span></label>
                        <input type="text" name="title" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Author <span className="required">*</span></label>
                        <input type="text" name="author" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Body <span className="required">*</span></label>
                        <textarea type="text" name="body" className="field-long field-textarea" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Category</label>
                        <select onChange={this.handleCategoryChange} className="form-select" required>
                          <option value="">Select</option>
                          <option value="react">React</option>
                          <option value="redux">Redux</option>
                          <option value="react native">React Native</option>
                        </select>
                      </li>
                      <li>
                        <input type="submit" value="Submit" />
                      </li>
                    </ul>
                  </form>
                </div>) : ""
              }

              <ol className="posts-list">
                {this.props.posts.map(post => (
                  <div className="post" key={post.id}>
                    <div className="post-count">
                      <div className="up-vote">
                        <a onClick={(e) => this.upVotePostFromMainPage(post.id)}><i className="up"></i></a>
                      </div>
                      <div>{post.voteScore}</div>
                      <div className="down-vote">
                        <a onClick={(e) => this.downVotePostFromMainPage(post.id)}><i className="down"></i></a>
                      </div>
                    </div>
                    <div className="post-body">
                      <p className="post-title">
                        <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)} >{post.title}</Link>
                      </p>
                      <p className="tagline">
                        submitted <time>{this.timeToString(post.timestamp)}</time> by { post.author}
                      </p>
                      <ul className="flat-list-buttons">
                        <li className="first">
                          <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)}>{post.commentCount} comments</Link>
                        </li>
                        <li className="delete-button">
                          <a onClick={(e) => this.deletingPost(post.id)}>delete</a>
                        </li>
                        <li className="edit-button">
                          <a onClick={(e)=> this.toggleEditForm(post.id) }>edit</a>
                        </li>
                      </ul>

                      {(this.state.editFormVisible && this.state.editPostId === post.id) ?
                        (<div className="formContainer">
                          <form onSubmit={(e)=> this.handleEditSubmit(e, post)}>

                            <ul className="form-style">
                              <li>
                                <label>Title</label>
                                <input type="text" name="editTitle" className="field-long" defaultValue={post.title} onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <label>Body</label>
                                <textarea type="text" name="editBody" className="field-long field-textarea" defaultValue={post.body}  onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <input type="submit" value="Submit" />
                              </li>
                            </ul>
                          </form>
                        </div>) : ""
                      }
                    </div>
                  </div>
                  ))
                }
              </ol>
            </div>
          </div>
        )}></Route>


        <div className="post-specific-page-container">

          {this.props.posts.map(post => (

            <Route key={post.id} exact path={`/${post.category}/${post.id}`} render={() => (
              <div>
                <div className="post-specific-page">
                  <div className="post">
                    <div className="post-count">
                      <div className="up-vote">
                        <a onClick={(e) => this.upVotePostFromMainPage(post.id)}><i className="up"></i></a>
                      </div>
                      <div>{post.voteScore}</div>
                      <div className="down-vote">
                        <a onClick={(e) => this.downVotePostFromMainPage(post.id)}><i className="down"></i></a>
                      </div>
                    </div>
                    <div className="post-body">
                      <p className="post-title">
                        <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)} >{post.title}</Link>
                      </p>
                      <p className="tagline">
                        submitted <time>{this.timeToString(post.timestamp)}</time> by { post.author}
                      </p>
                      <div className="post-main">
                        {post.body}
                      </div>
                      <ul className="flat-list-buttons">
                        <li className="first">
                          <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)}>{post.commentCount} comments</Link>
                        </li>
                        <li className="delete-button">
                          <a onClick={(e) => this.deletingPost(post.id)}>delete</a>
                        </li>
                        <li className="edit-button">
                          <a onClick={(e)=> this.toggleEditForm(post.id) }>edit</a>
                        </li>
                      </ul>

                      {(this.state.editFormVisible && this.state.editPostId === post.id) ?
                        (<div className="formContainer">
                          <form onSubmit={(e)=> this.handleEditSubmit(e, post)}>

                            <ul className="form-style">
                              <li>
                                <label>Title</label>
                                <input type="text" name="editTitle" className="field-long" defaultValue={post.title} onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <label>Body</label>
                                <textarea type="text" name="editBody" className="field-long field-textarea" defaultValue={post.body}  onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <input type="submit" value="Submit" />
                              </li>
                            </ul>
                          </form>
                        </div>) : ""
                      }
                    </div>
                  </div>
                  <div className="comments-list-container">
                    <button onClick={()=> (!this.state.commentFormVisible) ? this.setState({commentFormVisible: true}) : this.setState({commentFormVisible: false})}>Add Comment</button>
                    <h3>Comments</h3>

                     {this.props.commentsList.map(comment => (
                        <div className="comments-list" key={comment.id}>
                          <div className="comment">
                            <div className="comment-count">
                              <div className="up-vote">
                                <a onClick={(e) => this.upVoteComment(comment.id, comment.parentId)}><i className="up"></i></a>
                              </div>
                              <div>{comment.voteScore}</div>
                              <div className="down-vote">
                                <a onClick={(e) => this.downVoteComment(comment.id, comment.parentId)}><i className="down"></i></a>
                              </div>
                            </div>
                            <div className="comment-body">
                              <p className="tagline">
                                submitted <time>{this.timeToString(post.timestamp)}</time> by { comment.author}
                              </p>
                              <p className="comment-title">
                                {comment.body}
                              </p>
                              <ul className="flat-list-buttons">
                                <li className="delete-button">
                                  <a onClick={(e) => this.deletingComment(comment.id, comment.parentId)}>delete</a>
                                </li>
                                <li className="edit-button">
                                  <a onClick={(e)=> this.toggleCommentEditForm(comment.id) }>edit</a>
                                </li>
                              </ul>

                              {(this.state.editFormVisible && this.state.editCommentId === comment.id) ?
                                (<div className="formContainer">
                                  <form onSubmit={(e)=> this.handleCommentEditSubmit(e, comment)}>

                                    <ul className="form-style">

                                      <li>
                                        <label>Body</label>
                                        <textarea type="text" name="commentEditBody" className="field-long field-textarea" defaultValue={comment.body}  onChange={this.handleChange} required/>
                                      </li>

                                      <li>
                                        <input type="submit" value="Submit" />
                                      </li>
                                    </ul>
                                  </form>
                                </div>) : ""
                              }
                            </div>
                          </div>
                        </div>
                      ))}

                  </div>

                  {(this.state.commentFormVisible) ?
                    (<div className="formContainer">
                      <form onSubmit={(event) => this.commentSubmit(event, post.id)}>
                        <ul className="form-style">
                          <li>
                            <label>Author <span className="required">*</span></label>
                            <input type="text" name="commentAuthor" className="field-long" onChange={this.handleChange} required/>
                          </li>
                          <li>
                            <label>Body <span className="required">*</span></label>
                            <textarea type="text" name="commentBody" className="field-long field-textarea" onChange={this.handleChange} required/>
                          </li>

                          <li>
                            <input type="submit" value="Submit" />
                          </li>
                        </ul>
                      </form>
                    </div>) : ""
                  }
                </div>
              </div>
            )}>
            </Route>
          ))}
        </div>

        <Route path="/:category/:id" posts={this.props.posts} component={Error}/>

        <Route exact path="/react" render={() => (
          <div className="categoryPage">
            <div className="categorySpecificPostList">
              <h3>React Posts List</h3>
              <button onClick={()=> (!this.state.postFormVisible) ? this.setState({postFormVisible: true}) : this.setState({postFormVisible: false})}>Add New Post</button>
              <select value={this.state.sortOption} onChange={this.sortHandle}>
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="score">Score</option>
              </select>
              {(this.state.postFormVisible) ?
                (<div className="formContainer">
                  <form onSubmit={this.handleSubmit}>
                    <ul className="form-style">
                      <li>
                        <label>Title <span className="required">*</span></label>
                        <input type="text" name="title" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Author <span className="required">*</span></label>
                        <input type="text" name="author" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Body <span className="required">*</span></label>
                        <textarea type="text" name="body" className="field-long field-textarea" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Category</label>
                        <select onChange={this.handleCategoryChange} className="form-select" required>
                          <option value="">Select</option>
                          <option value="react">React</option>
                          <option value="redux">Redux</option>
                          <option value="react native">React Native</option>
                        </select>
                      </li>
                      <li>
                        <input type="submit" value="Submit" />
                      </li>
                    </ul>
                  </form>
                </div>) : ""
              }
              <ol className="posts-list">
                {
                  this.props.reactPosts.map(post => (
                  <div className="post" key={post.id}>

                    <div className="post-count">
                      <div className="up-vote">
                        <a onClick={(e) => this.upVotePostFromReactCategoryPage(post.id)}><i className="up"></i></a>
                      </div>
                      <div>{post.voteScore}</div>
                      <div className="down-vote">
                        <a onClick={(e) => this.downVotePostFromReactCategoryPage(post.id)}><i className="down"></i></a>
                      </div>
                    </div>
                    <div className="post-body">
                      <p className="post-title">
                        <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)} >{post.title}</Link>
                      </p>
                      <p className="tagline">
                        submitted <time>{this.timeToString(post.timestamp)}</time> by { post.author}
                      </p>
                      <ul className="flat-list-buttons">
                        <li className="first">
                          <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)}>{post.commentCount} comments</Link>
                        </li>
                        <li className="delete-button">
                          <a onClick={(e) => this.deletingPost(post.id)}>delete</a>
                        </li>
                        <li className="edit-button">
                          <a onClick={(e)=> this.toggleEditForm(post.id) }>edit</a>
                        </li>
                      </ul>
                      {(this.state.editFormVisible && this.state.editPostId === post.id) ?
                        (<div className="formContainer">
                          <form onSubmit={(e)=> this.handleEditSubmit(e, post)}>

                            <ul className="form-style">
                              <li>
                                <label>Title<span className="required">*</span></label>
                                <input type="text" name="editTitle" className="field-long" defaultValue={post.title} onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <label>Body<span className="required">*</span></label>
                                <textarea type="text" name="editBody" className="field-long field-textarea" defaultValue={post.body}  onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <input type="submit" value="Submit" />
                              </li>
                            </ul>
                          </form>
                        </div>) : ""
                      }
                    </div>
                  </div>
                  ))
                }
              </ol>
            </div>
          </div>
        )}></Route>

        <Route exact path="/redux" render={() => (
          <div className="categoryPage">
            <div className="categorySpecificPostList">
              <h3>Redux Posts List</h3>
              <button onClick={()=> (!this.state.postFormVisible) ? this.setState({postFormVisible: true}) : this.setState({postFormVisible: false})}>Add New Post</button>
              <select value={this.state.sortOption} onChange={this.sortHandle}>
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="score">Score</option>
              </select>
              {(this.state.postFormVisible) ?
                (<div className="formContainer">
                  <form onSubmit={this.handleSubmit}>
                    <ul className="form-style">
                      <li>
                        <label>Title <span className="required">*</span></label>
                        <input type="text" name="title" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Author <span className="required">*</span></label>
                        <input type="text" name="author" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Body <span className="required">*</span></label>
                        <textarea type="text" name="body" className="field-long field-textarea" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Category</label>
                        <select onChange={this.handleCategoryChange} className="form-select" required>
                          <option value="">Select</option>
                          <option value="react">React</option>
                          <option value="redux">Redux</option>
                          <option value="react native">React Native</option>
                        </select>
                      </li>
                      <li>
                        <input type="submit" value="Submit" />
                      </li>
                    </ul>
                  </form>
                </div>) : ""
              }
              <ol className="posts-list">
                {this.props.reduxPosts.map(post => (
                  <div className="post" key={post.id}>
                    <div className="post-count">
                      <div className="up-vote">
                        <a onClick={(e) => this.upVotePostFromReduxCategoryPage(post.id)}><i className="up"></i></a>
                      </div>
                      <div>{post.voteScore}</div>
                      <div className="down-vote">
                        <a onClick={(e) => this.downVotePostFromReduxCategoryPage(post.id)}><i className="down"></i></a>
                      </div>
                    </div>
                    <div className="post-body">
                      <p className="post-title">
                        <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)} >{post.title}</Link>
                      </p>
                      <p className="tagline">
                        submitted <time>{this.timeToString(post.timestamp)}</time> by { post.author}
                      </p>
                      <ul className="flat-list-buttons">
                        <li className="first">
                          <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)}>{post.commentCount} comments</Link>
                        </li>
                        <li className="delete-button">
                          <a onClick={(e) => this.deletingPost(post.id)}>delete</a>
                        </li>
                        <li className="edit-button">
                          <a onClick={(e)=> this.toggleEditForm(post.id) }>edit</a>
                        </li>
                      </ul>
                      {(this.state.editFormVisible && this.state.editPostId === post.id) ?
                        (<div className="formContainer">
                          <form onSubmit={(e)=> this.handleEditSubmit(e, post)}>

                            <ul className="form-style">
                              <li>
                                <label>Title<span className="required">*</span></label>
                                <input type="text" name="editTitle" className="field-long" defaultValue={post.title} onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <label>Body<span className="required">*</span></label>
                                <textarea type="text" name="editBody" className="field-long field-textarea" defaultValue={post.body}  onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <input type="submit" value="Submit" />
                              </li>
                            </ul>
                          </form>
                        </div>) : ""
                      }
                    </div>
                  </div>
                  ))
                }
              </ol>
            </div>
          </div>
        )}></Route>

        <Route exact path="/react native" render={() => (
          <div className="categoryPage">
            <div className="categorySpecificPostList">
              <h3>React Native Posts List</h3>
              <button onClick={()=> (!this.state.postFormVisible) ? this.setState({postFormVisible: true}) : this.setState({postFormVisible: false})}>Add New Post</button>
              <select value={this.state.sortOption} onChange={this.sortHandle}>
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="score">Score</option>
              </select>
              {(this.state.postFormVisible) ?
                (<div className="formContainer">
                  <form onSubmit={this.handleSubmit}>
                    <ul className="form-style">
                      <li>
                        <label>Title <span className="required">*</span></label>
                        <input type="text" name="title" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Author <span className="required">*</span></label>
                        <input type="text" name="author" className="field-long" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Body <span className="required">*</span></label>
                        <textarea type="text" name="body" className="field-long field-textarea" onChange={this.handleChange} required/>
                      </li>
                      <li>
                        <label>Category</label>
                        <select onChange={this.handleCategoryChange} className="form-select" required>
                          <option value="">Select</option>
                          <option value="react">React</option>
                          <option value="redux">Redux</option>
                          <option value="react native">React Native</option>
                        </select>
                      </li>
                      <li>
                        <input type="submit" value="Submit" />
                      </li>
                    </ul>
                  </form>
                </div>) : ""
              }

              <ol className="posts-list">
                {this.props.reactNativePosts.map(post => (
                  <div className="post" key={post.id}>
                    <div className="post-count">
                      <div className="up-vote">
                        <a onClick={(e) => this.upVotePostFromReactNativeCategoryPage(post.id)}><i className="up"></i></a>
                      </div>
                      <div>{post.voteScore}</div>
                      <div className="down-vote">
                        <a onClick={(e) => this.downVotePostFromReactNativeCategoryPage(post.id)}><i className="down"></i></a>
                      </div>
                    </div>
                    <div className="post-body">
                      <p className="post-title">
                        <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)} >{post.title}</Link>
                      </p>
                      <p className="tagline">
                        submitted <time>{this.timeToString(post.timestamp)}</time> by { post.author}
                      </p>
                      <ul className="flat-list-buttons">
                        <li className="first">
                          <Link to={`/${post.category}/${post.id}`} onClick={(e) => this.getCommentsList(post.id)}>{post.commentCount} comments</Link>
                        </li>
                        <li className="delete-button">
                          <a onClick={(e) => this.deletingPost(post.id)}>delete</a>
                        </li>
                        <li className="edit-button">
                          <a onClick={(e)=> this.toggleEditForm(post.id) }>edit</a>
                        </li>
                      </ul>
                      {(this.state.editFormVisible && this.state.editPostId === post.id) ?
                        (<div className="formContainer">
                          <form onSubmit={(e)=> this.handleEditSubmit(e, post)}>

                            <ul className="form-style">
                              <li>
                                <label>Title<span className="required">*</span></label>
                                <input type="text" name="editTitle" className="field-long" defaultValue={post.title} onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <label>Body<span className="required">*</span></label>
                                <textarea type="text" name="editBody" className="field-long field-textarea" defaultValue={post.body}  onChange={this.handleChange} required/>
                              </li>

                              <li>
                                <input type="submit" value="Submit" />
                              </li>
                            </ul>
                          </form>
                        </div>) : ""
                      }
                    </div>
                  </div>
                  ))
                }
              </ol>
            </div>
          </div>
        )}></Route>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return{
    categories: state.categories.categories,
    posts: state.posts,
    reactPosts: state.reactPosts,
    reduxPosts: state.reduxPosts,
    reactNativePosts: state.reactNativePosts,
    commentsList: state.getComments

  }

}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(categoriesFetchData()),
    fetchPosts: () => dispatch(postsFetchData()),
    fetchReactPosts: () => dispatch(reactCategoryPostsFetchData()),
    fetchReduxPosts: () => dispatch(reduxCategoryPostsFetchData()),
    fetchReactNativePosts: () => dispatch(reactNativeCategoryPostsFetchData()),
    deletePost: (postId) => dispatch(postDelete(postId)),
    votePost: (postId, option) => dispatch(votePost(postId, option)),
    editPost: (postId, data) => dispatch(editPost(postId, data)),
    addPost: (post) => dispatch(addPost(post)),
    fetchCommentsList: (postId) => dispatch(fetchComments(postId)),
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (commentId, newCommentBody) => dispatch(editComment(commentId, newCommentBody))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
