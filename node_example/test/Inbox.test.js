const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

class Car{
    park(){
        return 'parado';
    }

    drive(){
        return 'vroooom';
    }
}

describe('Test de Car', () => {
    it('Puede estancionar', () => {
        const car = new Car();
        assert.equal(car.park(), 'parado');    
    });

    it('Puede manejar', () => {
        const car = new Car();
        assert.equal(car.drive(), 'vroooom');    
    });
});
