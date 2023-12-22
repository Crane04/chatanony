let lastSentMessage = '';

function handleClick() {
  const messageInput = document.getElementById('msg-input');
  const message = messageInput.value; // Get the message from the input field
  lastSentMessage = message;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      showNotification();
    }
  });
}

function showNotification() {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      const notification = new Notification("New Message", {
        body: lastSentMessage,
        data: { hello: "world" },
        icon: "",
        tag: "New message"
      });

      notification.addEventListener('error', e => {
        alert("Error showing notification");
      });
    }
  });
};

export default handleClick