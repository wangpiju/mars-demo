import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const queryPositions = async () => {
    //node rpc
    const client = await CosmWasmClient.connect("https://rpc-osmosis.blockapsis.com");
    //Red Bank contract address
    const contractAddress = "osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg";
    //query string to get user positions
    const queryMsg = {
        user_position: {
            //user addrress
            user: "osmo17fp60d0uuxne7z0lqf3x4a3s390m3qqm5w93xm"
        }
    };

    const userPositions = await client.queryContractSmart(contractAddress, queryMsg);
    
    console.log(userPositions);
};

// cron job, execute 1 time per 10 seconds
setInterval(queryPositions, 10000); // 10 seconds
queryPositions().catch(console.error);