pragma solidity ^0.4.17;

contract CampaginFactory {
    address[] public deployedCampagin;

    function createCampagin(uint minimum) public {
        // creates new contract
        address newCampaign = new Campagin(minimum, msg.sender);

        deployedCampagin.push(newCampaign);
    }

    function getDeployedContracts() public view returns(address[]) {
        return deployedCampagin;
    }
}

contract Campagin {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campagin(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;

        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) 
        public restricted {
            // no need to have approvals cause ref type might not be init
            Request memory request = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });

            requests.push(request);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount/2));
        require(!request.complete);

        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}