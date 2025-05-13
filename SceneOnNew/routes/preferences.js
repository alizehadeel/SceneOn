const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');
const moment = require('moment');  // Make sure moment is installed



// Add/Update Preference
router.post('/', async (req, res) => {
  try {
    let { userId, preferredTime, budgetRange, categoryId } = req.body;

    if (!preferredTime) {
      return res.status(400).json({ error: "PreferredTime is required" });
    }

    // ✅ Convert preferredTime to HH:mm:ss format
    const formattedTime = moment(preferredTime, ["HH:mm:ss", "HH:mm"]).format("HH:mm:ss");

    if (!formattedTime) {
      return res.status(400).json({ error: "Invalid time format. Use HH:mm:ss" });
    }

    console.log("Formatted Time Before Insertion:", formattedTime);

    const pool = await poolPromise;
    await pool.request()
  .input('UserID', sql.Int, userId)
  .input('PreferredTime', sql.VarChar, formattedTime)  // Change to sql.VarChar
  .input('BudgetRange', sql.Decimal(10, 2), budgetRange)
  .input('CategoryID', sql.Int, categoryId)
  .query('EXEC AddUserPreference @UserID, @PreferredTime, @BudgetRange, @CategoryID');

    res.json({ message: 'User preference saved successfully' });

  } catch (err) {
    console.error('Error in /api/user-preferences:', err);
    res.status(500).json({ error: err.message });
  }
});


// Get User Preferences

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching preferences for user:", userId);

    const pool = await poolPromise;
    const query = 'SELECT * FROM UserPreferences WHERE UserID = @userId';
    console.log("Executing SQL Query:", query);

    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(query);

    // ✅ Format time properly before sending response
    const formattedResult = result.recordset.map(pref => ({
      ...pref,
      PreferredTime: moment(pref.PreferredTime).format('HH:mm:ss') // Convert to HH:mm:ss
    }));

    console.log("Formatted Query Result:", formattedResult);
    res.json(formattedResult);
  } catch (err) {
    console.error('Error in GET /preferences:', err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;

