import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.message });
  }
};

export const registerCall = async (userCredentials, dispatch) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const res = await axios.post("auth/register", userCredentials);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "REGISTER_FAILURE", error: err.message });
  }
};

export const fetchUserFollowings = async (userId) => {
  const res = await axios.get(`/users/${userId}/followings`);
  return res.data;
};

export const fetchUserByUsername = async (username) => {
  try {
    const res = await axios.get(`/users?username=${username}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserbyId = async (userId) => {
  try {
    const res = await axios.get(`/users?userId=${userId}`);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = async (postId, userId) => {
  const res = await axios.put(`/posts/${postId}/like`, {
    userId: userId,
  });
  return res.data;
};

export const getPostsForProfile = async (userId) => {
  const res = await axios.get(`/posts/profile/${userId}`);
  return res.data;
};

export const getPostsforTimeline = async (userId) => {
  const res = await axios.get(`/posts/timeline/${userId}`);
  return res.data;
};

export const unfollowUser = async (userId, currentUserId) => {
  const res = await axios.put(`/users/${userId}/unfollow`, {
    userId: currentUserId,
  });
  return res.data;
};

export const followUser = async (userId, currentUserId) => {
  const res = await axios.put(`/users/${userId}/follow`, {
    userId: currentUserId,
  });
  return res.data;
};
