import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contract/contract";

export const getVoteContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask가 설치되어 있지 않습니다.");
    return null;
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask가 설치되어 있지 않습니다.");
    return;
  }
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    console.error("지갑 연결 실패", error);
    return null;
  }
};
