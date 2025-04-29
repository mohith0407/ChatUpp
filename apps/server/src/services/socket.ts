import { Server } from "socket.io";
import Redis from "ioredis";

const pub=new Redis({
    host:'valkey-116a237c-chatupp.j.aivencloud.com',
    port:18017,
    username:'default',
    password:'AVNS_k2kk3bexJjIEAi9sfAs'
});
const sub=new Redis({
    host:'valkey-116a237c-chatupp.j.aivencloud.com',
    port:18017,
    username:'default',
    password:'AVNS_k2kk3bexJjIEAi9sfAs'
});
class SocketService{
    private _io:Server;
    constructor(){
        console.log("Init socket services...");
        this._io=new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        });
        sub.subscribe("MESSAGES")

    }
    get io(){
        return this._io;
    }
    public initListeners(){
        console.log('Init socket listeners...');
        
        const io=this.io;
        io.on("connect",(socket)=>{
            console.log(`New Socket Connected`,socket.id);
            socket.on('event:message',({message}:{message:string})=>{
                console.log('New message received',message);
                // publish message to redis in messages channel
                // await pub.publish('MESSAGES',JSON.stringify({message}))
                
            })
        })

        // sub.on('message',(channel,message)=>{
        //     if(channel==='MESSAGES'){
        //         console.log("New message form redis",message);
                
        //         io.emit("message",message);
        //     }
        // })
    }
}
export default SocketService;