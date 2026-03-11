import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainComponent from './MainComponent';
import ProductsPage from './ProductsPage';
import CarShowcase from './CarShowcase';
import CarDetails from './CarDetails';
import LoginPage from './LoginPage';
import ToSPage from './TermsOfService';
import FreeNewsPage from './FreeNewsPage'; // Import the FreeNewsPage component
import GiorMainDevCV from './DEVS_CV_PART/giorMainDevCv'; // Ensure correct case and path
import DevProfilePage  from './DEVS_CV_PART/DevProfilePage';
import AllDevsPage from './DEVS_CV_PART/AllDevsPage'
import MatlabModule from './DEVS_CV_PART/dataanalysis';
import ChessGameViewer from './DEVS_CV_PART/best_chess_game_gior';
import MainProjects from './DEVS_CV_PART/netcsharp_main_projects';
import ExtraProjectHobbys from './DEVS_CV_PART/extras';
import LatexPage from './DEVS_CV_PART/latex';
import EconomyMain from './economy_general';
import DataProject from './DEVS_CV_PART/data_stuff';
import ClientsPage from './DEVS_CV_PART/payment_clients';
import EconomyProject from './EconomyProject';
import TAPage from './ta';
import MonteCarloPage from './monteCarlo';
import ArbitrageModelsPage from './arbitrage';
import CryptoOptionsStrategies from './options';
import Timeseries from './timeseries';
import ANHStrategy from './ENH';
import TrapStrategy from './trapped';
import StrategyDatabaseDocumentation from './db';
import TDP from './tdp';
import Fwkia from './giwr_personal_stuff/fwkies';

import FwkiesLoginPage from './fwkies/fwkies_login';
import FwkiesGeneralHomepage from './fwkies/fwkies_general_homepage';
import FwkiesMainPage from './fwkies/fwkies_homepage';
import FwkiesNachrichten from './fwkies/fwkies_messages';
import FwkiesProfile from './fwkies/fwkies_profile';
import FwkiesSearch from './fwkies/fwkies_search';
import FwkiesProfileSettings from './fwkies/fwkies_personal_settings';
import FwkiesSignup from './fwkies/fwkies_signup';
import FwkiesAbout from './fwkies/fwkies_about';
import JobAdds from './fwkies/fwkies_aggelies';
import ModeratorControl from './fwkies/moderator_page';
import FwkiesSearchProfiles from './fwkies/fwkies_search_profiles';
import FwkiesArticle from './fwkies/fwkies_article';
import ViewProfile from './fwkies/fwkies_profile_showcase';
import SeatRotation from './cars_seating';
import Eloris from './giwr_personal_stuff/eloris';
import Countdown from './giwr_personal_stuff/final_countdown';
import Costas from './giwr_personal_stuff/costas';
import BikeDetails from './giwr_personal_stuff/bike_viewer';
import PublicBook from './giwr_personal_stuff/book';
// import rallies from './giwr_personal_stuff/rallies';
import Billiard from './Games/Billiard'; 
import Backgammon from './Games/Backgammon'; // Uncomment if you want to use Backgammon
import BoomBoomHeart from './giwr_personal_stuff/boomboomHeart';
import FractalViewer from './giwr_personal_stuff/fractal_circle';
import SteganoTool from './giwr_personal_stuff/kwstas_images';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/car-showcase" element={<CarShowcase />} />
        <Route path="/cars/:carName" element={<CarDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/freenewspage" element={<FreeNewsPage />} /> {/* Add the route for FreeNewsPage */}
        <Route path="/tos" element={<ToSPage />} />
        <Route path="/devs" element={<AllDevsPage />} />
        <Route path="/giorMainDevCV" element={<GiorMainDevCV />} />
        <Route path="/botdev" element={<DevProfilePage />} />
        <Route path="/giorCV/datanal" element={<MatlabModule />} />
        <Route path="/giorCV/chess" element={<ChessGameViewer />} />
        <Route path="/giorCV/coding_projects" element={<MainProjects />} />
        <Route path="/giorCV/extras" element={<ExtraProjectHobbys />}/>
        <Route path="/giorCV/extras/latex_projects" element={<LatexPage />}/>
        <Route path="/economyMain" element={<EconomyMain />} />
        <Route path="/economyProject" element={<EconomyProject />} />
        <Route path="/economyProject/TAPage" element={<TAPage />} />
        <Route path="/giorCV/clients" element={<ClientsPage />} />
        <Route path="/giorCV/chess" element={<ChessGameViewer/>}/>
        <Route path="/giorCV/data_project" element={<DataProject/>}/>
        <Route path="/economyproject/MCPage" element={<MonteCarloPage/>} />
        <Route path="/economyproject/arbitrage" element={<ArbitrageModelsPage/>} />
        <Route path="/economyproject/options" element={<CryptoOptionsStrategies/>}/>
        <Route path="/economyproject/timeseries" element={<Timeseries/>}/>
        <Route path="/economyproject/anh" element={<ANHStrategy/>}/>
        <Route path="/economyproject/trap" element={<TrapStrategy/>}/>
        <Route path="/economyproject/db" element={<StrategyDatabaseDocumentation/>}/>
        <Route path="/KGGTDP" element={<TDP/>}/>
        <Route path="/fwkies_project" element={<Fwkia/>}/>
        <Route path="/elorissss_for_louis_SS" element={<Eloris/>}/>
        <Route path="/countdown" element={<Countdown />}/>
        <Route path="/costas_bike_idea" element={<Costas/>}/>
        <Route path="/oXrhstosPhreAma3iKaiGamithikameOloi" element={<SeatRotation/>}/>
        <Route path="/bike-details" element={<BikeDetails />} />
        <Route path="/book" element={<PublicBook />} />
        {/* <Route path="/rkw-rally" element={<rallies />} /> */}
        <Route path="/heart_fractal_temp_tell_the_damned_dev_to_fix_the_site" element={<FractalViewer/>} />


        <Route path="/fwkies" element={<FwkiesGeneralHomepage />} />
        <Route path="/fwkies_login" element={<FwkiesLoginPage />} />
        <Route path="/fwkies_homepage_logged_in" element={<FwkiesMainPage />} />
        <Route path="/fwkies_messages" element={<FwkiesNachrichten />} />
        <Route path="/fwkies_profile" element={<FwkiesProfile />} />
        <Route path="/fwkies_search" element={<FwkiesSearch />} />
        <Route path="/fwkies_profile_settings" element={<FwkiesProfileSettings />} />
        <Route path="/fwkies_signup" element={<FwkiesSignup />} />
        <Route path="/fwkies_about" element={<FwkiesAbout />} />
        <Route path="/fwkies_aggelies"element={<JobAdds/>} />
        <Route path="/fwkies_moderator" element={<ModeratorControl/>} />
        <Route path="/fwkies_search_profiles" element={<FwkiesSearchProfiles/>} />
        <Route path="/fwkies_article" element={<FwkiesArticle />} />
        <Route path="/fwkies_view_profile" element={<ViewProfile />} />
        

        <Route path="/billiard" element={<Billiard />} />
        <Route path="/backgammon" element={<Backgammon />} /> {/* Uncomment if you want to use Backgammon */}
        <Route path="/invitation_temp" element={<BoomBoomHeart />} />
        <Route path="/fractal" element={<FractalViewer />} />
        <Route path="/secret_images_mouehehe" element={<SteganoTool />} /> {/* Add the route for SteganoTool */}
      </Routes>
    </Router>
  );
}

export default App;
