import { useNavigate } from 'react-router-dom';
import Illustration2 from '../assets/doctors-amico.png';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col md:flex-row items-center justify-center px-6 py-10">
            <div className="bg-[#dcf5b3] rounded-xl p-8 w-full max-w-md md:mr-10 shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-green-900 text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border-none focus:outline-none text-green-800 bg-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl border-none focus:outline-none text-green-800 bg-white"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 rounded-xl"
                    >
                        LOGIN
                    </button>
                </form>
                <p className="text-green-800 text-center">
                    Belum punya akun?{' '}
                    <span
                        className="text-green-900 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </span>
                </p>
            </div>

            <div className="w-full md:w-1/2 mt-10 md:mt-0">
                <img
                    src={Illustration2}
                    alt="Login Illustration"
                    className="w-full max-w-md mx-auto"
                />
            </div>
        </div>
    );
};

export default Login;
