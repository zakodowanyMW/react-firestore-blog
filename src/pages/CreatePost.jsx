import React, { useEffect, useState } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({isAuth}) {

  const [title, setTitle] =useState("");
  const [postText, setPostText] =useState("");

  const postsCollectionRed = collection(db, "posts");
  let navigate = useNavigate();
  const CreatePost = async () => {
    await addDoc(postsCollectionRed, {title:title, post:postText, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}});
    navigate("/");
  }

  useEffect(() => {
    if(!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='createPostPage'>
      <div className="cpContainer">
        <h1>Create a post</h1>
        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input type="text" placeholder='Title...'  onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post:</label>
          <textarea type="text" placeholder='Post...' onChange={e => setPostText(e.target.value)} />
        </div>
        <button onClick={CreatePost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost;