const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');
const moment = require('moment');

// Combined event routes
router.get('/recommended/:userId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.params.userId)
            .query('EXEC GetRecommendedEvents @UserID=@userId');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in /recommended:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/organizer/:organizerId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('organizerId', sql.Int, req.params.organizerId)
            .query('EXEC GetEventsByOrganizer @OrganizerID=@organizerId');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in /organizer:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/low-budget', async (req, res) => {
    try {
        const pool = await poolPromise;
        const maxBudget = req.query.max || 1000;
        const result = await pool.request()
            .input('maxBudget', sql.Decimal(10,2), maxBudget)
            .query('EXEC GetLowBudgetEvents @MaxBudget=@maxBudget');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in /low-budget:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/filtered', async (req, res) => {
    try {
        const pool = await poolPromise;
        const { startDate, endDate, city, category } = req.query;
        const result = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .input('city', sql.NVarChar, city)
            .input('category', sql.NVarChar, category)
            .query('EXEC GetFilteredEvents @StartDate=@startDate, @EndDate=@endDate, @CityName=@city, @CategoryName=@category');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in /filtered:', err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/add', async (req, res) => {
    const { title, desc, catID, cityID, loc, start, end, budget, link } = req.body;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Title', sql.NVarChar(255), title);
        request.input('Description', sql.NVarChar(255), desc);
        request.input('CategoryID', sql.Int, catID);
        request.input('CityID', sql.Int, cityID);
        request.input('Location', sql.NVarChar(255), loc);
        request.input('Start', sql.DateTime, start);
        request.input('End', sql.DateTime, end);
        request.input('budget', sql.Int, budget);
        request.input('link', sql.NVarChar(255), link);
        await request.execute('addEvent');
        res.status(201).json({ message: 'Event added successfully.' });
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Utility function for cleaning up past events
async function deletePastEvents() {
    try {
        const pool = await poolPromise;
        await pool.request().execute('deletePastEvents');
        console.log("✅ Past events deleted successfully.");
    } catch (err) {
        console.error("❌ Error deleting past events:", err);
    }
}

module.exports = { router, deletePastEvents };