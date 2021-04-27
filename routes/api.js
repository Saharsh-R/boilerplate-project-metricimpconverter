'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    var {input} = req.query
    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    if (initNum == 'invalid number' && initUnit == 'invalid unit'){
      res.send('invalid number and unit')
    } else if (initNum == 'invalid number'){
      res.send('invalid number')
    } else if (initUnit == 'invalid unit'){
      res.send('invalid unit')
    } else {
      // initUnit = convertHandler.spellOutUnit(initUnit) // no need of this already handled in the converter handle
      let {returnNum, returnUnit} = convertHandler.convert(initNum, initUnit)
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      })
    }
  })



};
