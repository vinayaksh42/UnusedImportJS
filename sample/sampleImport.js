import { usedFunction, unusedFunction }   from './fakeFunction';
import usedValue from './fakeFunction';
import { activeFeature, inactiveFeature } from './fakeFunction';

function testFunction() {
    console.log('This is a test function.');
    usedFunction();
    console.log(usedValue);
}

function anotherFunction() {
    console.log('This function uses an active feature.');
    activeFeature();
}

testFunction();
anotherFunction();
