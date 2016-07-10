var messagesList = document.getElementById("messages"),
    newMsg = document.getElementById("newMsg"),
    msgContainer = document.getElementById("messagesContainer"),
    userId = document.getElementById("userId");

// Initialize Firebase
var config = {
    apiKey: "------------------",
    authDomain: "------------",
    databaseURL: "------------",
    storageBucket: "qrioscat-248db.appspot.com",
};

//Listening for new messages from other clients:
firebase.initializeApp(config);
    firebase.database().ref('messages').on('child_added', function(snapshot, prevKey){
    handleNewMsg(snapshot);
});

//Pushing a new message from this client:
function handleSendNewMsg(){
    firebase.database().ref('messages')
            .push({
                message : newMsg.value,
                date : new Date(),
                author: userId.value
            });
}


//List
newMsg.onkeyup = function(evt) {
    evt = evt || window.event;

    if (evt.keyCode == 13) {
        handleSendNewMsg();
    }
};


function handleNewMsg(snapshot){
    appendMessage(snapshot.val());
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function appendMessage(message) {
  var li = document.createElement("li");

  li.appendChild(document.createTextNode(message.author + ': ' + message.message));
  messagesList.appendChild(li);

  var clazName = (message.author == userId.value) ? 'ownMessage' : 'thirdPartyMessage';
  li.className = clazName;

  if(message.author == userId.value){
    newMsg.value = '';
  }

}