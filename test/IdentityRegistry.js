const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityRegistry", function () {
  let identityRegistry;

  beforeEach(async function () {
    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    identityRegistry = await IdentityRegistry.deploy();
    await identityRegistry.waitForDeployment();
  });

  it("should register a new identity", async function () {
    const [owner] = await ethers.getSigners();

    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("Alice-1234"));

    await identityRegistry.registerIdentity(owner.address, identityHash);

    const [returnedHash, verifier, isVerified] = await identityRegistry.getIdentity(owner.address);

    expect(returnedHash).to.equal(identityHash);
    expect(verifier).to.equal(owner.address);
    expect(isVerified).to.be.false;
  });
});
