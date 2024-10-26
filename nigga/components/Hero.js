import { useRouter } from 'next/router'; // Ensure this line is present

const Hero = () => {
  const router = useRouter(); // Initialize the router

  const routetochatbox = () => {
    router.push('/chat'); // Use router.push for navigation
  };
  
  const routetochatbox1 =()=>{
    router.push('/newchat')
  }
   
  const routetoform =() =>{
    router.push('/FinancialForm')
  }
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center"
      style={{ backgroundImage: "url('/hero1-image.jpg')" }}
    >
      <div className="container mx-auto flex flex-col justify-center items-center h-full px-6 space-y-6">
        <h1 className="text-6xl font-bold text-white mb-10 text-center">
          Revolutionize Your Investments with <br /> AI-Powered Regional Insights
        </h1>

        <div className="flex justify-center items-center space-x-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 w-80 h-80 text-left rounded-lg shadow-lg text-white hover:backdrop-blur-xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to Empower</h1>
            <p className="text-lg mb-6">
              Bridging the gap in financial education for all, with personalized learning paths and community engagement.
            </p>
            <a href="#explore" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Discover More
            </a>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 w-80 h-80 text-left rounded-lg shadow-lg text-white hover:backdrop-blur-xl">
            <h1 className="text-4xl font-bold mb-4 ">Personal Assistant</h1>
            <p className="text-lg mb-6 ">
              Get AI-powered guidance and interactive simulations to enhance your financial literacy.
            </p>
            <button onClick={routetochatbox} className="bg-blue-500 mt-5 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Learn More
            </button>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 w-80 h-80 text-left rounded-lg shadow-lg text-white hover:backdrop-blur-xl">
            <h1 className="text-4xl font-bold mb-4">Get Started</h1>
            <p className="text-lg mb-6">
              Become part of a thriving community focused on financial empowerment and growth.
            </p>
            <button onClick={routetoform} href="#get-started" className="bg-blue-500 hover:bg-blue-600 mt-14 text-white font-semibold py-2 px-4 rounded">
              Get Started
            </button>  
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-10 right-10">
          <button 
            onClick={routetochatbox1} 
            className="bg-blue-500 p-2 hover:bg-blue-600 text-white font-bold  rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          > <h1 className='p-2'>Take Advice</h1>
            <svg  className='p-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />

</svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
