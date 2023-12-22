let lastMessage = '';

function handleClick() {
  const allMsgs = document.querySelectorAll('.msg');
  lastMessage = allMsgs[allMsgs.length - 1].innerText;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      showNotification();
    }
  });
}

function showNotification() {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      if (!document.hasFocus()) {
        const notification = new Notification("New Message", {
          body: lastMessage,
          data: { hello: "world" },
          icon: "",
          tag: "New message"
        });

        notification.addEventListener('error', e => {
          alert("Error showing notification");
        });
      }
    }
  });
};

export default handleClick