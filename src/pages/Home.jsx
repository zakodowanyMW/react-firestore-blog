import React, { useEffect, useState } from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase-config';

function Home() {

  const [postList, setPostList] = useState([]);
  const postsCollectionRed = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
    const data = await getDocs(postsCollectionRed); 
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getPosts();
  });

  return (
    <div className='homePage'>
      {postList.map(post => {
        return <div className='post'>{post.title}</div>
      })}
    </div>
  )
}

export default Home