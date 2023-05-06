const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const admin = require("./Controllers/admin");
const main = require("./Controllers/main");
const auth = require('./Controllers/auth');

const validateMusic = require("./Validators/addMusicValidator");
const validateProject = require("./Validators/addProjectValidator");




async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  await jwt.verify(token, 'secreto')
  next();

}


// main
router.get('/', main.tracks);
router.get('/track/:id', main.track);
router.get('/projects', main.projects);
router.get('/project/:id', main.project);
router.get('/contact', main.contact);
router.post('/register', auth.register);
router.post('/login', auth.login);

// admin
router.get('/admin/tracks', authenticateToken, admin.tracks);
router.get('/admin/track/:id', authenticateToken, admin.track);
router.put('/admin/track/:id', authenticateToken, admin.update);
router.post('/admin/tracks', authenticateToken, validateMusic, admin.add);
router.delete('/admin/track/:id', authenticateToken, admin.delete);

router.get('/admin/projects', authenticateToken, admin.projects);
router.get('/admin/project/:id', authenticateToken, admin.project);
router.put('/admin/project/:id', authenticateToken, admin.updateProject);
router.post('/admin/projects', authenticateToken, validateProject, admin.addProject);
router.delete('/admin/project/:id', authenticateToken, admin.deleteProject);


module.exports = router;