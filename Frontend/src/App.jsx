// import React from 'react';
// import Login from './pages/Login';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home';
// import Register from './pages/Register';
// import { UserData } from './context/User';
// import Loading from './components/Loading';
// import Admin from './pages/Admin';
// import Playlist from './pages/Playlist';
// import Album from './pages/Album';
// const App = () => {
//   const {loading, user, isAuth} = UserData(); 
//   return (
//     <>
//     { loading ?(
//       <Loading/>
//       ):(
//      <BrowserRouter>
//         <Routes>
//          <Route path='/' element={isAuth? <Home/> : <Login/>}/>
//          <Route path='/admin' element={isAuth? <Admin/> : <Login/>}/>
//           <Route path='/login' element={isAuth? <Home/> :<Login/>}/>
//           <Route path='/register' element={isAuth? <Home/> : <Register/>}/>
//           <Route path='/playlist' element={isAuth? <Playlist user= { user } /> : <Login />}/>
//           <Route path='/album/:id' element={isAuth? <Album user= { user } /> : <Login />}/>
//        </Routes>
//     </BrowserRouter>
//     )}
//     </>
  
//   );
// }

// export default App


import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import { UserData } from './context/User';
import Loading from './components/Loading';
import Admin from './pages/Admin';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import { SongProvider } from './context/Song'; // Import SongProvider
import Player from './components/Player'; // Import Player component
import Search from './pages/Search';
import SongCard from './components/SongCard';

const App = () => {
  const { loading, user, isAuth } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SongProvider>
          <BrowserRouter>
            {/* Application Routes */}
            <Routes>
              <Route path="/" element={isAuth ? <Home /> : <Login />} />
              <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route path="/register" element={isAuth ? <Home /> : <Register />} />
              <Route path="/playlist" element={isAuth ? <Playlist user={user} /> : <Login />} />
              <Route path="/album/:id" element={isAuth ? <Album user={user} /> : <Login />} />
              <Route path="/search" element={isAuth ? <Search/> : <Login />} />
            </Routes>

            {/* Persistent Player Component */}
              <Player /> {/* Ensure this is only here, not inside routes */}
          </BrowserRouter>
        </SongProvider>
      )}
    </>
  );
};

export default App;



// import React from 'react';
// import Login from './pages/Login';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Register from './pages/Register';
// import { UserData } from './context/User';
// import Loading from './components/Loading';
// import Admin from './pages/Admin';
// import Playlist from './pages/Playlist';
// import Album from './pages/Album';
// import { SongProvider } from './context/Song'; // Import SongProvider
// import Player from './components/Player'; // Import Player component
// import Search from './pages/Search';
// import { SongData } from './context/Song';

// const App = () => {
//   const { loading, user, isAuth } = UserData();
//   const { selectedSong } = SongData(); // Import selectedSong
  
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <SongProvider>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/" element={isAuth ? <Home /> : <Login />} />
//               <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
//               <Route path="/login" element={isAuth ? <Home /> : <Login />} />
//               <Route path="/register" element={isAuth ? <Home /> : <Register />} />
//               <Route path="/playlist" element={isAuth ? <Playlist user={user} /> : <Login />} />
//               <Route path="/album/:id" element={isAuth ? <Album user={user} /> : <Login />} />
//               <Route path="/search" element={isAuth ? <Search /> : <Login />} />
//             </Routes>
  
//             {/* Only show Player when a song is selected */}
//             {selectedSong && <Player />}
//           </BrowserRouter>
//         </SongProvider>
//       )}
//     </>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import Register from './pages/Register';
// import { UserProvider, UserData } from './context/User';
// import Loading from './components/Loading';
// import Admin from './pages/Admin';
// import Playlist from './pages/Playlist';
// import Album from './pages/Album';
// import { SongProvider } from './context/Song';
// import MainLayout from './MainLayout';
// import AuthLayout from './AuthLayout';
// import Player from './components/Player'; // Import Player component


// const AppContent = () => {
//   const { loading, user, isAuth } = UserData();
//   const location = useLocation(); // Access current path

//   console.log('Current Path:', location.pathname); // Debugging
//   const hidePlayerRoutes = ['/login', '/register'];
//   const isPlayerVisible = !hidePlayerRoutes.includes(location.pathname);

//   console.log('Is Player Visible:', isPlayerVisible); // Debugging

//   return loading ? (
//     <Loading />
//   ) : (
//     <SongProvider>
//       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//         <Routes>
//           <Route path="/" element={isAuth ? <Home /> : <Login />} />
//           <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
//           <Route path="/login" element={isAuth ? <Home /> : <Login />} />
//           <Route path="/register" element={isAuth ? <Home /> : <Register />} />
//           <Route path="/playlist" element={isAuth ? <Playlist user={user} /> : <Login />} />
//           <Route path="/album/:id" element={isAuth ? <Album user={user} /> : <Login />} />
//         </Routes>

//         {/* Render the Player only if it's not in hidePlayerRoutes */}
//         {isPlayerVisible && <Player />}
//       </div>
//     </SongProvider>
//   );
// };


// export default AppContent;

