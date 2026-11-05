import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

import Home1 from './Pages/Home1';
import AboutUs from './Pages/AboutUs';
import OurServices from './Pages/OurServices';
import Programs from './Pages/Programs';
import Gallery from './Pages/Gallery';
import Contact from './Pages/Contact';
import ProgramDetail from './Pages/ProgramDetail';
import FourMonthsDetail from './Pages/FourMonthsDetail';
import SixMonthsDetail from './Pages/SixMonthsDetail';
import Footer from '@/Component/Footer';
import AdminDashboard from './Pages/AdminDashboard';
import FourWeeksDetail from './Pages/FourWeeksDetail';
import ThreeWeeksDetail from './Pages/ThreeWeeksDetail';
import Blog from './Pages/Blog';
import BlogPost from './Pages/BlogPost';
import Qoute from './Pages/Qoute';
import Password from './Pages/Password';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/program" element={<Programs />} />
        <Route path="/Services" element={<OurServices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/program/three-months" element={<ProgramDetail />} />
        <Route path="/program/four-months" element={<FourMonthsDetail />} />
        <Route path="/program/six-months" element={<SixMonthsDetail />} />
        <Route path="/program/four-weeks" element={<FourWeeksDetail />} />
        <Route path="/program/three-Weeks" element={<ThreeWeeksDetail />} />

        <Route path="/reset-password" element={<Password />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/qoute" element={<Qoute />} />
      </Routes>

      {location.pathname !== "/reset-password" && <Footer />}
    </>
  );
}