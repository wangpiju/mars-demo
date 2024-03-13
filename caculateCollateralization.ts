import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import axios from 'axios';
import Decimal from 'decimal.js';

// mock api to get asset price
const getAssetPrice = async (asset: Asset): Promise<Decimal> => {
    //const response = await axios.get(`https://api.pricing.com/${asset}`);
    switch (asset){
        case Asset.UOSMO:
            return new Decimal(1.69);
        case Asset.IBC:
            return new Decimal(70000);
        default:
            return new Decimal(0);
    }
};

enum Asset{
    UOSMO,
    IBC,
}

const calculateCollateralizationRatio = async () => {
    const rpcEndpoint = "https://rpc-osmosis.blockapsis.com";
    //RedBank contract address
    const contractAddress = "osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg";
    const client = await CosmWasmClient.connect(rpcEndpoint);
    //user address
    const userAddress = "osmo17fp60d0uuxne7z0lqf3x4a3s390m3qqm5w93xm";
    const queryCollateralsMsg = { user_collaterals_v2: { user: userAddress } };
    const queryDebtMsg = { user_debts: { user: userAddress } };


    try {
        const collaterals = await client.queryContractSmart(contractAddress, queryCollateralsMsg);
        const collateralsAmount =  collaterals.data[0].amount;
        console.log("collaterals amount: ");
        console.log(collateralsAmount);
        const debts = await client.queryContractSmart(contractAddress, queryDebtMsg)
        const debtsAmount = debts[0].amount;
        console.log("debts amount: ");
        console.log(debtsAmount);

        const collateralsPrice = await getAssetPrice(Asset.UOSMO);
        const debtsPrice = await getAssetPrice(Asset.IBC);
        
        const collateralValue = new Decimal((new Decimal(collateralsAmount / 1000000 ).mul(collateralsPrice)).toFixed(10) );
        const debtValue = new Decimal((new Decimal(debtsAmount / 100000000 ).mul(debtsPrice)).toFixed(10) );

        console.log("collateralsPrice:", collateralsPrice);
        console.log("debtsPrice:", debtsPrice);
        console.log("collateralValue:", collateralValue);
        console.log("debtValue:", debtValue);

        console.log("debtValue.equals(new Decimal(0)):  ", debtValue.equals(new Decimal(0)));

        if(debtValue.equals(new Decimal(0))){
             console.log("Debt value is 0, cannot calculate collateralization ratio.");
             return 0; 
        }
        
        const ratio = collateralValue.div(debtValue);
        console.log("Collateralization Ratio:", ratio.toString());

    } catch (error) {
        console.error("Error calculating collateralization ratio:", error);
    }
};

calculateCollateralizationRatio().then(r =>console.log("Finiseh all steps.") );