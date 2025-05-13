const express = require('express');
const app = express();
const { deletePastEvents } = require('./routes/events');

// Routers
const eventsRouter = require('./routes/events').router;
const preferencesRouter = require('./routes/preferences');
// Middleware
app.use(express.json());

// Routes
app.use('/routes/events', eventsRouter);
app.use('/routes/preferences', preferencesRouter);

// Health check
app.get('/test', (req, res) => {
    res.send("Server is working!");
});

// Scheduled tasks
setInterval(deletePastEvents, 60 * 60 * 1000); // Run every hour

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));