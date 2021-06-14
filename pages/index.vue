<template>
  <div class="container">
    <form id="login">
    <h1>Welcome to Chattie</h1>
    <h2>Happy Chatting!</h2>
    <input type="text" id="username" name="username" value="" class="textbox" placeholder="Enter your Username to login">
    <button type="submit">Login</button>
  </form>

  <section id="messages">
    <h1 id="session-name"></h1>

    <div id="loadSection">
      <button  class="button2" id="loadMessages">
        Load Previous Messages
      </button>
      &nbsp; &nbsp;<h3>Showing <span id="messagesCount"></span> starting at <span id="messageDate"></span></h3>
    </div>

    <div id="messageFeed"></div>

    <div>
      <textarea id="messageTextarea"></textarea>
      <button id="send">Send</button>
      <div id="status"></div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  mounted() {
    const USER1_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMzNzUwNTAsImp0aSI6ImE3YTA4MmIwLWNhNTQtMTFlYi1hYjBmLTAxMTdhYTM2NzNiYyIsImV4cCI6MTYyMzQ2MTQ0NSwiYWNsIjp7InBhdGhzIjp7Ii8qL3VzZXJzLyoqIjp7fSwiLyovY29udmVyc2F0aW9ucy8qKiI6e30sIi8qL3Nlc3Npb25zLyoqIjp7fSwiLyovZGV2aWNlcy8qKiI6e30sIi8qL2ltYWdlLyoqIjp7fSwiLyovbWVkaWEvKioiOnt9LCIvKi9hcHBsaWNhdGlvbnMvKioiOnt9LCIvKi9wdXNoLyoqIjp7fSwiLyova25vY2tpbmcvKioiOnt9LCIvKi9sZWdzLyoqIjp7fX19LCJhcHBsaWNhdGlvbl9pZCI6ImMzNDMwOTdjLTI0YWItNGIyZS1iMmE0LWFhMmU3YWRlYzExMSIsInN1YiI6IlVTRVIxX05BTUUifQ.SbXYEb_ZJe4FRa2rlOgn1w5H8AQOYIBrPVuCu1KxdO6tAO090pzrM1AlxUD0i3ilDjxgWsqMPGTh_8pKnxEFEG6IfXJ_t9PLOPTm9_JAIHBxM0lbJSvNL_I1eFc3LxRyJ6YBag4MQsLc4NDZrGMaL9xhRagHPQMDzp1AVQFbVydoXAQRq6mLQ7KgYjjkNLYvzYY623IoyjatlAVsbpkD5Am6-D5h0_hDoL6sryqSBBzRjm-GJPmQXpv5D0_zZhbbI-6B--Q3yJGQfR-2c4ZIZeLAS5MSuw3LBX92-RlGWGi8hbUKuKs3PMK-AdC_E_KCG-yeq3VOh-kKGZ7c472iVA';
    const USER2_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMzNzUxNzEsImp0aSI6ImYwMWJjZWYwLWNhNTQtMTFlYi05ZmVkLTY5NmE1YzMzMDkzNSIsImV4cCI6MTYyMzQ2MTU2OCwiYWNsIjp7InBhdGhzIjp7Ii8qL3VzZXJzLyoqIjp7fSwiLyovY29udmVyc2F0aW9ucy8qKiI6e30sIi8qL3Nlc3Npb25zLyoqIjp7fSwiLyovZGV2aWNlcy8qKiI6e30sIi8qL2ltYWdlLyoqIjp7fSwiLyovbWVkaWEvKioiOnt9LCIvKi9hcHBsaWNhdGlvbnMvKioiOnt9LCIvKi9wdXNoLyoqIjp7fSwiLyova25vY2tpbmcvKioiOnt9LCIvKi9sZWdzLyoqIjp7fX19LCJhcHBsaWNhdGlvbl9pZCI6ImMzNDMwOTdjLTI0YWItNGIyZS1iMmE0LWFhMmU3YWRlYzExMSIsInN1YiI6IlVTRVIyX05BTUUifQ.FDznGpnHowsPeR7sjPZFRP505XEgdwGeS1BHuT3KUrR0rkxloNmCX80sbZdw5rt1yefwO9Z-ITUb-c7QvliAJR-AtEsrKU9jO2vYUAcgPsCOsCVY1MPsXwMauyKoyT7-2O_NQeQaxuj_56NFBR-jSYT2bLjoEtOqhhWzCg9UGl0UTPZgrvagQ7eG3EvrjVrjc9N0u4n1LP5VnELB98s9z0NcH4UW5gG5v1cE2tcd9e9LUioVothJG4jafOOvkqHlToNhp3_w6LGGCR3nFkBP2mUoQYxuzb3NGy-ZEhsEEKwbyQPGRvOPdjr34dCeoMtMNdoTom5-UXdc8Ojx8cyvdQ';
    const CONVERSATION_ID = 'CON-4b51e04a-1c8a-4ac0-a232-924db7882a49';

    const messageTextarea = document.getElementById('messageTextarea');
    const messageFeed = document.getElementById('messageFeed');
    const sendButton = document.getElementById('send');
    const loginForm = document.getElementById('login');
    const status = document.getElementById('status');

    const loadMessagesButton = document.getElementById('loadMessages');
    const messagesCountSpan = document.getElementById('messagesCount');
    const messageDateSpan = document.getElementById('messageDate');

    let conversation;
    let listedEvents;
    let messagesCount = 0;
    let messageDate;

    function authenticate(username) {
    if (username == "USER1_NAME") {
        return USER1_JWT;
        
    }
    if (username == "USER2_NAME") {
        return USER2_JWT;
    }
    alert("User not recognized");
    }


    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userToken = authenticate(document.getElementById('username').value);
        if (userToken) {
        document.getElementById('messages').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        run(userToken);
        }
    });


    loadMessagesButton.addEventListener('click', async (event) => {
    // Get next page of events
    let nextEvents = await listedEvents.getNext();
    listMessages(nextEvents);
    });


    function listMessages(events) {
    let messages = '';

    // If there is a next page, display the Load Previous Messages button
    if (events.hasNext()){
        loadMessagesButton.style.display = "block";
    } else {
        loadMessagesButton.style.display = "none";
    }

    // Replace current with new page of events
    listedEvents = events;

    events.items.forEach(event => {
        const formattedMessage = formatMessage(conversation.members.get(event.from), event, conversation.me);
        messages = formattedMessage + messages;
    });

    // Update UI
    messageFeed.innerHTML = messages + messageFeed.innerHTML;
    messagesCountSpan.textContent = `${messagesCount}`;
    messageDateSpan.textContent = messageDate;
    }


    async function run(userToken) {
    let client = new NexmoClient({ debug: true });
    let app = await client.login(userToken);
    conversation = await app.getConversation(CONVERSATION_ID);
    }


    // Any time there's a new text event, add it as a message
    conversation.on('text', (sender, event) => {
        const formattedMessage = formatMessage(sender, event, conversation.me);
        messageFeed.innerHTML = messageFeed.innerHTML +  formattedMessage;
        messagesCountSpan.textContent = `${messagesCount}`;
    });


    // Listen for clicks on the submit button and send the existing text value
    sendButton.addEventListener('click', async () => {
    await conversation.sendText(messageTextarea.value);
    messageTextarea.value = '';
    });


    messageTextarea.addEventListener('keypress', (event) => {
    conversation.startTyping();
    });

    var timeout = null;
    messageTextarea.addEventListener('keyup', (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        conversation.stopTyping();
    }, 500);
    });


    conversation.on("text:typing:on", (data) => {
    if (data.user.id !== data.conversation.me.user.id) {
        status.innerHTML = data.user.name + " is typing...";
    }
    });

    conversation.on("text:typing:off", (data) => {
    status.innerHTML = "";
    });


    // Update the UI to show which user we are
    document.getElementById('sessionName').innerHTML = conversation.me.user.name + "'s messages"

    // Load events that happened before the page loaded
    let initialEvents = conversation.getEvents({ event_type: "text", page_size: 10, order:"desc" });
    listMessages(initialEvents);


    function formatMessage(sender, message, me) {
    const rawDate = new Date(Date.parse(message.timestamp));
    const formattedDate = moment(rawDate).calendar();
    let text = '';
    messagesCount++;
    messageDate = formattedDate;

    if (message.from !== me.id) {
        text = `<span style="color:red">${sender.user.name} (${formattedDate}): <b>${message.body.text}</b></span>`;
    } else {
        text = `me (${formattedDate}): <b>${message.body.text}</b>`;
    }
    return text + '<br />';
    }


        
    



  }
}
</script>

<style>

body {
font: 13px Helvetica, Arial;
}

#login,
#messages {
width: 80%;
height: 500px;
}

form input[type=text] {
font-size: 20px;
height: 35px;
padding: 0px;
}

button {
height: 35px;
background-color: #d5854e;
border: #d5854e;
color: white;
width: 85px;
position: relative;
font-size: 15px;
}

.button2 {
height: 35px;
background-color: #d5854e;
border: #d5854e;
color: white;
width: 85px;
height: 60px;
position: relative;
font-size: 15px;
}

textarea {
width: 85%;
font-size: 20px;
}

#messageFeed {
font-size: 18px;
padding-bottom: 20px;
line-height: 22pt;
}

#status {
height: 35px;
font-size: 12px;
color: #d5854e;
}

#send {
width: 85%;
}

#messages {
display: none;
}
</style>
