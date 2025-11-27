const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one employee
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE employee
router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        position: req.body.position,
        department: req.body.department,
        dateJoined: req.body.dateJoined
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE employee
router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        if (req.body.name != null) employee.name = req.body.name;
        if (req.body.email != null) employee.email = req.body.email;
        if (req.body.position != null) employee.position = req.body.position;
        if (req.body.department != null) employee.department = req.body.department;
        if (req.body.dateJoined != null) employee.dateJoined = req.body.dateJoined;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        await employee.deleteOne();
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
