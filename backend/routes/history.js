const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const History = require('../models/History');

/**
 * @route   GET /api/history
 * @desc    Get request history for the authenticated user
 * @access  Private
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(100);
    
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

/**
 * @route   POST /api/history
 * @desc    Log a request to history
 * @access  Private
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { requestId, request, response, timestamp } = req.body;
    
    const historyEntry = new History({
      userId: req.user.id,
      requestId,
      request,
      response,
      timestamp,
    });
    
    await historyEntry.save();
    
    res.status(201).json(historyEntry);
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ error: 'Failed to save history' });
  }
});

/**
 * @route   DELETE /api/history/:id
 * @desc    Delete a history entry
 * @access  Private
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const history = await History.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!history) {
      return res.status(404).json({ error: 'History entry not found' });
    }
    
    await history.remove();
    
    res.json({ message: 'History entry removed' });
  } catch (error) {
    console.error('Error deleting history:', error);
    res.status(500).json({ error: 'Failed to delete history entry' });
  }
});

/**
 * @route   DELETE /api/history
 * @desc    Clear all history for the user
 * @access  Private
 */
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await History.deleteMany({ userId: req.user.id });
    
    res.json({ message: 'History cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

module.exports = router; 