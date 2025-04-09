import {Box,Container,VStack,Button,Input, HStack, Center} from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState,useRef } from "react";
import Message from "./Components/Message";
import {onAuthStateChanged, getAuth,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth";
import {app} from "./firebase";
import {getFirestore,addDoc,collection,serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore"


const auth=getAuth(app)
const db  = getFirestore(app)

const loginHandler= ()=>{
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth,provider)
}
const logoutHandler= ()=>{
  signOut(auth)
}



function App() {


  const [user,setUser] = useState(false)
  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])
  const divForScroll = useRef(null)

  const submitHandler = async(e)=>{
    e.preventDefault()
   
    try {
      setMessage("");
 
       await addDoc(collection(db,"Messages"),{
       text:message,
       uid:user.uid,
       uri:user.photoURL,
       createdAt:serverTimestamp()
     })

     divForScroll.current.scrollIntoView({behavior:"smooth"})

    } catch (error) {
       alert(error);
    }
   }


  useEffect(()=>{
    const q = query(collection(db,"Messages"),orderBy("createdAt","asc"))

    const unsubscribe = onAuthStateChanged(auth,(data)=>{
      setUser(data)
    })
      const unsubscribeForMessage = onSnapshot(q,(snap)=>{
        setMessages(
          snap.docs.map((item) =>{
            const id  = item.id;
            return {id, ...item.data()};
          })
        )
      })
      return()=>{
        unsubscribe();
        unsubscribeForMessage(); 
      }
  },[])
    return (
    <Box bg={"red.100"}>
      {
        user?(
          <Container h={"100vh"} bg={"white"} padding={"2"}>
        <VStack h="full"  >
          <div className="homescreen"> Chatify : Connecting Minds</div>
          <Button onClick={logoutHandler} w="full" colorScheme="red">Logout</Button>
          <VStack h="full" w={"full"} overflowY={"auto"}  css={{"&::-webkit-scrollbar":{
            display:"none",
          },}}>
            {
              messages.map(item => (
                <Message text={item.text} uri={item.uri} user={item.uid==user.uid ? "me" : "other"} key={item.id}/>
              ))
            }

          <div ref={divForScroll}></div>    

          </VStack> 
            <form style={{width:"100%"}} onSubmit={submitHandler}>
              <HStack>
              <Input value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="Enter a Message"/>
              <Button type="submit" colorScheme="purple">Send</Button>
              </HStack>
            </form>
        </VStack>
      </Container>
        ):<VStack h={"100vh"} justifyContent={"center"}>
          <div className="welcome">
            Welcome to Chatify : The NEXT big thing in Online Chatting
          </div>
          <Button onClick={loginHandler} colorScheme="purple">
            Sign in with Google
          </Button>
        </VStack>
      }
    </Box>
    );
  }
export default App;

