import { Web3Provider } from 'ethers/providers';


export const etherProvider = () => {
    const provider = new Web3Provider(window.ethereum);
    return provider
}