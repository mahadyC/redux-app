import { CATEGORIES_FETCH_DATA_SUCCESS, POSTS_FETCH_DATA_SUCCESS,
	REACT_CATEGORY_POSTS_FETCH_DATA_SUCCESS,
  REDUX_CATEGORY_POSTS_FETCH_DATA_SUCCESS,
  REACT_NATIVE_CATEGORY_POSTS_FETCH_DATA_SUCCESS,
  POST_DELETE_SUCCESS,
  POST_VOTE_SUCCESS,
  POST_EDIT_SUCCESS,
  ADD_POST_SUCCESS,
  COMMENTS_FETCH_DATA_SUCCESS,
  COMMENT_VOTE_SUCCESS,
  COMMENT_DELETE_SUCCESS,
  ADD_COMMENT_SUCCESS,
  COMMENT_EDIT_SUCCESS
   } from '../actions'

const defaultCategories = {
	categories: [{name: "project1"}]
}


export function categories (state = defaultCategories, action) {
	switch (action.type) {
		case CATEGORIES_FETCH_DATA_SUCCESS:
			return action.categories
		default:
			return state
	}
}

const defaultPosts = [{id:"whatever"}]


export function posts (state = defaultPosts, action) {
	switch (action.type) {
		case POSTS_FETCH_DATA_SUCCESS:
			return action.posts
		default:
			return state
	}
}

const defaultReactCategoryPosts = [{id: "default"}]

export function reactPosts (state = defaultReactCategoryPosts, action) {
	switch (action.type) {
		case REACT_CATEGORY_POSTS_FETCH_DATA_SUCCESS:
			return action.reactPosts
		default:
		 return state
	}
}

const defaultReduxCategoryPosts = [{id: "defaultRedux"}]

export function reduxPosts (state = defaultReduxCategoryPosts, action) {
	switch (action.type) {
		case REDUX_CATEGORY_POSTS_FETCH_DATA_SUCCESS:
			return action.reduxPosts
		default:
			return state
	}
}

const defaultReactNativeCategoryPosts = [{id: "defaultReactNative"}]

export function reactNativePosts (state = defaultReactNativeCategoryPosts, action) {
	switch (action.type) {
		case REACT_NATIVE_CATEGORY_POSTS_FETCH_DATA_SUCCESS:
			return action.reactNativePosts
		default:
			return state
	}
}

const defaultDeletePost = [{id: "deleting post id"}]

export function deletePost (state = defaultDeletePost, action) {
	switch (action.type) {
		case POST_DELETE_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultVote = [{id: "voting success"}]

export function votePost (state =  defaultVote, action) {
	switch (action.type) {
		case POST_VOTE_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultEdit = [{id: "editing success"}]

export function editPost (state =  defaultEdit, action) {
	switch (action.type) {
		case POST_EDIT_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultPost = [{id: "adding success"}]

export function addPost (state = defaultPost, action) {
	switch (action.type) {
		case ADD_POST_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultComments = [{id: "comments"}]

export function getComments (state = defaultComments, action) {
	switch (action.type) {
		case COMMENTS_FETCH_DATA_SUCCESS:
			return action.comments
		default:
			return state
	}
}

const defaultVoteComment = [{id: "vote success"}]

export function voteComment (state = defaultVoteComment, action) {
	switch (action.type) {
		case COMMENT_VOTE_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultDeleteComment = [{id: "delete comment"}]

export function deleteComment (state = defaultDeleteComment, action) {
	switch (action.type) {
		case COMMENT_DELETE_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultCommentsAdd = [{id: "comment added"}]

export function addComment (state = defaultCommentsAdd, action) {
	switch (action.type) {
		case ADD_COMMENT_SUCCESS:
			return state
		default:
			return state
	}
}

const defaultCommentEdit = [{id: "comment edited"}]

export function editComment (state = defaultCommentEdit, action) {
	switch (action.type) {
		case COMMENT_EDIT_SUCCESS:
			return state
		default:
			return state
	}
}