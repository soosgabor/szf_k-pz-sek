const express = require('express');
const router = express.Router();
const {getTrainings, getTrainingById, postTraining, putTrainingById, deleteTrainingById} = require('../controllers/trainings')
const courseRouter = require('./courses')

router.use('/:trainingId/courses', courseRouter)
router.route('/').get(getTrainings).post(postTraining);

router.route('/:id').get(getTrainingById).put(putTrainingById).delete(deleteTrainingById);

// router.patch('/:id', (req, res) => {
//     res.send(`patch ${req.params.id} id API`);
// });

module.exports = router;