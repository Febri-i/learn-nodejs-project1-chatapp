const socket = io("localhost:2020");
socket.emit('login', id);
Array.from(document.querySelector("aside").children).forEach((element) => {
  element.addEventListener("click", (ev) => {
    if (document.querySelector('.listContainerSelect')) main.innerHTML = "";
    Array.from(document.querySelector("aside").children).forEach((element) => {
      if (ev.target.classList[0].toString() !== "profileIcon") element.style.backgroundColor = "white";
    });
    ev.target.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    if (document.querySelector('.mainProfile')) {
      document.querySelector('.profileIcon').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    } else {
      if (ev.target.classList[0].toString() == "profileIcon") ev.target.style.backgroundColor = "white";
    }
  });
});

socket.on("groupChat", data => {
  groupChat[data.groupId].message.push({
    from: data.from,
    messageContent: data.message
  })
  const button = document.querySelector('.sendBtn');
  if (button && button.dataset.id == data.groupId) document.querySelector('.chat').innerHTML += createChatGroup(data.message, data.from)
  if (document.getElementById("groupChat")) {
    document.getElementById(data.groupId).querySelector('.lastChatGroup').innerText = `${getUsrName(data.from)}: ${data.message}`
  }
})

socket.on("chats", (data) => {
  const chat = document.querySelector('.chat')
  if (!chatAss[data.from]) {
    chatAss[data.from] = {};
    chatAss[data.from].Message = [];
  };
  chatAss[data.from].Message.push({
    from: data.from,
    messageContent: data.message
  });
  console.log(data);
  const sendBtn = document.querySelector('.sendBtn');
  if (sendBtn && sendBtn.getAttribute('data-id') == data.from) {
    document.querySelector('.chat').innerHTML += createChat(data.message, data.from);
    document.querySelector('.chat').scrollTop = document.querySelector('.chat').scrollHeight;
  };
  const elem = document.getElementById(data.from)
  if (document.getElementById('normalChat')) {
    if (elem) {
      elem.children[1].children[1].innerText = data.message;
    } else {
      document.querySelector('.listContainer').innerHTML += createListChat('profilePict', data.message.messageContent, fto)
    }
  }

});