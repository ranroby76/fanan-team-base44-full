/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Bjorn from './pages/Bjorn';
import Randomidi from './pages/Randomidi';
import MaxPack from './pages/MaxPack';
import Playlisted from './pages/Playlisted';
import DynamicPack from './pages/DynamicPack';
import sultana2 from './pages/sultana-2';
import galaSe from './pages/gala-se';
import Rythmos from './pages/Rythmos';
import Ymer from './pages/Ymer';
import ContactUs from './pages/ContactUs';
import monica3 from './pages/monica-3';
import scandisoul2 from './pages/scandisoul-2';
import Spacelifter3 from './pages/Spacelifter3';
import Djup from './pages/Djup';
import Arpomaniac from './pages/Arpomaniac';
import GalaDuo from './pages/GalaDuo';
import Truculentus from './pages/Truculentus';
import Home from './pages/Home';
import AnyText from './pages/AnyText';
import Dashboard from './pages/Dashboard';
import saxophiaGen2 from './pages/saxophia-gen2';
import BuyNow from './pages/BuyNow';
import Betelgeuse from './pages/Betelgeuse';
import Ringo from './pages/Ringo';
import kitton3 from './pages/kitton-3';
import Midisquid from './pages/Midisquid';
import Solina2k from './pages/Solina2k';
import MadMidiMachinePack from './pages/MadMidiMachinePack';
import Yogi from './pages/Yogi';
import spacelifter4 from './pages/spacelifter-4';
import HowToBuy from './pages/HowToBuy';
import GalaXL from './pages/GalaXL';
import Midmid from './pages/Midmid';
import scandiclavia2 from './pages/scandiclavia-2';
import Bonnie from './pages/Bonnie';
import Tropicana from './pages/Tropicana';
import FreePack from './pages/FreePack';
import Playlisted2 from './pages/Playlisted2';
import villain from './pages/villain';
import MyPurchases from './pages/MyPurchases';
import Midiverus from './pages/Midiverus';
import tropicanaFun from './pages/tropicana-fun';
import Product from './pages/Product';
import Midimotor from './pages/Midimotor';
import miniRingo from './pages/mini-ringo';
import yowlseq2 from './pages/yowlseq-2';
import _999Gen2 from './pages/999-gen2';
import RandRobin from './pages/RandRobin';
import Callisto from './pages/Callisto';
import AnyImage from './pages/AnyImage';
import GuiMe from './pages/GuiMe';
import Concordia from './pages/Concordia';
import ProductManager from './pages/ProductManager';
import randomidiFree from './pages/randomidi-free';
import kittonStylist from './pages/kitton-stylist';
import Quentin from './pages/Quentin';
import PacksList from './pages/PacksList';
import Brunetta from './pages/Brunetta';
import blueLue from './pages/blue-lue';
import Ziggy from './pages/Ziggy';
import Bella from './pages/Bella';
import zoe2 from './pages/zoe-2';
import Rebellion from './pages/Rebellion';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Bjorn": Bjorn,
    "Randomidi": Randomidi,
    "MaxPack": MaxPack,
    "Playlisted": Playlisted,
    "DynamicPack": DynamicPack,
    "sultana-2": sultana2,
    "gala-se": galaSe,
    "Rythmos": Rythmos,
    "Ymer": Ymer,
    "ContactUs": ContactUs,
    "monica-3": monica3,
    "scandisoul-2": scandisoul2,
    "Spacelifter3": Spacelifter3,
    "Djup": Djup,
    "Arpomaniac": Arpomaniac,
    "GalaDuo": GalaDuo,
    "Truculentus": Truculentus,
    "Home": Home,
    "AnyText": AnyText,
    "Dashboard": Dashboard,
    "saxophia-gen2": saxophiaGen2,
    "BuyNow": BuyNow,
    "Betelgeuse": Betelgeuse,
    "Ringo": Ringo,
    "kitton-3": kitton3,
    "Midisquid": Midisquid,
    "Solina2k": Solina2k,
    "MadMidiMachinePack": MadMidiMachinePack,
    "Yogi": Yogi,
    "spacelifter-4": spacelifter4,
    "HowToBuy": HowToBuy,
    "GalaXL": GalaXL,
    "Midmid": Midmid,
    "scandiclavia-2": scandiclavia2,
    "Bonnie": Bonnie,
    "Tropicana": Tropicana,
    "FreePack": FreePack,
    "Playlisted2": Playlisted2,
    "villain": villain,
    "MyPurchases": MyPurchases,
    "Midiverus": Midiverus,
    "tropicana-fun": tropicanaFun,
    "Product": Product,
    "Midimotor": Midimotor,
    "mini-ringo": miniRingo,
    "yowlseq-2": yowlseq2,
    "999-gen2": _999Gen2,
    "RandRobin": RandRobin,
    "Callisto": Callisto,
    "AnyImage": AnyImage,
    "GuiMe": GuiMe,
    "Concordia": Concordia,
    "ProductManager": ProductManager,
    "randomidi-free": randomidiFree,
    "kitton-stylist": kittonStylist,
    "Quentin": Quentin,
    "PacksList": PacksList,
    "Brunetta": Brunetta,
    "blue-lue": blueLue,
    "Ziggy": Ziggy,
    "Bella": Bella,
    "zoe-2": zoe2,
    "Rebellion": Rebellion,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};