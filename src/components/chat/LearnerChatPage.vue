<template>
    <div class="container-fluid">
        <div v-if="userData.connected" class="chat-box">
            <div class="member-list ">
                <ul>
                    <li class="btn btn-primary mt-2 disabled w-100">{{ tab }}</li>

                </ul>
            </div>

            <div class="chat-content">
                <ul class="chat-messages">
                    <li v-for="(chat, index) in privateChats.get(tab)" :key="index"
                        :class="{ message: true, self: chat.senderName === userData.username }">
                        <div v-if="chat.senderName !== userData.username" class="avatar">{{ chat.senderName }}</div>
                        <div class="message-data">{{ chat.message }}</div>
                        <div v-if="chat.senderName === userData.username" class="avatar self">{{ chat.senderName }}
                        </div>
                    </li>
                </ul>
                <div class="send-message">
                    <input type="text" class="input-message" placeholder="enter the message"
                        v-model="userData.message" />
                    <button type="button" class="send-button" @click="sendPrivateValue"><i class="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
        <div v-else class="register">
            <input id="user-name" placeholder="Enter your name" v-model="userData.username" />
            <button type="button" @click="registerUser">connect</button>
        </div>
    </div>
</template>

<script>
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";
export default {
    data() {
        return {
            stompClient: null,
            privateChats: new Map(),
            publicChats: [],
            tab: this.$route.query.leactureName,
            currentUser: localStorage.getItem('username'),
            userData: {
                username: localStorage.getItem('username'),
                receivername: '',
                connected: true,
                message: ''
            }
        };
    },
    mounted() {
        setInterval(() => {
            this.addNullValue();
        }, 1000); // 5000 milliseconds = 5 seconds
        this.connect();
    },
    beforeDestroy() {
        this.disconnect(); // Ngắt kết nối trước khi component bị hủy
    },
    methods: {
        addNullValue() {
            const currentValue = this.userData.message;
            // Thêm ký tự ' ' vào userData.message
            this.userData.message += ' ';
            // Nếu giá trị mới của userData.message vẫn chứa ký tự ' ', thì loại bỏ ký tự ' ' vừa được thêm vào
            if (this.userData.message.includes(' ')) {
                this.userData.message = currentValue;
            }

        },
        connect() {
            let Sock = new SockJS('http://localhost:8080/ws');
            this.stompClient = over(Sock);
            this.stompClient.connect({}, this.onConnected, this.onError);
        },
        disconnect() {
            if (this.stompClient !== null) {
                this.stompClient.disconnect();
                this.connected = false;
            }
        },
        async onConnected() {
            // tạo một map mới tránh bị null
            this.privateChats.set(this.tab, [])
            // call api lấy cuộc trò chuyện cũ
            const response = await axios.get("api/v1/get-conversation", {
                params: { receiverName: this.currentUser, senderName: this.tab },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            // đẩy vào map để hiển thị ra màn hình
            for (let ms of response.data) {
                console.log(ms)

                if (this.privateChats.get(ms.senderName)) {
                    this.privateChats.get(ms.senderName).push(ms);
                } else {
                    let list = [];
                    list.push(ms);
                    this.privateChats.set(ms.senderName, list);
                }

                if (this.privateChats.get(ms.receiverName)) {
                    this.privateChats.get(ms.receiverName).push(ms);
                } else {
                    let list = [];
                    list.push(ms);
                    this.privateChats.set(ms.receiverName, list);
                }
            }
            // set connected
            this.userData.connected = true;
            this.stompClient.subscribe('/chatroom/public', this.onMessageReceived);
            this.stompClient.subscribe('/user/' + this.userData.username + '/private', this.onPrivateMessage);
            this.userJoin();
        },
        userJoin() {
            var chatMessage = {
                senderName: this.userData.username,
                status: "JOIN"
            };
            this.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        },
        onMessageReceived(payload) {
            var payloadData = JSON.parse(payload.body);
            switch (payloadData.status) {
                case "JOIN":
                    if (!this.privateChats.get(payloadData.senderName)) {
                        this.privateChats.set(payloadData.senderName, []);
                    }
                    break;
                case "MESSAGE":
                    this.publicChats.push(payloadData);
                    break;
            }
        },
        onPrivateMessage(payload) {


            var payloadData = JSON.parse(payload.body);
            var audio = new Audio(require('@/assets/notification.mp3'));
            audio.play();
            this.$notify({
                title: payloadData.senderName,
                message: payloadData.message,
                type: 'success',
                position: 'bottom-left'
            });
            if (this.privateChats.get(payloadData.senderName)) {
                this.privateChats.get(payloadData.senderName).push(payloadData);
            } else {
                let list = [];
                list.push(payloadData);
                this.privateChats.set(payloadData.senderName, list);
            }
        },
        onError(err) {
            console.log(err);
        },
        handleMessage(event) {
            this.userData.message = event.target.value;
        },
        sendValue() {
            if (this.stompClient) {
                var chatMessage = {
                    senderName: this.userData.username,
                    message: this.userData.message,
                    status: "MESSAGE"
                };
                this.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
                this.userData.message = "";
            }
        },
        sendPrivateValue() {
            if (this.stompClient) {
                var chatMessage = {
                    senderName: this.userData.username,
                    receiverName: this.tab,
                    message: this.userData.message,
                    status: "MESSAGE"
                };

                if (this.userData.username !== this.tab) {
                    this.privateChats.get(this.tab).push(chatMessage);
                }
                this.stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
                this.userData.message = "";
            }
        },
        handleUsername(event) {
            this.userData.username = event.target.value;
        },
        registerUser() {
            this.connect();
        },
        setTab(tab) {
            this.tab = tab;
        }
    }
};
</script>

<style scoped>
input {
    padding: 10px;
    font-size: 1.2em;
}

button {
    border: none;
    padding: 10px;
    background: green;
    color: #fff;
    font-size: 1.2em;
    font-weight: bold;
}


.container {
    position: relative;
}

.register {

    flex-direction: row;
}

.chat-box {

 
    height: 600px;
    padding: 10px;
    display: flex;
    flex-direction: row;
}

.member-list {
    width: 20%;
}

.chat-content {
    width: 80%;
    margin-left: 10px;
}

.chat-messages {
    overflow: scroll;
    height: 80%;
    border: 1px solid #000;
}

.send-message {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.input-message {
    width: 90%;
    border-radius: 50px;
}

ul {
    padding: 0;
    list-style-type: none;
}

.send-button {
    width: 10%;
    border-radius: 50px;
    margin-left: 5px;
    cursor: pointer;
}

.member {
    padding: 10px;
    background: #eee;
    border: #000;
    cursor: pointer;
    margin: 5px 2px;
    box-shadow: 0 8px 8px -4px lightblue;
}

.member.active {
    background: blueviolet;
    color: #fff;
}

.member:hover {
    background: grey;
    color: #fff;
}

.avatar {
    background-color: cornflowerblue;
    padding: 3px 5px;
    border-radius: 5px;
    color: #fff;
}

.avatar.self {
    color: #000;
    background-color: greenyellow;
}

.message {
    padding: 5px;
    width: auto;
    display: flex;
    flex-direction: row;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    margin: 5px 10px;
}

.message-data {
    padding: 5px;
}

.message.self {
    justify-content: end;
}
</style>