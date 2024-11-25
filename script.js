document.getElementById('sendMessage').addEventListener('click', () => {
  const botToken = document.getElementById('botToken').value.trim();
  const chatIds = document.getElementById('chatIds').value.trim().split(',');
  const customMessage = document.getElementById('customMessage').value.trim();
  const fileInput = document.getElementById('fileUpload');
  const file = fileInput.files[0]; // Selected file

  if (!botToken || !chatIds || !customMessage) {
    alert("Please fill all required fields!");
    return;
  }

  if (file) {
    // If file is uploaded, send it with the custom message as caption
    chatIds.forEach(chatId => {
      const formData = new FormData();
      formData.append('chat_id', chatId.trim());
      formData.append('caption', customMessage); // Caption for the file
      formData.append('document', file); // File to be sent

      fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            console.log(`File sent to Chat ID: ${chatId}`);
          } else {
            console.error(`Failed to send file to Chat ID: ${chatId}`, data);
          }
        })
        .catch(error => console.error('Error:', error));
    });
  } else {
    // If no file, send the text message
    chatIds.forEach(chatId => {
      const payload = {
        chat_id: chatId.trim(),
        text: customMessage,
      };

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            console.log(`Message sent to Chat ID: ${chatId}`);
          } else {
            console.error(`Failed to send message to Chat ID: ${chatId}`, data);
          }
        })
        .catch(error => console.error('Error:', error));
    });
  }

  alert("Messages sent!");
});