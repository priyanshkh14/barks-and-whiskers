import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp';
import Blogs from './pages/Blogs';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateRehome from './pages/CreateRehome';
import UpdateRehome from './pages/UpdateRehome';
import Rehome from './pages/Rehome';
import Search from './pages/Search';
import Footer from './components/Footer';
import CallToActionsSection from './components/CallToActionsSection';
import BlogDetails from './pages/BlogDetails';

export default function App() {
  return (
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path='/search' element={<Search />} />
      <Route path='/rehome/:rehomeId' element={<Rehome />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path='/create-rehome' element={<CreateRehome />} />
        <Route path='/update-rehome/:rehomeId' element={<UpdateRehome />} />
      </Route> 
    </Routes>
    <CallToActionsSection />
    <Footer />
  </BrowserRouter>
)}