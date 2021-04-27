const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('read whole number input', () => {
        assert.equal(convertHandler.getNum('45kg'), 45, 'whole number not equal')
        assert.equal(convertHandler.getNum('45kgs'), 45, 'whole number not equal')
    })

    test('read decimal number input', () => {
        assert.equal(convertHandler.getNum('45.5kg'), 45.5, 'decimal number not equal')
        assert.equal(convertHandler.getNum('45.5kgs'), 45.5, 'decimal number not equal')
    })

    test('read fractional number input', () => {
        assert.equal(convertHandler.getNum('2/3kg'), 2/3, 'fractional number not equal')
        assert.equal(convertHandler.getNum('1/5kgs'), 0.2, 'fractional number not equal')
    })

    test('read fractional decimal number input', () => {
        assert.equal(convertHandler.getNum('2.5/6kg'), 2.5/6, 'fractional decimal number not equal')
        assert.equal(convertHandler.getNum('1.2/5kgs'), 0.24, 'fractional decimal number not equal')
        assert.equal(convertHandler.getNum('1.2/5.1kgs'), 1.2/5.1, 'fractional decimal number not equal')
        assert.equal(convertHandler.getNum('12/5.5kgs'),12/5.5, 'fractional decimal number not equal')
    })

    test('double fraction or an invalid number', () => {
        assert.equal(convertHandler.getNum('1/2/4kgs'), 'invalid number', 'double fraction or an invalid number')
    })

    test('insert 1 if empty', () => {
        assert.equal(convertHandler.getNum('kg'),1 , '1 not inserted automatically')
        assert.equal(convertHandler.getNum('kgsfg'),1 , '1 not inserted automatically')
    })

    test('units', () => {
        assert.equal(convertHandler.getUnit('2kg'),'kg' )
        assert.equal(convertHandler.getUnit('L'),'L' )
        assert.equal(convertHandler.getUnit('l'),'L' )
        assert.equal(convertHandler.getUnit('2kG'),'kg' )
        assert.equal(convertHandler.getUnit('Kg'),'kg' )
        assert.equal(convertHandler.getUnit('42.4mi'),'mi' )
        assert.equal(convertHandler.getUnit('32lBs'),'lbs' )
        assert.equal(convertHandler.getUnit('gal'),'gal' )
        assert.equal(convertHandler.getUnit('km'),'km' )
    })

    test('invalid unit', () => {
        assert.equal(convertHandler.getUnit('kam'),'invalid unit' , 'kam')
        assert.equal(convertHandler.getUnit('kms'),'invalid unit' , 'kms')
        assert.equal(convertHandler.getUnit('skm'),'invalid unit', 'skm' )
    })

    test('get desired units', () => {
        assert.equal(convertHandler.getReturnUnit('gal'),'L' )
        assert.equal(convertHandler.getReturnUnit('L'),'gal' )
        assert.equal(convertHandler.getReturnUnit('mi'),'km' )
        assert.equal(convertHandler.getReturnUnit('km'),'mi' )
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg' )
        assert.equal(convertHandler.getReturnUnit('kg'),'lbs' )
    })

    test('get correct spelled out unit', () => {
        assert.equal(convertHandler.spellOutUnit('gAl'),'gal' )
        assert.equal(convertHandler.spellOutUnit('L'),'L' )
        assert.equal(convertHandler.spellOutUnit('l'),'L' )
        assert.equal(convertHandler.spellOutUnit('km'),'km' )
        assert.equal(convertHandler.spellOutUnit('lbS'),'lbs' )
        assert.equal(convertHandler.spellOutUnit('kg'),'kg' )
    })

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    test('gal to L', () => {
        let data = convertHandler.convert(1, 'gal')
        assert.approximately(data.returnNum, galToL, 0.0001)
        assert.equal(data.returnUnit, 'L')
    })

    test('L to gal', () => {
        let data = convertHandler.convert(1, 'L')
        assert.approximately(data.returnNum, 1/galToL, 0.0001)
        assert.equal(data.returnUnit, 'gal')
    })

    test('lbs to kg', () => {
        let data = convertHandler.convert(1, 'lbs')
        assert.approximately(data.returnNum, lbsToKg, 0.0001)
        assert.equal(data.returnUnit, 'kg')
    })

    test('kg to lbs', () => {
        let data = convertHandler.convert(1, 'kg')
        assert.approximately(data.returnNum, 1/lbsToKg, 0.0001)
        assert.equal(data.returnUnit, 'lbs')
    })

    test('mi to km', () => {
        let data = convertHandler.convert(1, 'mi')
        assert.approximately(data.returnNum, miToKm, 0.0001)
        assert.equal(data.returnUnit, 'km')
    })

    test('km to mi', () => {
        let data = convertHandler.convert(1, 'km')
        assert.approximately(data.returnNum, 1/miToKm, 0.0001)
        assert.equal(data.returnUnit, 'mi')
    })
    

});
