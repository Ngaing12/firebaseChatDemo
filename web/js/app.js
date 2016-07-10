var messagesList = document.getElementById("messages"),
    newMsg = document.getElementById("newMsg"),
    msgContainer = document.getElementById("messagesContainer"),
    userId = document.getElementById("userId");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDhAhu5a_lVOtRkxfZEJDz4umKziUoadik",
    authDomain: "qrioscat-248db.firebaseapp.com",
    databaseURL: "https://qrioscat-248db.firebaseio.com",
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