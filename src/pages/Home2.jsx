import React, { useEffect, useState } from 'react';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

function Home2() {

    // pobiera konkretny dokument o podanym numerze dokumentu nie jego id
    const getData = async () => {
        const docRef = doc(db, "posts", "BYAeIpO9jJFmED5cnAqv");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        console.log("No such document!");
        }
    }

    const [data, setData] = useState(false);
    useEffect(() => {
        const coll = collection(db, "posts"); 
        // pobieranie całej kolekcji
        const getCollection = async () => {
        const querySnapshot = await getDocs(coll);
        // Pierwszy sposób bez użycia .docs po querySanpshot z forEach z map nie zadziała
        // let postArray = [];
        // querySnapshot.forEach((doc) => {
        //    return postArray.push({ ...doc.data()});
        // });
        // setData(postArray);

         // Drugi sposób z użycia .docs i map  z forEach natomiast nie zadziała
        setData(querySnapshot.docs.map((doc) => {
            return { ...doc.data()};
         }));
        }
        getCollection();
    },[])
    

    return (
        <>
            <div>Home2</div>
            <div>{ data && data.map(item => <p key={item.title}>{item.title}</p>)  }</div>
        </>
    )
}

export default Home2