const { response } = require('express');
const Training = require('../models/Training');
const ErrorResponse = require('../utils/errorResponse')

// @desc Get all trainings
// @route GET /api/getTrainings
// @access public
exports.getTrainings = async (req, res, next) => {
    try {
        let query;
        let queryStr = JSON.stringify(req.query)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
        query = await Training.find(JSON.parse(queryStr)).populate('courses');
        const trainings = await query;
        res.status(200).json({success: true, count: trainings.length, data: trainings})
    } catch (error) {
        next(error);
    }
}

// @desc Get training by ID
// @route GET /api/get
exports.getTrainingById = async (req, res, next) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(400).json({success: false, msg: 'Not found'})
        }
        res.status(200).json({success: true, data: training})
    } catch (error) {
        next(new ErrorResponse(`Course id: (${req.params.id}) not correct`, 404));
    }
    //res.status(200).json({success: true, msg: `get ${req.params.id} id training`});
}

// @desc Create training
// @route POST /api/getTrainings
exports.postTraining = async (req, res, next) => {
    
    try {
        const training = await Training.create(req.body);
        res.status(201).json({success: true, data: training});
    } catch (error) {
        next(error);
    }
}

exports.putTrainingById = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        //console.log(training);
        if (!training) {
            return res.status(400).json({success: false, msg: 'Not found'});
        }
        res.status(200).json({success: true, data: training});
    } catch (error) {
        next(error);
    }
}

exports.deleteTrainingById = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) {res.status(400).json({success: false, msg: 'Not found'})};
        res.status(200).json({success: true, msg: 'Document deleted'})
    } catch (error) {
        next(error);
    }
    //res.status(200).json({success: true, msg: `deleted ${req.params.id} id training`});
}