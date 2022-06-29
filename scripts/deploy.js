const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
    const gameContract = await gameContractFactory.deploy(
        ["Liu Kang", "Johhny Cage", "Sonya Blade"],       // Names
        ["https://i.imgur.com/djZUoPY.jpeg", // Images
        "https://i.imgur.com/4Pd7arA.jpeg", 
        "https://i.imgur.com/wjeciBU.png"],
        [100, 200, 300],                    // HP values
        [100, 50, 25],
        "Shang Tsung",  // Boss name
        "https://i.imgur.com/Yv5sfPS.mp4", //Boss image
        10000,   // Boss hp
        50  // Boss attack damage 
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT with the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minted NFT #1");

    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #2");

    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log("Minted NFT #3");

    txn = await gameContract.attackBoss();
    await txn.wait();

    console.log("Done deploying and minting!");
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();