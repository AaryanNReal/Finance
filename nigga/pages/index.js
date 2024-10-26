// pages/index.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="p-4">
        <FAQ />
        {/* Other homepage content here */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
