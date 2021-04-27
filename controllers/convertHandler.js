function ConvertHandler() {
  
  // var regex = /^(\d+|\d+.\d+|\d+\/\d+|\d+.\d+\/\d+|)(gal|l|mi|km|lbs|kg)$/i

  this.getNum = function(input) {
    let result = input.match(/^(\d+|\d+\.\d+|\d+\/\d+|\d+\.\d+\/\d+|\d+\/\d+\.\d+|\d+\.\d+\/\d+\.\d+|)[a-z]+$/i)
    if (!result){
      return 'invalid number'
    }
    if (result[1] == ''){
      return 1
    }
    return eval(result[1])
  };
  
  this.getUnit = function(input) {
    if (/^(gal|l|mi|km|lbs|kg)$/i.test(input)){
      return this.spellOutUnit(input)
    }
    let result = input.match(/[^a-zA-Z](gal|l|mi|km|lbs|kg)$/i)

    if (!result){
      return 'invalid unit'
    }
    return this.spellOutUnit(result[1]);
  };
  
  this.getReturnUnit = function(initUnit) {
    if (initUnit == 'gal') {
      return 'L'
    } else if (initUnit == 'L'){
      return 'gal'
    } else if (initUnit == 'mi'){
      return 'km'
    } else if (initUnit == 'km') {
      return 'mi'
    } else if (initUnit == 'lbs'){
      return 'kg'
    } else if (initUnit == 'kg'){
      return 'lbs'
    }
    return 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    let s = unit.toLowerCase()
    if (s == 'l'){
      return 'L'
    }
    return s
  };

  this.getStringForm = function(initUnit) {
    if (initUnit == 'gal') {
      return 'gallons'
    } else if (initUnit == 'L'){
      return 'liters'
    } else if (initUnit == 'mi'){
      return 'miles'
    } else if (initUnit == 'km') {
      return 'kilometers'
    } else if (initUnit == 'lbs'){
      return 'pounds'
    } else if (initUnit == 'kg'){
      return 'kilograms'
    }
  }
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit == 'gal') {
      return {returnNum: parseFloat((initNum * galToL).toFixed(5)), returnUnit: this.getReturnUnit(initUnit) }
    } else if (initUnit == 'L'){
      return {returnNum: parseFloat((initNum / galToL).toFixed(5)), returnUnit: this.getReturnUnit(initUnit) }
    } else if (initUnit == 'mi'){
      return {returnNum: parseFloat((initNum * miToKm).toFixed(5)), returnUnit: this.getReturnUnit(initUnit) }
    } else if (initUnit == 'km') {
      return {returnNum: parseFloat((initNum / miToKm).toFixed(5)), returnUnit: this.getReturnUnit(initUnit) }
    } else if (initUnit == 'lbs'){
      return {returnNum: parseFloat((initNum * lbsToKg).toFixed(5)), returnUnit: this.getReturnUnit(initUnit) }
    } else if (initUnit == 'kg'){
      return {returnNum: parseFloat((initNum / lbsToKg).toFixed(5)), returnUnit: this.getReturnUnit(initUnit) }
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initUnit = this.getStringForm(initUnit)
    returnUnit = this.getStringForm(returnUnit)
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };
  
}

module.exports = ConvertHandler;
