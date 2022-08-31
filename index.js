const express = require('express');
const app = express();
const cors = require('cors');

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/', function (req, res) {
  //   res.header('Content-Type', 'text/plain');
  res.send('<h1>Api de fatima</h1>');
});

app.get('/api/notes', function (req, res) {
  res.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;
  const maxId = generateId;

  if (!body.concat) {
    return response.status(404).json({ error: 'content missing' }).end();
  }

  const note = {
    id: maxId,
    content: body.content,
    important: body.important || false,
    date: new Date().toLocaleDateString(),
  };

  notes.concat(note);

  response.status(200).json(note);
});

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  console.log(notes);
  console.log('body', req.body);

  notes.push(req.body);
  console.log('concat', notes);
  res.json(req.body).end();
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
