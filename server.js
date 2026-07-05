const express = require('express');
const app = express();
const PORT = 3000;

// Tell Express to serve static files from the 'public' folder
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});