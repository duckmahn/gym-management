//login
import Image from 'next/image';
export default function LoginPage() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/backgradmin.png')", 
        backgroundSize: '100% 100%', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
      }}
    >
      {/* Form Container */}
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8 rounded-lg pt-40">
        {/* Logo */}
        <div className="w-32 h-32">
          <Image
            src="/logo.png" 
            alt="Logo"
            width={128}
            height={128}
          />
        </div>

        
        <form className="flex flex-col space-y-4 w-72">
          
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <i className="fas fa-user text-white"></i>
            </span>
            <input
              type="text"
              placeholder="USERNAME"
              className="w-full pl-10 px-4 py-2 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none"
            />
          </div>

          
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <i className="fas fa-lock text-white"></i>
            </span>
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full pl-10 px-4 py-2 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none"
            />
          </div>

          
          <button className="w-full py-2 rounded-lg bg-white text-red-600 font-bold">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
