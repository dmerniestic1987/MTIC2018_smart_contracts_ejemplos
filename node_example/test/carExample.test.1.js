/*
* Ejemplos de algunos test unitarios con Mocha - Sólo javascript
*/
const assert = require('assert');

class Car{
    estacionar(){
        return 'parado';
    }

    manejar(){
        return 'vroooom';
    }
}

class Moto{
    estacionar(){
        return 5;
    }
}

let car; 
beforeEach(() => {
    console.log('************************************');
    console.log('Test unitarios en javascrit/solidity');
    console.log('************************************');
});

beforeEach(() => {
    car = new Car();
});

describe('Car Test', () => {
    it('Puede estancionar', () => {
        assert.equal(car.estacionar(), 'parado');    
    });

    it('Puede manejar', () => {
        assert.equal(car.manejar(), 'vroooom');    
    });

    it ('Moto puede estacionar', () => {
        const moto = new Moto();
        assert.equal(moto.estacionar(), 5);    
        assert.equal(moto.estacionar(), '5');
    });
});
