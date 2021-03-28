var fs = require('fs')
var Student = require('./student')
var express = require('express')
var router = express.Router()
router.get('/students', function (req, res) {
    /* fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        var students = JSON.parse(data).students

        res.render('index.html', {
            students: students

        })
    }) */
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            students: students

        })

    })

})
router.get('/students/login', function (req, res) {
    res.render('login.html')

})
router.post('/students/login', function (req, res) {
    Student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })

    })

})
router.get('/students/new', function (req, res) {
    res.render('new.html')

})
router.post('/students/new', function (req, res) {
    // 读取 转出对象
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})
router.get('/students/edit', function (req, res) {
    Student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })

    })

})
router.post('/students/edit', function (req, res) {
    Student.updataById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })

})
router.get('/students/delete', function (req, res) {

    Student.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')

    })
})
module.exports = router