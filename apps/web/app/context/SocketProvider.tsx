'use client'
import { io,Socket } from "socket.io-client";
import React, { useCallback,useContext,useEffect, useState } from "react"
interface SocketProviderProps{
    children?:React.ReactNode;
}
interface ISocketContext{
    sendMessage:(msg:string)=>any;
}
const SocketContext=React.createContext<ISocketContext | null>(null);

// custom hook
export const useSocket=()=>{
    const state=useContext(SocketContext);
    if(!state) throw new Error(`state is undefined`);
    return state;
}
export const SocketProvider: React.FC<SocketProviderProps>=({children})=>{
    const [socket,setSocket]=useState<Socket>()
    const sendMessage:ISocketContext["sendMessage"]=useCallback((msg)=>{
        console.log('Send message',msg);
        if(socket){
            socket.emit('event:message',{message:msg});
        }
    },[socket]);

    
    const onMessageRec=useCallback((msg:string)=>{
        console.log('From Server rec',msg);
        
    },[])
    useEffect(() => {
      const _socket=io('http://localhost:8000')
      _socket.on('message',onMessageRec)
      setSocket(_socket);
      return () => {
        _socket.disconnect();
        _socket.off('message',onMessageRec)
        setSocket(undefined)
      }
    }, [])
    
    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
}