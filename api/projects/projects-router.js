const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', validateProjectId, async (req, res) => {
  res.json(req.project);
});

router.post('/', validateProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(201).json(newProject);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
  try {
    const updatedProject = await Projects.update(req.params.id, req.body);
    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(updatedProject);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.status(204).end();
  } catch(err) {
    next(err);
  }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.json(actions);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
