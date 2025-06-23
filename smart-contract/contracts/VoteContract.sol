// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteContract {
    struct Vote {
        string title;
        string[] options;
        uint[] counts;
        uint deadline;
        bool exists;
    }

    mapping(uint => Vote) public votes;
    mapping(uint => mapping(address => bool)) public hasVoted;
    uint public voteId = 0;

    function createVote(string memory _title, string[] memory _options, uint _duration) public {
        require(_options.length >= 2, unicode"최소 2개 필요");
        Vote storage v = votes[voteId];
        v.title = _title;
        v.options = _options;
        v.counts = new uint[](_options.length);
        v.deadline = block.timestamp + _duration;
        v.exists = true;
        voteId++;
    }

    function vote(uint _voteId, uint _index) public {
        require(!hasVoted[_voteId][msg.sender], unicode"이미 투표함");
        require(block.timestamp < votes[_voteId].deadline, unicode"마감됨");
        votes[_voteId].counts[_index]++;
        hasVoted[_voteId][msg.sender] = true;
    }

    function getVote(uint _voteId) public view returns (
        string memory, string[] memory, uint[] memory, uint
    ) {
        Vote storage v = votes[_voteId];
        return (v.title, v.options, v.counts, v.deadline);
    }

    function getVoteCount() public view returns (uint) {
        return voteId;
    }
}
