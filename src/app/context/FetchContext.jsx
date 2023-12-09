import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../../../firebase";
import { useEffect } from "react";

export const FetchContext = createContext();

export const FetchContextProvider = ({children}) =>{
    const [cats, setCats] = useState([]);

    useEffect(()=>{
      
        const reference = collection(db, 'Categories');
        // const q = query(reference, where('creator', '==', u))
        const unsub = onSnapshot(
            reference,  (snapshot)=>{
                let list = [];
                snapshot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data()})
                })
                // console.log(list)
                setCats(list);
                
            },
            (error)=>{
                console.log(error)
            },
        )
        // user && unsub();
        return()=>{
            unsub()
        }
    },[])


    return(
        <FetchContext.Provider value={{cats, setCats}} >
            {children}
        </FetchContext.Provider>
    )
}