pragma solidity ^0.4.17;

contract Inbox{
    string public message; //Público porque puede ser accesible por cualquier persona en el mundo
    constructor(string initialMessage) public{
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public{
        message = newMessage;
    }
    
    //Con la palabra view tenemos un método de consulta que no consume GAS.
    function getMessage() public view returns (string){
        return message;
    }
}