const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');

// Student model
const Students = require('../models/students');

// @route   GET /api/students/
// @desc    Get all students
// @access  Public
router.get('/', async (req, res) => {
  try {
    await Students.find().exec((error, students) => {
      if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: 'Error while getting all students..!!'
          });
      }

      if (!students) {
          return res.status(HttpStatus.NOT_FOUND).json({
              error: 'Student not found..!!'
          });
      }

      return res.status(HttpStatus.OK).send({students});
    });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    await Students.findById(req.params.id).exec((error, student) => {
      if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: 'Error while getting student..!!'
          });
      }

      if (!student) {
          return res.status(HttpStatus.NOT_FOUND).json({
              error: 'student not found..!!'
          });
      }

      student.createdAt = student.updatedAt = student.__v = undefined;

      res.send({ student });
    });
  } catch (err) {
    res.status(404).send({ message: 'Student not found!' });
  }
});

// @route   POST /api/students/
// @desc    Create a student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newStudent = await Students.create({ name: req.body.name, email: req.body.email, enrollnumber: req.body.enrollnumber });
     res.send({ newStudent });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The student was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeStudent = await Students.findByIdAndRemove(req.params.id);
     res.send({ message: 'The student was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


router.get('/:min/:max', async (req, res) => {
  try {
    const students = await Students.find({enrollnumber: {$gt: req.params.min, $lt: req.params.max}});
    res.send({students});
  } catch(err) {
    res.status(400).send({error:err});
  }
})


module.exports = router;