export default function Navbar(){

    return (
    
    <nav className="
    fixed
    top-0
    left-0
    right-0
    z-50
    bg-[#050816]/80
    backdrop-blur
    border-b
    border-gray-800
    ">
    
    
    <div className="
    max-w-7xl
    mx-auto
    px-6
    py-5
    flex
    justify-between
    items-center
    ">
    
    
    <h1 className="
    text-2xl
    font-bold
    ">
    
    Resume<span className="text-blue-500">
    AI
    </span>
    
    </h1>
    
    
    
    <div className="flex gap-8 text-gray-300">
    
    <a>
    Features
    </a>
    
    <a>
    Pricing
    </a>
    
    <a>
    Login
    </a>
    
    
    <button className="
    bg-blue-600
    px-5
    py-2
    rounded-lg
    ">
    
    Get Started
    
    </button>
    
    
    </div>
    
    
    </div>
    
    
    </nav>
    
    )
    
    }