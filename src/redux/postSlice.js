import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [], 
  loading: false,
  error: null,
  post: {}
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Fetch Posts
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload; // Update posts with fetched data
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Set error message
    },

     // Fetch Post
     fetchPostStart(state) {
        state.loading = true;
        state.error = null;
      },
      fetchPostSuccess(state, action) {
        state.loading = false;
        state.post = action.payload; // Update posts with fetched data
      },
      fetchPostFailure(state, action) {
        state.loading = false;
        state.error = action.payload; // Set error message
      }, 
    // Create Post
    createPostStart(state) {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess(state, action) {
      state.loading = false;
      state.posts.push(action.payload); // Add the new post to the array
    },
    createPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Set error message
    },

    // Edit Post
    editPostStart(state) {
      state.loading = true;
      state.error = null;
    },
    editPostSuccess(state, action) {
      state.loading = false;
      const { id, updatedPost } = action.payload;
      const index = state.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        state.posts[index] = updatedPost; // Update the specific post
      }
    },
    editPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Set error message
    },

    // Delete Post
    deletePostStart(state) {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess(state, action) {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload); // Remove the deleted post
    },
    deletePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Set error message
    },
  },
});

export const {
  fetchPostStart,
  fetchPostSuccess,
  fetchPostFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  editPostStart,
  editPostSuccess,
  editPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} = postSlice.actions;

export default postSlice.reducer;
