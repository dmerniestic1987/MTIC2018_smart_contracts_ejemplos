pragma solidity 0.5.0;

/**
* Este contrato permite mediar el proceso de venta de un bien o 
* o servicio entre un comprador y un vendedor
*/
contract CompraVenta{
    //El balance total que se va acumulando
    uint    public  balance;
    uint    private inicioContrato;
    address payable public  comprador;
    address payable public  vendedor;
    address payable public  escrow;
    bool    public  compradorOk;
    bool    public  vendedorOk;

    constructor() public{
        balance = 0;
        inicioContrato = block.timestamp;
        escrow = tx.origin;
        compradorOk = false;
        vendedorOk = false;
    }
    modifier soloComprador() {
        require(msg.sender == comprador, "Usted no es el comprador");
        _;
    }

    modifier soloEscrow(){
        require(msg.sender == escrow, "Usted no es el Escrow, maldito estafador");
        _;
    }

    modifier partesInvolucradas(){
        require(msg.sender == comprador || msg.sender == vendedor, "Usted no puede operar este contrato");
        _;       
    }
    
    function setVendedor() external{
        require(msg.sender != comprador, "Vendedor debe ser diferente a comprador");
        vendedor = msg.sender;
    }

    function setComprador() external {
        require(msg.sender != vendedor, "Comprador debe ser diferente a vendedor");
        comprador = msg.sender;
    }

    /**
    * Sólo el comprador puede realizar depositos como parte del pago total.
    */
    function depositar() public soloComprador() payable  {
        require(msg.value > 0, "Debe ingresar un monto mayor a 0");
        balance += msg.value;
    }

    /**
    * Acepta las condiciones de la compra-venta. El contrato tiene
    * una duración de 30 días desde su creción. En caso que no se cumpla
    * se le devuelve la plata al comprador
    */
    function aceptar() public partesInvolucradas(){
        if (msg.sender == vendedor)
            vendedorOk = true;
        
        else if (msg.sender == comprador)
            compradorOk = true;

        else if (compradorOk && vendedorOk)
            pagarBalance();
        else if ( compradorOk && 
                  !vendedorOk && 
                  now >= inicioContrato + 30 days ){
            comprador.transfer(balance);
            selfdestruct(escrow);
        }

    }
    
    function cancelar() public partesInvolucradas(){
        if (msg.sender == vendedor)
            vendedorOk = false;
        
        if (msg.sender == comprador)
            compradorOk = false;

        if (!compradorOk && !vendedorOk){
            comprador.transfer(balance);
            balance=0;
            selfdestruct(escrow);
        }
    }

    /**
     * Realiza la operación de pago
     */
    function pagarBalance() private{
        //Sacamos una jugosa comisión del 10%
        escrow.transfer(balance / 10);
        //Transferimos el dinero
        if (vendedor.send(address(this).balance)) {
            balance = 0;
        } else {
            assert(false);
        }       
    }

    function abortarOperacion() public soloEscrow(){
        comprador.transfer(balance);
        balance=0;
        selfdestruct(escrow);
    }
}