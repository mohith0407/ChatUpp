import http from "http"
import SocketService from "./services/socket";
async function init() {
    const socketService=new SocketService()
    const server=http.createServer();
    const port=process.env.PORT || 8000;
    socketService.io.attach(server);
    server.listen(port,()=>{
        console.log(`Server started on ${port}...`)
    })
    socketService.initListeners();
}
init();