/**
 * 清空节点
 */
function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
/**
 * 获取 hash 上的 query
 * 例如：#user?id=1
 * 返回 { id: 1 }
 */
function getHashQuery() {
  const query = {};
  const hash = window.location.hash.split('?')[1];
  if (hash) {
    const params = hash.split('&');
    params.forEach(param => {
      const [key, value] = param.split('=');
      query[key] = value;
    });
  }
  return query;
}

/**
 * 渲染用户信息
 */
function renderUserInfo(user) {
  // 渲染用户信息
  const userPanel = document.querySelector('.user-page.user-main-panel');
  // 清空
  clearNode(userPanel);
  const header = document.createElement('div');
  header.classList.add('user-main-panel-header');
  const logo = document.createElement('div');
  logo.classList.add('user-main-panel-header-logo');
  logo.innerText = user.username[0];
  logo.style.backgroundColor = user.color;
  const info = document.createElement('div');
  info.classList.add('user-main-panel-header-info');
  const name = document.createElement('div');
  name.classList.add('user-main-panel-header-username');
  name.innerText = user.username;
  const fullname = document.createElement('div');
  fullname.classList.add('user-main-panel-header-fullname');
  fullname.innerText = user.name;
  const phone = document.createElement('div');
  phone.classList.add('user-main-panel-header-phone');
  phone.innerText = user.phone;
  info.appendChild(name);
  info.appendChild(fullname);
  info.appendChild(phone);
  header.appendChild(logo);
  header.appendChild(info);
  userPanel.appendChild(header);
  // 绘制一条灰色的线
  const line = document.createElement('div');
  line.classList.add('user-main-panel-line');
  userPanel.appendChild(line);
  // 绘制 actions bar
  const actions = document.createElement('div');
  actions.classList.add('user-main-panel-actions');
  const chatItem = document.createElement('div');
  chatItem.classList.add('action-bar-item');
  const chatIcon = document.createElement('img');
  chatIcon.src = './assets/chat-active.png';
  chatItem.appendChild(chatIcon);
  const chatText = document.createElement('span');
  chatText.innerText = '发消息';
  chatItem.appendChild(chatText);
  chatItem.addEventListener('click', function () {
    window.location.hash = '#chat?id=' + user.id;
  });
  actions.appendChild(chatItem);
  const websiteItem = document.createElement('div');
  websiteItem.classList.add('action-bar-item');
  const websiteIcon = document.createElement('img');
  websiteIcon.src = './assets/website.png';
  websiteItem.appendChild(websiteIcon);
  const websiteText = document.createElement('span');
  websiteText.innerText = '访问网站';
  websiteItem.appendChild(websiteText);
  websiteItem.addEventListener('click', function () {
    window.location.href = user.website;
  });
  actions.appendChild(websiteItem);
  userPanel.appendChild(actions);
}

/**
 * 生成用户列表
 */
function renderUserList(users) {
  const list = document.querySelector('.user-list-panel .user-list');
  // 清空
  clearNode(list);
  // 渲染
  users.forEach(user => {
    const item = document.createElement('div');
    item.classList.add('user-item');
    item.id = `user_${user.id}`;
    let logo;
    // 如果有头像，就显示头像，没有头像就显示文字
    if (user.logo) {
      logo = document.createElement('img');
      logo.src = user.logo;
    } else {
      logo = document.createElement('div');
      logo.classList.add('user-item-logo');
      logo.innerText = user.username[0];
    }
    // 设置背景色
    logo.style.backgroundColor = user.color;
    const name = document.createElement('div');
    name.classList.add('user-item-name');
    name.innerText = user.username;
    item.appendChild(logo);
    item.appendChild(name);
    list.appendChild(item);
    // 给 item 添加点击事件
    item.addEventListener('click', function () {
      window.location.hash = '#user?id=' + user.id;
      item.classList.add('active');
      // 其他的 item 移除 active
      document.querySelectorAll('.user-item').forEach(item => {
        item.classList.remove('active');
      });
      renderUserInfo(user);
    });
  });
  // 如果 query 存在 id，直接渲染 id
  const query = getHashQuery();
  if (query.id) {
    const user = users.find(user => user.id == query.id);
    renderUserInfo(user);
    // 给用户设置 active
    const target = document.querySelector(`#user_${query.id}`);
    target.classList.add('active');
    // 其他的 item 移除 active
    document.querySelectorAll('.user-item').forEach(item => {
      if (item.id === target.id) return;
      item.classList.remove('active');
    });
  }
}

/**
 * 获取用户列表
 */
function fetchUserList() {
  // 如果没数据就请求，有数据就渲染，默认给一条数据，因此需要数据量超过1才不请求新的数据
  if (window.__USERS__?.length > 1) {
    renderUserList(window.__USERS__);
    return;
  }
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
      window.__USERS__ = users.map(user => {
        return {
          ...user,
          color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, .2)`
        }
      });
      // 在开始的位置添加文件传输助手，id设置为0
      window.__USERS__.unshift({
        id: 0,
        username: '文件传输助手',
        name: '文件传输助手',
        phone: '文件传输助手',
        website: 'https://filetransfer.sh',
        logo: './assets/file-transfer.png',
        color: `#73d13d`
      });
      renderUserList(window.__USERS__);
      // 将数据缓存到本地
      localStorage.setItem('_LOCAL_USERS_', JSON.stringify(window.__USERS__));
    })
    .catch(err => console.log(err));
}

/** 给 nav-item 添加点击事件 */
document.querySelectorAll('.nav-item.action').forEach(item => {
  item.addEventListener('click', function () {
    if (!this.id) {
      alert('此功能暂未开放');
      return;
    }
    // 设置 hash
    window.location.hash = this.id;
    document.querySelectorAll('.nav-item.action').forEach(item => {
      if (!item.id) return;
      this.id === item.id ? Object.assign(item.querySelector('img.icon'), {
        src: `./assets/${item.id}-active.png`
      }) : Object.assign(item.querySelector('img.icon'), {
        src: `./assets/${item.id}.png`
      });
    });
  });
});

/**
 * 生成聊天列表
 */
function renderChatList() {
  // 默认聊天 id
  const query = getHashQuery();
  const activeId = +query.id;
  const list = document.querySelector('.chat-list');
  // 清空
  clearNode(list);
  
  // 从缓存获取聊天列表
  const chats = JSON.parse(localStorage.getItem('_LOCAL_MESSAGES_')) || {};
  
  // 如果当前有激活的聊天用户，确保该用户在聊天列表中
  if (activeId !== undefined && !isNaN(activeId)) {
    const activeUser = window.__USERS__.find(user => user.id == activeId);
    if (activeUser && !chats[activeId]) {
      // 如果用户不在聊天列表中，为其创建空的聊天记录
      chats[activeId] = [];
      // 更新到本地存储
      localStorage.setItem('_LOCAL_MESSAGES_', JSON.stringify(chats));
    }
  }
  
  // 获取所有有聊天记录的用户ID
  const chatUserIds = Object.keys(chats).map(id => +id);
  
  // // 排序：当前激活用户置顶，其他按ID排序
  // chatUserIds.sort((a, b) => {
  //   if (a == activeId) return -1;
  //   if (b == activeId) return 1;
  //   return a - b;
  // });
  
  // 循环遍历聊天对象
  chatUserIds.forEach(authorId => {
    const user = window.__USERS__.find(user => user.id == authorId);
    if (!user) return; // 如果找不到用户信息，跳过
    
    const item = document.createElement('div');
    item.classList.add('chat-item');
    if (authorId == activeId) {
      item.classList.add('active');
    }
    item.id = `chat_${authorId}`;
    
    let logo;
    if (user.logo) {
      logo = document.createElement('img');
      logo.src = user.logo;
    } else {
      logo = document.createElement('div');
      logo.classList.add('chat-item-logo');
      logo.innerText = user.username[0];
      // 设置背景色
      logo.style.backgroundColor = user.color;
    }
    
    const info = document.createElement('div');
    info.classList.add('chat-item-info');
    const header = document.createElement('div');
    header.classList.add('chat-item-header');
    const name = document.createElement('div');
    name.classList.add('chat-item-name');
    name.innerText = user.username;
    header.appendChild(name);
    info.appendChild(header);
    item.appendChild(logo);
    item.appendChild(info);
    
    // 给 item 添加点击事件，点击后聊天
    item.addEventListener('click', function () {
      window.location.hash = '#chat?id=' + authorId;
    });
    
    list.appendChild(item); 
  });
}

/**
 * 格式化时间
 * 不够 10 的前面补 0
 */
function formatTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day  } ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

/**
 * 将消息更新到缓存
 */
function updateLocalMessages(id, newMessage) {
  const objMessages = JSON.parse(localStorage.getItem(`_LOCAL_MESSAGES_`)) || {};
  messages = objMessages[id] || [];
  messages.push(newMessage);
  objMessages[id] = messages;
  localStorage.setItem('_LOCAL_MESSAGES_', JSON.stringify(objMessages));
}

/**
 * 渲染聊天
 */
function renderChatMessages(id) {
  const messages = JSON.parse(localStorage.getItem(`_LOCAL_MESSAGES_`))[id] || [];
  const messageContainer = document.querySelector('.chat-main-panel .message-container');  
  // 清空
  clearNode(messageContainer);
  // 渲染
  const user = window.__USERS__.find(user => user.id == id);
  // 渲染标题
  const title = document.querySelector('.chat-main-panel .chat-title');
  title.innerText = user.username;
  // 渲染消息
  messages.forEach(message => {
    const messageItem = document.createElement('div');
    messageItem.classList.add('message-item');
    // 是否是我的消息
    const isMine = message.authorId === -1;
    let messageAvatar;
    if (isMine) {
      messageItem.classList.add('mine');
      messageAvatar = document.createElement('img');
      messageAvatar.classList.add('message-avatar');
      messageAvatar.src = './assets/avatar.jpg';
    } else {
      // 如果有头像，就显示头像，没有头像就显示文字
      if (user.logo) {
        messageAvatar = document.createElement('img');
        messageAvatar.classList.add('message-avatar');
        messageAvatar.src = user.logo;
      } else {
        messageAvatar = document.createElement('div');
        messageAvatar.classList.add('message-avatar');
        messageAvatar.innerText = user.username[0];
        messageAvatar.style.backgroundColor = user.color;
      }
    }
    const messageContent = document.createElement('div');
    messageContent.classList.add('message');
    const messageText = document.createElement('p');
    messageText.innerText = message.text;
    const triangle = document.createElement('div');
    triangle.classList.add(isMine ? 'triangle-right' : 'triangle-left');
    messageContent.appendChild(triangle);
    // const messageTime = document.createElement('div');
    // messageTime.classList.add('message-time');
    // messageTime.innerText = message.time;
    messageContent.appendChild(messageText);
    // messageContent.appendChild(messageTime);
    messageItem.appendChild(messageAvatar);
    messageItem.appendChild(messageContent);
    messageContainer.appendChild(messageItem);
  });
  // 渲染完成之后，直接发送一条消息
  const newMessage = {
    authorId: id,
    text: `你好，我的名字是${user.name}，你可以叫我${user.username}，我的邮箱是${user.email}，我的地址是${user.address.city}_${user.address.street}，电话是${user.phone}，你可以访问我的个人网站${user.website}～`,
    time: formatTime()
  };
  const messageItem = document.createElement('div');
  messageItem.classList.add('message-item');
  let messageAvatar;
  if (user.logo) {
    messageAvatar = document.createElement('img');
    messageAvatar.classList.add('message-avatar');
    messageAvatar.src = user.logo;
  } else {
    messageAvatar = document.createElement('div');
    messageAvatar.classList.add('message-avatar');
    messageAvatar.innerText = user.username[0];
    messageAvatar.style.backgroundColor = user.color;
  }
  const messageContent = document.createElement('div');
  messageContent.classList.add('message');
  const messageText = document.createElement('p');
  messageText.innerText = newMessage.text;
  const triangle = document.createElement('div');
  triangle.classList.add('triangle-left');
  messageContent.appendChild(triangle);
  messageContent.appendChild(messageText);
  messageItem.appendChild(messageAvatar);
  messageItem.appendChild(messageContent);
  messageContainer.appendChild(messageItem);
  // 同时更新到缓存里
  updateLocalMessages(id, newMessage);
}


function hashChangeFunc() {
  const hash = window.location.hash;
  if (hash?.includes('#chat')) {
    document.querySelector('.chat-page.chat-list-panel').style.display = 'flex';
    document.querySelector('.chat-page.chat-main-panel').style.display = 'flex';
    document.querySelector('.user-page.user-list-panel').style.display = 'none';
    document.querySelector('.user-page.user-main-panel').style.display = 'none';
    // 设置 icon
    document.querySelector('#chat img.icon').src = './assets/chat-active.png';
    document.querySelector('#user img.icon').src = './assets/user.png'; 
    // 渲染聊天列表
    renderChatList();
    // 如果 query 存在 id，接着渲染聊天页面
    const query = getHashQuery();
    if (query.id) {
      // 渲染聊天页面
      renderChatMessages(query.id);
    } else {
      // 清空聊天页面
      clearNode(document.querySelector('.chat-main-panel .message-container'));
      // 回到最原始的聊天内容
      const messageContainer = document.querySelector('.chat-main-panel .message-container');
      const emptyMessage = document.createElement('div');
      emptyMessage.classList.add('empty-message');
      const emptyMessageImg = document.createElement('img');
      emptyMessageImg.src = './assets/empty-chat.svg';
      emptyMessage.appendChild(emptyMessageImg);
      messageContainer.appendChild(emptyMessage);
    }
  } else if (hash.includes('#user')) {
    document.querySelector('.user-page.user-list-panel').style.display = 'flex';
    document.querySelector('.user-page.user-main-panel').style.display = 'flex';
    document.querySelector('.chat-page.chat-list-panel').style.display = 'none';
    document.querySelector('.chat-page.chat-main-panel').style.display = 'none';
    // 设置 icon
    document.querySelector('#chat img.icon').src = './assets/chat.png';
    document.querySelector('#user img.icon').src = './assets/user-active.png';
    // 请求用户列表
    fetchUserList();
  } else {
    document.querySelector('.chat-page.chat-list-panel').style.display = 'flex';
    document.querySelector('.chat-page.chat-main-panel').style.display = 'flex';
    document.querySelector('.user-page.user-list-panel').style.display = 'none';
    document.querySelector('.user-page.user-main-panel').style.display = 'none';
    // 设置 icon
    document.querySelector('#chat img.icon').src = './assets/chat-active.png';
    document.querySelector('#user img.icon').src = './assets/user.png';
    // 渲染聊天列表
    renderChatList();
  }
}

window.onhashchange = hashChangeFunc;

window.onload = function () {
  // 初始化缓存
  initialChatMessages();
  initialUsers();
  // 初始化 hash change
  hashChangeFunc();
}

const __INITIAL_CHAT_MESSAGES__ = {
  0: [{
    authorId: -1,
    text: '这是一条消息',
    time: '2024-12-12 23:33:26'
  }, {
    authorId: -1,
    text: '这是另一条消息',
    time: '2024-12-13 23:35:24'
  }]
};

const __INITIAL_USERS__ = [
  {
    id: 0,
    username: '文件传输助手',
    name: '文件传输助手',
    phone: '13051098888',
    email: 'file@163.com',
    address: {
      city: '浙江省杭州市',
      street: '西湖大街26号',
    },
    website: 'https://filetransfer.sh',
    logo: './assets/file-transfer.png',
    color: `#73d13d`
  }
];

function initialChatMessages() {
  const _LOCAL_MESSAGES_ = localStorage.getItem('_LOCAL_MESSAGES_');
  // 如果有缓存就返回
  if (_LOCAL_MESSAGES_) return;
  // 没有缓存就初始化缓存
  localStorage.setItem('_LOCAL_MESSAGES_', JSON.stringify(__INITIAL_CHAT_MESSAGES__));
}

function initialUsers() {
  const _USERS_ = localStorage.getItem('_LOCAL_USERS_');
  window.__USERS__ = _USERS_ ? JSON.parse(_USERS_) : [];
  // 如果有缓存就返回
  if (_USERS_) return;
  // 没有缓存就初始化缓存
  localStorage.setItem('_LOCAL_USERS_', JSON.stringify(__INITIAL_USERS__));
  window.__USERS__ = __INITIAL_USERS__;
}

/**
 * 发送消息，步骤如下：
 * 第一步，设置消息体，获取 id=chat-input 的 textarea(必须是 focus 状态)
 * 第二步，获取 textarea 的值
 * 第三步，获取当前聊天对象的 id
 * 第四步，获取当前用户的 id=-1
 * 第五步，设置消息体
 * 第六步，更新消息面板
 * 第七步，更新缓存
 */
function sendMessage() {
  const textarea = document.querySelector('#chat-input');
  if (!textarea.value.trim()) return;
  const id = getHashQuery().id;
  const newMessage = {
    authorId: -1,
    text: textarea.value.trim(),
    time: formatTime()
  };
  const messageItem = document.createElement('div');
  messageItem.classList.add('message-item');
  messageItem.classList.add('mine');
  const messageAvatar = document.createElement('img');
  messageAvatar.classList.add('message-avatar');
  messageAvatar.src = './assets/avatar.jpg';
  const messageContent = document.createElement('div');
  messageContent.classList.add('message');
  const messageText = document.createElement('p');
  messageText.innerText = newMessage.text;
  const triangle = document.createElement('div');
  triangle.classList.add('triangle-right');
  messageContent.appendChild(triangle);
  messageContent.appendChild(messageText);
  messageItem.appendChild(messageAvatar);
  messageItem.appendChild(messageContent);
  const messageContainer = document.querySelector('.chat-main-panel .message-container');
  messageContainer.appendChild(messageItem);
  textarea.value = '';
  // 同时更新到缓存里
  updateLocalMessages(id, newMessage);
  // 每次发送完消息，都滚动到最新消息
  const mainContent = document.querySelector('.chat-main-panel .content');
  mainContent.scrollTop = mainContent.scrollHeight;
}

document.querySelector('#chat-input').onkeydown = function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}