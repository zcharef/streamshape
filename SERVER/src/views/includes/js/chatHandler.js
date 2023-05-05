import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';
import QueueManager from '../../../../static/js/queueManager.js';

function ChatHandler(tiktok_username, delay) {
  const socket = io();

  const chatThread = document.getElementById('chat-thread');
  const q = new QueueManager();
  const liColors = ['#4285F4', '#FBBC05', '#34A853', '#EA4335', '#55ACEE', '#66757F', '#3B5998', '#8B9DC3', '#F65314', '#7CBB00', '#00A1F1', '#FFBB00', '#0F7DC2', '#7B0099', '#FF9900', '#E50914', '#FFCC00', '#A4C639'];

  socket.emit('create', tiktok_username);

  console.log(
    `SocketIO waiting for like events from user ${tiktok_username}...`,
  );

  socket.on('chat', (data) => {
    q.addToQueue(data.data);
  });
  document.getElementById('chat-thread').addEventListener('DOMNodeInserted', () => {
    document.body.scrollTop = document.body.scrollHeight;
  });
  chatThread.classList.add('hide');

  setInterval(() => {
    const next = q.getNext();
    if (typeof next !== 'undefined') {
      const chatNewThread = document.createElement('li');

      const username = document.createElement('span');
      chatNewThread.appendChild(username);
      username.innerHTML = `${next.uniqueId}: `;
      username.style.color = liColors[Math.floor(Math.random() * liColors.length)];

      const chatNewMessage = document.createTextNode(`${next.comment}`);
      chatNewThread.style.color = 'white';
      chatNewThread.appendChild(chatNewMessage);
      chatThread.appendChild(chatNewThread);
      chatThread.scrollTop = chatThread.scrollHeight;
    }
  }, delay);
}

export default ChatHandler;
