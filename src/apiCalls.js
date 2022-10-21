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
  try {
    const res = await axios.get(`/users/${userId}/followings`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchUserByUsername = async (username) => {
  try {
    const res = await axios.get(`/users?username=${username}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchUserbyId = async (userId) => {
  try {
    const res = await axios.get(`/users?userId=${userId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const likePost = async (postId, userId) => {
  try {
    const res = await axios.put(`/posts/${postId}/like`, {
      userId: userId,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getPostsForProfile = async (userId) => {
  try {
    const res = await axios.get(`/posts/profile/${userId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getPostsforTimeline = async (userId) => {
  try {
    const res = await axios.get(`/posts/timeline/${userId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const unfollowUser = async (userId, currentUserId) => {
  try {
    const res = await axios.put(`/users/${userId}/unfollow`, {
      userId: currentUserId,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const followUser = async (userId, currentUserId) => {
  try {
    const res = await axios.put(`/users/${userId}/follow`, {
      userId: currentUserId,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const editProfile = async (userId, user) => {
  try {
    const res = await axios.put(`/users/${userId}`, {
      ...user,
      userId: userId,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const sharePost = async (userId, post) => {
  try {
    const res = await axios.post("/posts", {
      ...post,
      userId: userId,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deletePost = async (postId, userId) => {
  try {
    // axios does not accept shortcut of: axios.delete(url, {body})
    const res = await axios({
      method: "delete",
      url: `/posts/${postId}`,
      data: {
        userId: userId,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
