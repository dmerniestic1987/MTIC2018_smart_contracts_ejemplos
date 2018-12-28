pragma solidity >=0.4.21 <0.6.0;

contract VentaEther {
    enum EstadoCompra { Creada, Cerrada }
    address          public vendedor;
    address          public comprador; 
    EstadoCompra     public estadoCompra;
    uint256 constant public PRECIO_VENTA = 1 ether;
    
    //El que deploya el contrato es el vendedor. El monto debe ser > 0
    constructor() public payable {
        vendedor = msg.sender;
        estadoCompra = EstadoCompra.Creada;
        
    }

    modifier soloComprador() {
        require(msg.sender == comprador, "Usted no es el comprador");
        _;
    }

    modifier soloVendedor() {
        require(msg.sender == vendedor, "Usted no es el vendedor");
        _;
    }

    modifier enEstado(EstadoCompra _EstadoCompra) {
        require(estadoCompra == _EstadoCompra, "No es el estado correcto");
        _;
    }

    event CompraAbortada();
    event CompraConfirmada();
    event ProductoRecibido();

    /// Aborta la venta
    function abortarVenta() soloVendedor enEstado(EstadoCompra.Creada) public payable{
        emit CompraAbortada();
        estadoCompra = EstadoCompra.Cerrada;
    }

    /// Confirme la compra como comprador.
    /// La transacción tiene que incluir el ether `2 * value`.
    /// El éter se bloquea hasta que se llama a 
    /// ConfirmReeceived.
    function comprar() enEstado(EstadoCompra.Creada) public payable{
        require(msg.value == PRECIO_VENTA, "La operación cuesta 1 Ether");
        emit CompraConfirmada();
        comprador = msg.sender;
        estadoCompra = EstadoCompra.Cerrada;
        //vendedor.transfer(msg.value);
                
    }
}    