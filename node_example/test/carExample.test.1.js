const assert = require('assert');

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
