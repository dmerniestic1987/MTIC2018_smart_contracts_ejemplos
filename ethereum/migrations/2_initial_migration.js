var VentaEther = artifacts.require("./VentaEther.sol");

module.exports = function(deployer) {
  deployer.deploy(VentaEther);
};
