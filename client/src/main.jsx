import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import merge from "lodash.merge";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#37474F",
    closeButtonBackground: "#37474F",
    connectButtonBackground: "#37474F",
    connectButtonBackgroundError: "#37474F",
    connectButtonInnerBackground: "#37474F",
    downloadBottomCardBackground: "#37474F",
    downloadTopCardBackground: "#37474F",
  },
});

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";


const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(

    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider theme={myTheme} chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </>

);

