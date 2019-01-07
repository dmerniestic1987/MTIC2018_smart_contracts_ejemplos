var VentaEther = artifacts.require("./CompraVenta.sol");

module.exports = function(deployer) {
  deployer.deploy(VentaEther);
};
