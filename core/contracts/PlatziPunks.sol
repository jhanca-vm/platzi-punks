// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./PlatziPunksDNA.sol";

contract PlatziPunks is
    ERC721,
    ERC721Enumerable,
    VRFConsumerBaseV2,
    ConfirmedOwner,
    PlatziPunksDNA
{
    using Strings for uint256;

    VRFCoordinatorV2Interface immutable COORDINATOR;

    uint64 immutable s_subscriptionId;
    bytes32 immutable keyHash;

    uint32 constant CALLBACK_GAS_LIMIT = 100000;
    uint16 constant REQUEST_CONFIRMATIONS = 3;
    uint32 constant NUM_WORDS = 1;

    uint256 public maxSupply;
    uint256 internal lastRequestId;
    mapping(uint256 => uint256) internal tokenDNAs;

    constructor(
        address vrfCoordinator,
        uint64 subscriptionId,
        bytes32 _keyHash,
        uint256 _maxSupply
    )
        ERC721("PlatziPunks", "PLPKS")
        VRFConsumerBaseV2(vrfCoordinator)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
        maxSupply = _maxSupply;
    }

    function mint() public {
        require(totalSupply() < maxSupply, "No PlatziPunks left");

        uint256 requestId = requestRandomWords();

        _safeMint(msg.sender, tokenDNAs[lastRequestId]);

        lastRequestId = requestId;
    }

    function imageByDNA(uint256 _dna) public view returns (string memory) {
        return string(abi.encodePacked(_baseURI(), "?", _paramsURI(_dna)));
    }

    function generateInitialRequestId() external onlyOwner {
        require(lastRequestId == 0, "a requestId has already been generated");

        uint256 requestId = requestRandomWords();
        
        lastRequestId = requestId;
    }

    function requestRandomWords() internal returns (uint256) {
        uint256 requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            REQUEST_CONFIRMATIONS,
            CALLBACK_GAS_LIMIT,
            NUM_WORDS
        );

        tokenDNAs[requestId] = 0;

        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        tokenDNAs[_requestId] = _randomWords[0];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721 Metadata: URI query for nonexistent token"
        );

        uint256 dna = tokenDNAs[tokenId];

        string memory json = Base64.encode(
            abi.encodePacked(
                '{ "name": "PlatziPunks #',
                tokenId.toString(),
                '", "description": "Platzi Punks are randomized Avataaars ',
                'stored on chain to teach DApp development on Platzi", ',
                '"image": "',
                imageByDNA(dna),
                '" }'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _paramsURI(uint256 _dna) internal view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "accessoriesType=",
                    getAccessoriesType(_dna),
                    "&clotheColor=",
                    getClotheColor(_dna),
                    "&clotheType=",
                    getClotheType(_dna),
                    "&eyeType=",
                    getEyeType(_dna),
                    "&eyebrowType=",
                    getEyeBrowType(_dna),
                    "&facialHairColor=",
                    getFacialHairColor(_dna),
                    "&facialHairType=",
                    getFacialHairType(_dna),
                    "&hairColor=",
                    getHairColor(_dna),
                    "&hatColor=",
                    getHatColor(_dna),
                    "&graphicType=",
                    getGraphicType(_dna),
                    "&mouthType=",
                    getMouthType(_dna),
                    "&skinColor=",
                    getSkinColor(_dna)
                )
            );
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://avataaars.io/";
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
