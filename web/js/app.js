
(function(){

var messagesList = document.getElementById("messages"),
    newMsg = document.getElementById("newMsg"),
    msgContainer = document.getElementById("messagesContainer"),
    userId = document.getElementById("userId");

// Initialize Firebase
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    storageBucket: "YOUR_STORAGE_BUCKET",
});

//Listening for new messages from other clients:
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

})();