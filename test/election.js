var Election = artifacts.require('./Election.sol');

contract("Election", (accounts) => {
    it("initializes with 2 candidates", () => {
        return Election.deployed().then(instance => {
            return instance.candidatesCount();
        }).then(count => {
            assert.equal(count, 2);
        })
    })
    it("initializes the candidates with the correct values", () => {
        return Election.deployed().then(instance => {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(candidate => {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct id");
            assert.equal(candidate[2], 0, "contains the correct id");
            return electionInstance.candidates(2);
        }).then(candidate => {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct id");
            assert.equal(candidate[2], 0, "contains the correct id");
        })
    })
    it('allows a voter to cast a vote', () => {
        return Election.deployed().then(instance => {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, {from: accounts[0]});
        }).then(receipt => {
            return electionInstance.voters(accounts[0]);
        }).then(voted => {
            assert(voted, 'the voter was marked as voted');
            return electionInstance.candidates(candidateId);
        }).then(candidate => {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "increments the candidate's vote count")
        })
    })
})