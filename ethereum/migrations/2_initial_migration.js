var Loteria = artifacts.require("./Loteria.sol");

module.exports = function(deployer) {
  deployer.deploy(Loteria);
};
