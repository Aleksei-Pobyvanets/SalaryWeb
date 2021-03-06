//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract salary {
        address owner = msg.sender;

    struct Sal {
        string workerName;
        address payable worker;
        uint salForHour;
        uint workedHours;
        bool doneSalary;
        uint timeLastSalary;
    }

    Sal[] public sals;

    // event WorkerCreated(uint index, string itemName, uint startingPrice, uint duration);
    // event WorkerTakesSalary(uint index, uint finalPrice, address winner);

    event AddWorker(string workerName, address worker, uint salForHour, uint workedHours, uint timeLastSalary);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not an owner");
        _;
    }

    function createWorkersSal(string memory _workerName, uint _salForHour, address payable _worker, uint _workedHours) external onlyOwner{
        require(_salForHour > 0, "Invalid salary");
        require(_workedHours > 0, "Invalid worked hours");


        Sal memory newWorkerSal = Sal({
            workerName: _workerName,
            worker: _worker,
            salForHour: _salForHour,
            workedHours: _workedHours,
            doneSalary: false,
            timeLastSalary: block.timestamp
        });

        sals.push(newWorkerSal);

        emit AddWorker(_workerName, _worker, _salForHour, _workedHours, block.timestamp);
    }


    function checkWorkersName(uint index) public view returns(string memory){
        for(uint i = 0;i < sals.length; i++){
            return sals[index].workerName;
        }
    }

    function paySal() public payable onlyOwner{
        uint calculatedSal = 0 ether;
        
        for(uint i = 0; i < sals.length; i++){
            if(sals[i].doneSalary != true){
                sals[i].worker.transfer(sals[i].salForHour * sals[i].workedHours);
                sals[i].doneSalary = true;
                sals[i].timeLastSalary = block.timestamp;
            }
        }
    }

    function takeEther() public payable {
    }

    function chackEther() public view returns(uint){
        return address(this).balance;
    }


    function rename(uint index, string memory _str) public onlyOwner{
        for(uint i = 0;i < sals.length; i++){
            sals[index].workerName = _str;
        }
    }

    function count() public view returns(uint){
        return sals.length;
    }
}

// 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199   10003
// 0xdD2FD4581271e230360230F9337D5c0430Bf44C0   10003
// 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E   
// 0x2546BcD3c84621e976D8185a91A922aE77ECEc30
// 0xcd3B766CCDd6AE721141F452C550Ca635964ce71

// 1000000000000000000

// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 contract