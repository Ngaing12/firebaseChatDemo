// Initialize Firebase
var config = {
apiKey: "AIzaSyDhAhu5a_lVOtRkxfZEJDz4umKziUoadik",
authDomain: "qrioscat-248db.firebaseapp.com",
databaseURL: "https://qrioscat-248db.firebaseio.com",
storageBucket: "qrioscat-248db.appspot.com",
};

var messagesList = document.getElementById("messages"),
newMsg = document.getElementById("newMsg"),
msgContainer = document.getElementById("messagesContainer"),
userId = document.getElementById("userId");

firebase.initializeApp(config);
firebase.database().ref('messages').on('child_added', function(snapshot, prevKey){
handleNewMsg(snapshot);
});

newMsg.onkeyup = function(evt) {
    evt = evt || window.event;

    if (evt.keyCode == 13) {
        handleSendNewMsg();
    }
};


function handleSendNewMsg(){
 chat(newMsg.value, userId.value);
}

function chat(msg, userId){
firebase.database().ref('messages')
    .push({
        message : msg,
        date : new Date(),
        author: userId
    });
}

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