import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// action type - post/getPost
export const getPost = createAsyncThunk("post/getPost", async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
})

export const deletePost = createAsyncThunk("post/deletePost", async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: "DELETE"
        })
        .then((res) => res.json())
})

export const createPost = createAsyncThunk("post/createPost", async ({ values }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: values.title,
                body: values.body
            })
        })
        .then((res) => res.json())
})

export const updatePost = createAsyncThunk("post/updatePost", async ({ id, body, title }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title,
                body
            })
        })
        .then((res) => res.json())
})

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        loading: false,
        error: null,
        edit: false,
        body: ""
    },
    reducers: {
        setEdit: (state, action) => {
            state.edit = action.payload.edit;
            state.body = action.payload.body;
        }
    },
    extraReducers: {
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload]
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default postSlice.reducer
export const { setEdit } = postSlice.actions;