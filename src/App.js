import LandingPage from "./LandingPage";
import { ResumePage, AmhNlpPage, DetailsPage, OwnedByPage, BlogPage, BlogPostPage } from "./components";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";

import { db } from './firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import { fallbackInfo } from "./data/fallback";

function App() {

  // Render immediately with local fallback data; Firestore overrides it when available.
  const [myData, setMyData] = useState(fallbackInfo);

  useEffect(() => {
    let mounted = true;
    const getMyData = async () => {
      try {
        const ref = doc(db, "constants", 'info');
        const docSnap = await getDoc(ref);
        if (mounted && docSnap.exists()) {
          setMyData({ ...fallbackInfo, ...docSnap.data() });
        }
      } catch (err) {
        // Offline / Firestore unavailable — local fallback data stays in place.
      }
    };
    getMyData();
    return () => { mounted = false; };
  }, []);

  return (
    <UserContext.Provider value={{myData, setMyData}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="work/:id" element={<DetailsPage />} />
          <Route path="owned-by" element={<OwnedByPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="amh-nlp" element={<AmhNlpPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
