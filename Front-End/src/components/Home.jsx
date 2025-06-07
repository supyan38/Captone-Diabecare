import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Illustration1 from '../assets/doctors-cuate.png';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-green-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10">
            <div className="md:w-1/2 w-full space-y-6 text-center md:text-left">
                <div className="absolute top-6 left-6 md:left-16 flex items-center space-x-2 md:pb-0">
                    <img src={logo} alt="Diabecare Logo" className="w-10 h-10" />
                    <h1 className="text-xl font-bold text-[#792d6d]">DIABECARE</h1>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 leading-snug pt-16">
                    SAHABAT SEHAT UNTUK HIDUP BEBAS DIABETES!
                </h2>

                <p className="text-green-700">
                    Masuk dan temukan cara terbaik untuk menjaga kadar gula darah tetap stabil.
                </p>
                
                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full md:w-40 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-xl"
                    >
                        Login
                    </button>
                    <div className="text-green-900">Belum punya akun?</div>
                    <button
                        onClick={() => navigate("/register")}
                        className="w-full md:w-40 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-xl"
                    >
                        Register
                    </button>
                </div>
            </div>
        
            <div className="md:w-1/2 w-full mt-10 md:mt-0">
                <img
                    src={Illustration1}
                    alt="Home Illustration"
                    className="w-full max-w-md mx-auto"
                />
            </div>
        </div>
    );
};

export default Home;