const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type, Accept, Authrorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

let students = [
  { id: '1', name: 'Choco1', email: 'choco1@mail.com' },
  { id: '2', name: 'Choco2', email: 'choco2@mail.com' },
  { id: '3', name: 'Choco3', email: 'choco3@mail.com' },
  { id: '4', name: 'Choco4', email: 'choco4@mail.com' },
  { id: '5', name: 'Choco5', email: 'choco5@mail.com' },
  { id: '6', name: 'Choco6', email: 'choco6@mail.com' },
];

app.get('/api/students', (req, res) => {
  if (students.length >= 0) {
    res.status(200).send(students);
  } else {
    res.status(400).send('Not found any student');
  }
});

app.get('/api/students/:id', (req, res) => {
  const id = req.params.id;
  const student = students.find((item) => item.id === id);
  if (student) {
    res.send(student);
  } else {
    res.status(404).send(`Not found student for id ${id}`);
  }
});

app.post('/api/students', (req, res) => {
  const studentName = req.body.name;
  const studentEmail = req.body.email;
  if (studentName.length <= 0) {
    res.status(200), send(`Error cannot add student!`);
  } else {
    const student = {
      id: uuid(),
      name: studentName,
      email: studentEmail,
    };
  }
});

app.delete('/api/student/:id', (req, res) => {
  const id = req.params.id;
  const student = students.find((item) => item.id === id);
  if (student) {
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
  } else {
    res.status(400).send('Error cannot delete student!');
  }
});

app.put('/api/student/:id', (req, res) => {
  const id = req.params.id;
  const studentName = req.body.name;
  const studentEmail = req.body.email;
  if (studentName.length <= 1) {
    res.status(404).send('Error cannot update studnet!');
  } else {
    let student = students.find((item) => item.id === id);
    if (student) {
      student.name = studentName;
      student.email = studentEmail;
      res.send(studnet);
    } else {
      res.status(400).send('Cannot find student to update!');
    }
  }
});

const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`Server run on localhost:${port}`);
});
