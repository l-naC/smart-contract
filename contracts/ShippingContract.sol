//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

contract ShippingContract {
    address private owner;
    address payable internal delivery =
        0xc71fDbDE4938D7605528FD998a7a5F5420eAbB6A;

    enum Status {Pending, Shipped, Delivered}
    Status public shippementStatus;

    event ChangeStatus(Status);

    struct Order {
        uint256 id;
        Status status;
    }

    Order[] public orders;

    constructor() public {
        owner = msg.sender;
    }

    function createOrder(uint256 _id) public {
        orders.push(Order(_id, Status.Pending));
        emit ChangeStatus(Status.Pending);
    }

    function orderSent() public {
        emit ChangeStatus(shippementStatus);
        shippementStatus = Status.Shipped;
    }

    function orderDelivered() public {
        emit ChangeStatus(shippementStatus);
        shippementStatus = Status.Delivered;
    }

    function getStatus() public view returns (Status) {
        return shippementStatus;
    }

    function deliveryTip() external payable {
        require(shippementStatus == Status.Delivered);
        delivery.transfer(msg.value);
    }
}
