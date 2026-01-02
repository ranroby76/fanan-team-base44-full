import Home from './pages/Home';
import HowToBuy from './pages/HowToBuy';
import ContactUs from './pages/ContactUs';
import BuyNow from './pages/BuyNow';
import GuiMe from './pages/GuiMe';
import MadMidiMachinePack from './pages/MadMidiMachinePack';
import MaxPack from './pages/MaxPack';
import FreePack from './pages/FreePack';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "HowToBuy": HowToBuy,
    "ContactUs": ContactUs,
    "BuyNow": BuyNow,
    "GuiMe": GuiMe,
    "MadMidiMachinePack": MadMidiMachinePack,
    "MaxPack": MaxPack,
    "FreePack": FreePack,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};