import BuyNow from './pages/BuyNow';
import ContactUs from './pages/ContactUs';
import FreePack from './pages/FreePack';
import GuiMe from './pages/GuiMe';
import Home from './pages/Home';
import HowToBuy from './pages/HowToBuy';
import MadMidiMachinePack from './pages/MadMidiMachinePack';
import MaxPack from './pages/MaxPack';
import PacksList from './pages/PacksList';
import Playlisted2 from './pages/Playlisted2';
import __Layout from './Layout.jsx';


export const PAGES = {
    "BuyNow": BuyNow,
    "ContactUs": ContactUs,
    "FreePack": FreePack,
    "GuiMe": GuiMe,
    "Home": Home,
    "HowToBuy": HowToBuy,
    "MadMidiMachinePack": MadMidiMachinePack,
    "MaxPack": MaxPack,
    "PacksList": PacksList,
    "Playlisted2": Playlisted2,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};