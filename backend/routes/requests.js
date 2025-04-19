const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Request = require('../models/Request');
const History = require('../models/History');
const axios = require('axios');

/**
 * @route   GET /api/requests
 * @desc    Get all requests for the authenticated user
 * @access  Private
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

/**
 * @route   GET /api/requests/:id
 * @desc    Get a request by ID
 * @access  Private
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const request = await Request.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
});

/**
 * @route   POST /api/requests
 * @desc    Create a new request
 * @access  Private
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, method, url, headers, params, body, collectionId } = req.body;
    
    const newRequest = new Request({
      userId: req.user.id,
      name,
      method,
      url,
      headers,
      params,
      body,
      collectionId
    });
    
    await newRequest.save();
    
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

/**
 * @route   PUT /api/requests/:id
 * @desc    Update a request by ID
 * @access  Private
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, method, url, headers, params, body, collectionId } = req.body;
    
    const request = await Request.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    request.name = name || request.name;
    request.method = method || request.method;
    request.url = url || request.url;
    request.headers = headers || request.headers;
    request.params = params || request.params;
    request.body = body || request.body;
    request.collectionId = collectionId || request.collectionId;
    
    await request.save();
    
    res.json(request);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

/**
 * @route   DELETE /api/requests/:id
 * @desc    Delete a request by ID
 * @access  Private
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const request = await Request.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    await request.deleteOne();
    
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: 'Failed to delete request' });
  }
});

/**
 * @route   POST /api/requests/send
 * @desc    Send a request and return the response
 * @access  Private
 */
router.post('/send', authenticateToken, async (req, res) => {
  try {
    const { method, url, headers, body } = req.body;
    
    // Execute request
    const axiosConfig = {
      method,
      url,
      headers,
      data: body,
      validateStatus: () => true, // Don't throw on any status code
    };
    
    const startTime = Date.now();
    const response = await axios(axiosConfig);
    const endTime = Date.now();
    
    // Create response object
    const responseData = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      time: `${endTime - startTime}ms`
    };
    
    // Log to history
    try {
      const historyEntry = new History({
        userId: req.user.id,
        requestId: req.body.requestId || 'temp',
        request: {
          method,
          url,
          headers,
          body
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data
        },
        timestamp: new Date()
      });
      
      await historyEntry.save();
    } catch (historyError) {
      console.error('Error saving to history:', historyError);
    }
    
    res.json(responseData);
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ 
      error: 'Failed to send request', 
      message: error.message 
    });
  }
});

/**
 * @route   GET /api/requests/history
 * @desc    Get request history for the authenticated user
 * @access  Private
 */
router.get('/history', authenticateToken, async (req, res) => {
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

module.exports = router; 