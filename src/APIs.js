
const api = "http://192.168.1.57:3001"

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

/*-------------Categories------------- */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

/*-------------Posts------------- */
export const getByCategory = (category) =>
	fetch(`${api}/${category}/posts`, { headers })
		.then(res => res.json())
		.then(data => data)

export const getAll = () =>
	fetch(`${api}/posts`, { headers })
		.then(res => res.json())
		.then(data => data)

export const get = (id) =>
	fetch(`${api}/posts/${id}`, { headers })
		.then(res => res.json())
		.then(data => data)

export const add = (post) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers
		},
		body: JSON.stringify(post)
	})
	.then(res => res.json())
	.then(data => data)

export const deletePost = (postId) =>
	fetch(`${api}/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			...headers
		}
	})
	.then(res => res.json())
	.then(data => data)

export const votePost = (postId, option) =>
	fetch(`${api}/posts/${postId}`, {
		method: 'POST',
		headers: {
			...headers
		},
		body: JSON.stringify(option)
	})
	.then(res => res.json())
	.then(data => data)


export const editPost = (id, titleBody) =>
	fetch(`${api}/posts/${id}`, {
		method: 'PUT',
		headers: {
			...headers
		},
		body: JSON.stringify(titleBody)
	})
	.then(res => res.json())
	.then(data => data)

/*-----------Comments-------------*/
export const getByParent = (postId) =>
	fetch(`${api}/posts/${postId}/comments`, { headers })
		.then(res => res.json())
		.then(data => data)

export const voteComment = (commentId, option) =>
	fetch(`${api}/comments/${commentId}`, {
		method: 'POST',
		headers: {
			...headers
		},
		body: JSON.stringify(option)
	})
	.then(res => res.json())
	.then(data => data)

export const deleteComment = (commentId) =>
	fetch(`${api}/comments/${commentId}`, {
		method: 'DELETE',
		headers: {
			...headers
		}
	})
	.then(res => res.json())
	.then(data => data)

export const addComment = (comment) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers
		},
		body: JSON.stringify(comment)
	})
	.then(res => res.json())
	.then(data => data)

export const editComment = (commentId, newCommentBody) =>
	fetch(`${api}/comments/${commentId}`, {
		method: 'PUT',
		headers: {
			...headers
		},
		body: JSON.stringify(newCommentBody)
	})
	.then(res => res.json())
	.then(data => data)