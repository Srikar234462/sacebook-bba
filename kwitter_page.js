var firebaseConfig = {
      apiKey: "AIzaSyAeUsDgKMqDf7yUl7sUS5PxmwL0J9CRxqM",
      authDomain: "sacebook-219d8.firebaseapp.com",
      databaseURL: "https://sacebook-219d8-default-rtdb.firebaseio.com",
      projectId: "sacebook-219d8",
      storageBucket: "sacebook-219d8.appspot.com",
      messagingSenderId: "947051436113",
      appId: "1:947051436113:web:b44a91c97705dfdc0cc070",
      measurementId: "G-3V0JRKF13Z"
};
firebase.initializeApp(firebaseConfig)
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
function send(){
msg=document.getElementById("msg").value ;
firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      likes:0
});
document.getElementById("msg").value="" ;

}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                       console.log(firebase_message_id);
                       console.log(message_data);
                       name=message_data['name'];
                       msg=message_data['message'];
                       like=message_data['like'];
                       name_with_tag="<h4>"+name +"<img class='user_tick' src='tick.png'></h4>";
                       msg_tag="<h4 class='message_h4'>"+msg+"</h4>";
                       like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)' >";
                       span_tag="<span class='glyphicon glyphicon-thumbs-up'> like- "+ like +"</span></button><hr>";
                       row=name_with_tag+msg_tag+like_button+span_tag;
                       document.getElementById("output").innerHTML+=row;

                  }
            });
      });
}
getData();
function updatelike(message_id){
console.log("clicked on like button"+message_id);
button_id=message_id
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+ 1
firebase.database().ref(room_name).child(message_id).update({
like:updated_likes



});

}
function logout(){
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="index.html"

}                                                                                                                                                    