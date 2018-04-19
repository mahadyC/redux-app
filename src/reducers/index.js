import { combineReducers } from 'redux';
import { categories, posts, reactPosts, reduxPosts, reactNativePosts, deletePost, votePost, editPost, addPost, getComments, voteComment, deleteComment, addComment, editComment } from './posts';

export default combineReducers({ categories, posts, reactPosts, reduxPosts, reactNativePosts, deletePost, votePost, editPost, addPost, getComments, voteComment, deleteComment, addComment, editComment});