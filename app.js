const express = require("express");
const path = require("path");
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser")


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'ejs') // Set template engine as ejs
app.set('views' , path.join(__dirname, 'views')) // Set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    res.status(200).render('landing')
})

app.get('/game', (req,res) =>{
    res.status(200).render('game')
})

app.get('/memory', (req,res) =>{
    res.status(200).render('memoryModified')
})

app.get('/scramble', (req,res) =>{
    res.status(200).render('scramble')
})

app.get('/maths', (req,res) =>{
    res.status(200).render('maths')
})

app.get('/ticAI', (req,res) =>{
    res.status(200).render('ticAImodified')
})

app.get('/ticMul', function (req, res) {
	res.status(200).render('index')
});

// START THE SERVER
http.listen(port, ()=>{
    console.log(`Server is running at http://${hostname}:${port}/`)
})

// TIC Multiplayer
var rooms = [];


var playerfirst,playersecond;

function init(){
	
    setEventHandlers();
  }
  
  
  var setEventHandlers = function() {
    // Socket.IO
    io.sockets.on("connection", onSocketConnection);
  };
  
  
  function onSocketConnection(client) {
  
      console.log("New player has connected: "+client.handshake.query.name);
      //console.log(client.handshake.query.name);
      console.log('Online Users :'+(rooms.length+1));
  
      if(rooms.length % 2 == 0){
          // EVEN
              var new_room = (""+Math.random()).substring(2,7);
              rooms.push({'name':client.handshake.query.name,'room':new_room,'socket_id':client});
              client.join(new_room);
              //console.log(rooms);
              io.to(new_room).emit('msg',{body:'Waiting for Other Player....'});
              
  
      }else{
          // ODD
          
          var last = rooms[rooms.length - 1];
          rooms.push({'name':client.handshake.query.name,'room':last.room,'socket_id':client});
          client.join(last.room);
          //console.log(rooms);
          playersecond = rooms[rooms.length - 1];
          playerfirst = rooms[rooms.length - 2];
  
          playerfirst.socket_id.emit("start", {myTurn: true, symbol: 'X',room:last.room});
          playersecond.socket_id.emit("start", {myTurn: false, symbol: 'O',room:last.room});
  
          io.to(last.room).emit('opponents',{opponents:playerfirst.name.toUpperCase()+' VS '+playersecond.name.toUpperCase()});
          
      }
      
   client.on("move", playerMove);
  
    
  
    // Listen for client disconnected
    client.on("disconnect", onClientDisconnect);
  
    client.on('playAgain',function(data){
        io.to(data.room).emit('playAgain',{});
    
  
    });
  
    client.on('gameTie',function(data){
      io.to(data.room).emit('gameTie');
  });
  
    client.on("winner",function(data){
        
        io.to(data.room).emit('gameover',{winner:data.name.toUpperCase()});
    });
  
  };
  
  
  
  
  
  // Socket client has disconnected
  function onClientDisconnect() {
     console.log('User Disconnected '+this.id);
  
    for (var i = 0; i < rooms.length; i++) {
      var socket_id = rooms[i].socket_id.id;
  
         if(socket_id==this.id){
  
             io.to(rooms[i].room).emit('disconnect',{'name':rooms[i].name});
             var position = (rooms.indexOf(rooms[i])+1);
             if(position % 2 == 0){
                 var otherplayer = (rooms.indexOf(rooms[i])-1);
                 rooms.splice(rooms.indexOf(rooms[i]),1);
                 rooms.splice(otherplayer,1);
             
  
             }else{
                 var otherplayer = (rooms.indexOf(rooms[i])+1);
                 rooms.splice(rooms.indexOf(rooms[i]),1);
                 rooms.splice(otherplayer,1);
                 
             }
             console.log('Online Users :'+(rooms.length));
              
             }
         }
  
  };
  
  function playerMove(data) {
      var square_id = data.id;
      var clas = data.class;
      var symbol = data.symbol;
      var roomno = data.room;
      if(symbol == 'X'){
          next = 'O';
      }else{
          next = 'X';
      }
  
      io.to(roomno).emit('change',{
          square_id:square_id,
          clas:clas,
          symb:symbol
      });
  
      io.to(roomno).emit("turn", {myTurn: true,next:next});
      
  
  
  };
  
  
  
  
  
  
  
  init();