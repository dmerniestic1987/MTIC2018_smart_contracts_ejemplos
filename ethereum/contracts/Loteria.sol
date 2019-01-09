pragma solidity 0.5.0;

contract Loteria{
    address payable public administrador;
    address payable[]  private jugadores;
    address payable ultimoGanador;

    constructor() public{
        administrador = msg.sender;
    }
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function random() private  view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,now, jugadores)));
    }

    function getJugadores() public view returns(address payable[] memory){
        return jugadores;
    }

    function jugar() public payable{
        require(msg.value > 0.01 ether);
        jugadores.push(msg.sender);
    }

    modifier soloAdministrador() {
        require(msg.sender == administrador, "Usted no es el adminsitrador");
        _;
    }
    
    function elegirGanador() public soloAdministrador(){
        require (jugadores.length > 0, 'No hubieron jugadores');
        address payable ganador = jugadores[random() % jugadores.length];
        administrador.transfer(address(this).balance / 20);
        ganador.transfer(address(this).balance);
        jugadores = new address payable[](0);        
        ultimoGanador = ganador;  
    }

    function getUltimoGanador() public view returns (address){
        return ultimoGanador;
    }
}