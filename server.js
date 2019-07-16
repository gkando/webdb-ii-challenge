const express = require('express');

const db = require('./data/dbConf.js');

const server = express();

server.use(express.json());
//https://github.com/gkando/webdb-i-challenge/pull/1

//C
server.post('/', validateAccount, (req, res) => {
  const account = req.body;
  db.insert(account)
  .then(result => {
    console.log(result)
    res.status(201).json({
      success: true,
      result: result
    });
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error
    });
  });
})

//R
server.get('/', (req, res) => {
  db.get()
  .then(cars => {
    if (cars) {
      res.status(200).json({
        success: true,
        cars: cars
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No Cars Have Been Created Yet.'
      });
    }
  })
});

//U

server.put('/:id', validateAccount, (req, res) => {  
  const id = req.params.id;
  const changes  = req.body;

  db.update(id, changes)
  .then(count => {
    res.status(200).json({
      success: true, 
      changes: changes,
      count:   count
    });
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error);
  })  
});

//D
server.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(count => {
    res.status(200).json({ 
      success: true, 
      message: 'The account has been deleted.',
      count: count
    });
  }) 
    .catch(error => {
      console.log(error);
      res.status(500).json({
      success: false,
      message: 'The account could not be removed',
    });
  });
});

function validateAccount(req, res, next) {
  if (!req.body.name || !req.body.budget) {   
    let msg =  Object.keys(req.body.name).length === 0 ?
      'Missing Account Name' :
      'Missing Required Budget Field'
    res.status(400).json({
      success: false,
      errorMessage: msg
    });
  } else {
    next();
  }
};

module.exports = server;