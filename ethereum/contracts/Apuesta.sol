pragma solidity >=0.4.24 <0.6.0;

contract Apuesta{
    enum    Estado { Creada, Abierta, Cerrada }
    address public owner;
    address private apostador1;
    address private apostador2;
    uint256 private valorApostado;
    uint256 private totalApostado;
    uint256 public  idEvento;
    Estado  public  estado;
    
    constructor(uint256 eventoId) public{
        owner = msg.sender;
        idEvento = eventoId;
        estado = Estado.Creada;
        totalApostado = 0;
    }
    
    modifier enEstado(Estado _Estado) {
        require(estado == _Estado, "No es el estado correcto");
        _;
    }
    
    modifier diferenteApostador1(){
        require(msg.sender != apostador1, "No puede apostar contra si mismo");
        _;
    }
    
    modifier valorPositivo(){
        require(msg.value > 0, "Ingrese monto mayor a cero");
        _;
    }
    
    modifier mismoValorApostado(){
        require(msg.value == valorApostado, "Ingrese el mismo valor");
        _;        
    }
    
    function abrirApuesta() enEstado(Estado.Creada) valorPositivo() public payable{
        apostador1 = msg.sender;
        valorApostado = msg.value;
        totalApostado += msg.value;
        estado = Estado.Abierta;
    }
    
    function aceptarApuesta() enEstado(Estado.Abierta) diferenteApostador1() mismoValorApostado() public payable{
        apostador2 = msg.sender;
        totalApostado += msg.value;
    }
    
    function getValorPostado() public view returns (uint256){
        return valorApostado;
    }
    
    function getApostador1() public view returns (address){
        return apostador1;
    }
    
    function getApostador2() public view returns (address){
        return apostador2;
    }
}