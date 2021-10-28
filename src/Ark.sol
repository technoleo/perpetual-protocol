// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.6.9;
pragma experimental ABIEncoderV2;

import { Decimal, SafeMath } from "./utils/Decimal.sol";
import { IERC20 } from "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import { PerpFiOwnableUpgrade } from "./utils/PerpFiOwnableUpgrade.sol";
import { DecimalERC20 } from "./utils/DecimalERC20.sol";
import { BlockContext } from "./utils/BlockContext.sol";

contract Ark is PerpFiOwnableUpgrade {
    using Decimal for Decimal.decimal;
    using SafeMath for uint256;

    //
    // EVENT
    //
    event WithdrawnForLoss(address withdrawer, uint256 amount);

    struct WithdrawnToken {
        uint256 timestamp;
        Decimal.decimal cumulativeAmount;
    }

    address public insuranceFund;
    // An array of token withdraw timestamp and cumulative amount
    WithdrawnToken[] private withdrawnTokenHistory;

    uint256[50] private __gap;

    //
    // FUNCTIONS
    //

    // withdraw for covering unexpected loss, only insurance fund
    function withdrawForLoss(Decimal.decimal memory _amount, address _quoteToken) public override {
        require(insuranceFund == _msgSender(), "only insuranceFund");
        require(_balanceOf(_quoteToken, address(this)).toUint() >= _amount.toUint(), "insufficient funds");

        // stores timestamp and cumulative amount of withdrawn token
        Decimal.decimal memory cumulativeAmount;
        uint256 len = withdrawnTokenHistory.length;
        if (len == 0) {
            cumulativeAmount = _amount;
        } else {
            cumulativeAmount = withdrawnTokenHistory[len - 1].cumulativeAmount.addD(_amount);
        }
        // store the widthraw history
        withdrawnTokenHistory.push(
            WithdrawnForLoss({ timestamp: _blockTimestamp(), cumulativeAmount: cumulativeAmount })
        );

        _transfer(_quoteToken, _msgSender(), _amount);
        emit WithdrawnForLoss(_msgSender(), _amount.toUint());
    }

    // only owner can withdraw funds anytime
    function claimTokens(address _to, address _token) external onlyOwner {
        require(_to != address(0), "to address is required");
        if (_token == address(0)) {
            _to.transfer(address(this).balance);
        } else {
            _transfer(_token, _to, _balanceOf(_token, address(this)));
        }
    }

    function setInsuranceFund(address _insuranceFund) external onlyOwner {
        insuranceFund = _insuranceFund;
    }
}