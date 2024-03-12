import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import axios from 'axios';
import Decimal from 'decimal.js';

// mock api to get asset price
const getAssetPrice = async (asset: string): Promise<Decimal> => {
    //const response = await axios.get(`https://api.pricing.com/${asset}`);
    return new Decimal(1.69);
};

const calculateCollateralizationRatio = async () => {
    const rpcEndpoint = "https://rpc-osmosis.blockapsis.com";
    //RedBank contract address
    const contractAddress = "osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg";
    const client = await CosmWasmClient.connect(rpcEndpoint);
    //user address
    const userAddress = "osmo17fp60d0uuxne7z0lqf3x4a3s390m3qqm5w93xm";
    const queryMsg = { user_position: { user: userAddress } };
    
    try {
        const positions = await client.queryContractSmart(contractAddress, queryMsg);
        console.log(positions);
        //const collateralsPrice = await getAssetPrice("");
        //const debtsPrice = await getAssetPrice("");
        
        const collateralValue = new Decimal(positions.total_enabled_collateral / 1000000);
        const debtValue = new Decimal(positions.total_collateralized_debt / 1000000);

        if(debtValue.equals(new Decimal(0)) ? 0 : collateralValue.div(debtValue)){
             console.log("Debt value is 0, cannot calculate collateralization ratio.");
             return 0; 
        }
        
        const ratio = collateralValue.div(debtValue);

        // console.log("collateralsPrice:", collateralsPrice);
        // console.log("debtsPrice:", debtsPrice);
        console.log("collateralValue:", collateralValue);
        console.log("debtValue:", debtValue);
        console.log("Collateralization Ratio:", ratio.toString());
    } catch (error) {
        console.error("Error calculating collateralization ratio:", error);
    }
};

calculateCollateralizationRatio().then(r =>console.log("Finiseh all steps.") );