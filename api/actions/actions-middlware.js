// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: 'Action not found' });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving the action' });
  }
}

function validateAction(req, res, next) {
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: 'Missing action data' });
  } else if (!action.project_id || !action.description || !action.notes) {
    res.status(400).json({ message: 'Missing required field' });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
