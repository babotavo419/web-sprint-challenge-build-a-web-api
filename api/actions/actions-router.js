const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action);
});

router.post('/', validateAction, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.json(updatedAction);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end();
  } catch(err) {
    next(err);
  }
});

module.exports = router;
