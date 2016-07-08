// Initialize Firebase
var config = {
apiKey: "PUT_YOUR_API_KEY_HERE",
authDomain: "PUTH_YOUR_AUTH_DOMAIN_HERE",
databaseURL: "PUT_YOUR_DB_URL_HERE",
storageBucket: "PUT_YOUR_STORAGE_BUCKET_HERE",
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