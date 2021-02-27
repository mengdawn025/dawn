//操作文件中的数据
//获取学生
var fs = require('fs')
var dbPath = './db.json'
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })

}
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === id
        })

        callback(null, ret)
    })

}
//添加学生
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = students[students.length - 1].id + 1

        students.push(student)
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })

}
//更新学生
exports.updataById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = parseInt(student.id)

        var stu = students.find(function (item) {
            return item.id === student.id
        })
        //遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
//删除学生
exports.deleteById = function (id,callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)

        })
        //删除id

        students.splice(deleteId,1)

        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })

    })

}
