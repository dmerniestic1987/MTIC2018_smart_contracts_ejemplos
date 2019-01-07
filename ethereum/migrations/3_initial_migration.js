var VentaEther = artifacts.require("./CompraVenta.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(VentaEther, accounts[1], accounts[2]);
};
