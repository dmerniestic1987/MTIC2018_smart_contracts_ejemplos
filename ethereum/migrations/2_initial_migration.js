var Apuesta = artifacts.require("./Apuesta.sol");

module.exports = function(deployer) {
  deployer.deploy(Apuesta);
};
