const express = require('express');const router = express.Router();

let listStudent = [
  { id: 1, name: 'aclice' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'join' }
];
router.get('/', function (req, res) {
  res.status(200).json(listStudent);
});
// router.get('/:id', function (req, res) {
//     const { id } = req.params
//     console.log(id);
//     res.json(listStudent.filter((el) => el.id === Number(id)))
// })
router.put('/edit/:id', function (req, res) {
  const id = req.params.id;
  let tesst = listStudent.map(el => {
    if (el.id === Number(id)) {
      console.log('🚀 ~ file: student.js:19 ~ req:', req.body);
      return req.body;
    } else {
      return el;
    }
  });
  listStudent = tesst;
  console.log('test', tesst);
  res.send('oke');
});
router.delete('/delete/:id', function (req, res) {
  let id = req.params.id;
  let newStudent = listStudent.filter(el => el.id !== Number(id));
  listStudent = newStudent;
  res.json(listStudent);
});
router.post('/create', function (req, res) {
  console.log('🚀 ~ file: student.js:23 ~ req:', req.body);
  listStudent.push(req.body);

  res.send('oke');
});
module.exports = router;
