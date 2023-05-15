import React, { useEffect, useState } from 'react';
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import { db } from '../firebase-config';

function Home() {

  const [postList, setPostList] = useState([]);
  const postsCollectionRed = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
    const data = await getDocs(postsCollectionRed); 
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    console.log(postList)
    getPosts();
  },[]); // tu jest jakiś błąd w kodowaniu

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts",id);
    await deleteDoc(postDoc);
  }

  return (
    <div className='homePage'>
      {postList.map(post => {
        return (
          <div className="post">
            <div className='deletePost'>
              <button onClick={() => {deletePost(post.id)}}>Delete</button>
            </div>
            <div className='post' key={post.id}>{post.title}</div>
            <p className='test'>tekst</p>
          </div>
        )
      })}
    </div>
  )
}

export default Home