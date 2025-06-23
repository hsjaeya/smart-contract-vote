import { useState } from "react";
import { connectWallet } from "../ethereum/useContract";

// WalletConnect.jsx
const WalletConnect = ({ address, setAddress }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnecting) return;

    try {
      setIsConnecting(true);
      const account = await connectWallet();
      if (account) {
        setAddress(account); // 부모 컴포넌트의 상태를 설정
      }
    } catch (error) {
      console.error("지갑 연결 실패", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <button
        onClick={handleConnect}
        style={{ padding: "10px 20px", fontSize: "16px" }}
        disabled={isConnecting}
      >
        {isConnecting ? "연결 중..." : "MetaMask 지갑 연결"}
      </button>
      {address && (
        <p style={{ marginTop: "1rem" }}>
          연결된 주소: <strong>{address}</strong>
        </p>
      )}
    </div>
  );
};

export default WalletConnect;
