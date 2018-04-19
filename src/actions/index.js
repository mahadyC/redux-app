import *as APIs from '../APIs';

export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'

export function categoriesFetchDataSuccess (categories) {
	return {
		type: CATEGORIES_FETCH_DATA_SUCCESS,
		categories
	}
}

export function categoriesFetchData () {
	return (dispatch) => {
		APIs
			.getCategories()
			.then(categories => dispatch(categoriesFetchDataSuccess(categories)))
	}
}

export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

export function postsFetchDataSuccess (posts) {
	return {
		type: POSTS_FETCH_DATA_SUCCESS,
		posts
	}
}

export function postsFetchData () {
	return (dispatch) => {
		APIs
			.getAll()
			.then(posts => dispatch(postsFetchDataSuccess(posts)))
	}
}

export const REACT_CATEGORY_POSTS_FETCH_DATA_SUCCESS = 'REACT_CATEGORY_POSTS_FETCH_DATA_SUCCESS'

export function reactCategoryPostsFetchDataSuccess (reactPosts) {
	return {
		type: REACT_CATEGORY_POSTS_FETCH_DATA_SUCCESS,
		reactPosts
	}
}

export function reactCategoryPostsFetchData () {
	return (dispatch) => {
		APIs
			.getByCategory("react")
			.then(reactPosts => dispatch(reactCategoryPostsFetchDataSuccess(reactPosts)))
	}
}

export const REDUX_CATEGORY_POSTS_FETCH_DATA_SUCCESS = 'REDUX_CATEGORY_POSTS_FETCH_DATA_SUCCESS'

export function reduxCategoryPostsFetchDataSuccess (reduxPosts) {
	return {
		type: REDUX_CATEGORY_POSTS_FETCH_DATA_SUCCESS,
		reduxPosts
	}
}

export function reduxCategoryPostsFetchData () {
	return (dispatch) => {
		APIs
			.getByCategory("redux")
			.then(reduxPosts => dispatch(reduxCategoryPostsFetchDataSuccess(reduxPosts)))
	}
}

export const REACT_NATIVE_CATEGORY_POSTS_FETCH_DATA_SUCCESS = 'REACT_NATIVE_CATEGORY_POSTS_FETCH_DATA_SUCCESS'

export function reactNativeCategoryPostsFetchDataSuccess (reactNativePosts) {
	return {
		type: REACT_NATIVE_CATEGORY_POSTS_FETCH_DATA_SUCCESS,
		reactNativePosts
	}
}

export function reactNativeCategoryPostsFetchData () {
	return (dispatch) => {
		APIs
			.getByCategory("react native")
			.then(reactNativePosts => dispatch(reactNativeCategoryPostsFetchDataSuccess(reactNativePosts)))
	}
}

export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS'

export function postDeleteSuccess () {
	return {
		type: POST_DELETE_SUCCESS
	}
}

export function postDelete (postId) {
	return (dispatch) => {
		APIs
			.deletePost(postId)
			.then(() => dispatch(postDeleteSuccess()))
	}
}

export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS'

export function postVoteSuccess () {
	return {
		type: POST_VOTE_SUCCESS
	}
}

export function votePost (postId, option) {
	return (dispatch) => {
		APIs.votePost(postId, option)
			.then(() => dispatch(postVoteSuccess()))
	}
}


export const POST_EDIT_SUCCESS = 'POST_EDIT_SUCCESS'

export function postEditSuccess () {
	return {
		type: POST_EDIT_SUCCESS
	}
}

export function editPost (postId, editPost) {
	return (dispatch) => {
		APIs.editPost(postId, editPost)
			.then(() => dispatch(postEditSuccess()))
	}
}

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'

export function addPostSuccess () {
	return {
		type: ADD_POST_SUCCESS
	}
}

export function addPost (post) {
	return (dispatch) => {
		APIs.add(post)
			.then(() => dispatch(addPostSuccess()))
	}
}

export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'

export function commentsFetchDataSuccess (comments) {
	return {
		type: COMMENTS_FETCH_DATA_SUCCESS,
		comments
	}
}

export function fetchComments (postId) {
	return (dispatch) => {
		APIs
			.getByParent(postId)
			.then((comments) => dispatch(commentsFetchDataSuccess(comments)))
	}
}

export const COMMENT_VOTE_SUCCESS = 'COMMENT_VOTE_SUCCESS'

export function commentVoteSuccess () {
	return {
		type: COMMENT_VOTE_SUCCESS
	}
}

export function voteComment (commentId, option) {
	return (dispatch) => {
		APIs
			.voteComment(commentId, option)
			.then(() => dispatch(commentVoteSuccess()))
	}
}

export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS'

export function commentDeleteSuccess () {
	return {
		type: COMMENT_DELETE_SUCCESS
	}
}

export function deleteComment (commentId) {
	return (dispatch) => {
		APIs
			.deleteComment(commentId)
			.then(() => dispatch(commentDeleteSuccess()))
	}
}

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'

export function addCommentSuccess () {
	return {
		type: ADD_COMMENT_SUCCESS
	}
}

export function addComment (comment) {
	return (dispatch) => {
		APIs
			.addComment(comment)
			.then(() => dispatch(addCommentSuccess()))
	}
}

export const COMMENT_EDIT_SUCCESS = 'COMMENT_EDIT_SUCCESS'

export function commentEditSuccess () {
	return {
		type: COMMENT_EDIT_SUCCESS
	}
}

export function editComment (commentId, newCommentBody) {
	return (dispatch) => {
		APIs
			.editComment(commentId, newCommentBody)
			.then(() => dispatch(commentEditSuccess()))
	}
}