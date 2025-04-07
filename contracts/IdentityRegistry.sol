// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract IdentityRegistry {
    struct Identity {
        bytes32 identityHash;
        address verifier;
        bool isVerified;
    }

    mapping(address => Identity) public identities;

    event IdentityRegistered(address user, address verifier, bytes32 identityHash);
    event IdentityVerified(address user);

    function registerIdentity(address user, bytes32 identityHash) public {
        identities[user] = Identity(identityHash, msg.sender, false);
        emit IdentityRegistered(user, msg.sender, identityHash);
    }

    function verifyIdentity(address user) public {
        require(identities[user].verifier == msg.sender, "Not authorized");
        identities[user].isVerified = true;
        emit IdentityVerified(user);
    }

    function getIdentity(address user) public view returns (bytes32, address, bool) {
        Identity memory id = identities[user];
        return (id.identityHash, id.verifier, id.isVerified);
    }
}
