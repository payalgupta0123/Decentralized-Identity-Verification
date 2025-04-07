const { expect } = require("chai");

describe("IdentityRegistry", function () {
  let identityRegistry;

  beforeEach(async function () {
    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    identityRegistry = await IdentityRegistry.deploy();
    await identityRegistry.waitForDeployment();
  });

  it("should register a new identity", async function () {
    const [owner] = await ethers.getSigners();

    await identityRegistry.registerIdentity("Alice", "1234");
    const identity = await identityRegistry.getIdentity(owner.address);

    expect(identity.name).to.equal("Alice");
    expect(identity.nationalId).to.equal("1234");
  });
});
