let username = prompt("아이디를 입력하세요");
let roomNum = prompt("채팅 방 번호를 입력하세요");

document.querySelector("#username").innerHTML = username; 

//SSE 연결하기
const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if(data.sender === username){ // 로그인한 유저가 보낸 메세지
        // 파란 박스(오른쪽)
        initMyMessage(data);
    }
    else{
        //회색 박스(왼쪽)
        initYourMessage(data);
    }
}

//최초 초기화 시 1번방 3건이 있으면 3건을 다 가져옴
// addMessage() 호출 시 DB에 insert되고, 그 데이터가 자동으로 들어온다(SSE)
// 파란 메세지 초기화 
function initMyMessage(data){
    let chatBox = document.querySelector("#chat-box");

    let chatSendBox = document.createElement("div");
    chatSendBox.className = "outgoing_msg";
    chatSendBox.innerHTML = getSendMsgBox(data);
    chatBox.append(chatSendBox);

    document.documentElement.scrollTop = document.body.scrollHeight;
}

// 회색 메세지 초기화
function initYourMessage(data){
    let chatBox = document.querySelector("#chat-box");

    let chatReceivedBox = document.createElement("div");
    chatReceivedBox.className = "incoming_msg";
    chatReceivedBox.innerHTML = getReceiveMsgBox(data);
    chatBox.append(chatReceivedBox);

    document.documentElement.scrollTop = document.body.scrollHeight;
}

//Ajax 채팅 메세지 전송
async function addMessage(){
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chat = {
        sender:username,
        roomNum:roomNum,
        msg:msgInput.value
    };

   fetch("http://localhost:8080/chat",{
        method:"post", //Http post 메소드
        body:JSON.stringify(chat), //JS Object -> JSON
        headers:{
            "Content-Type":"application/json;charset=utf8"
        }
    });

     msgInput.value="";
}

//파란 메세지 만들기
function getSendMsgBox(data) {

    let md = data.createdAt.substring(5,10);
    let tm = data.createdAt.substring(11,16);
    let convertTime = md+ " | "+tm;

    return `<div class="sent_msg"> <p>${data.msg}</p> <span class="time_date">${convertTime}</span> </div>`;
}

//회색 메세지 만들기
function getReceiveMsgBox(data) {

    let md = data.createdAt.substring(5,10);
    let tm = data.createdAt.substring(11,16);
    let convertTime = md+ " | "+tm;

    return `<p style="font-size: 14px;">${data.sender}</p><div class="received_withd_msg"> <p>${data.msg}</p> <span class="time_date">${convertTime}</span> </div>`;
}


document.querySelector("#chat-send").addEventListener("click",() =>{
    addMessage();
});


document.querySelector("#chat-outgoing-msg").addEventListener("keydown",(e) =>{
    console.log(e.keyCode);
    if(e.keyCode === 13){
        addMessage();
    }
});