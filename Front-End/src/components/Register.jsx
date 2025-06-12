import { useNavigate } from 'react-router-dom';
import Illustration3 from '../assets/doctors-rafik.png';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("nama", e.target[0].value);       
        formData.append("usia", e.target[1].value);       
        formData.append("email", e.target[2].value);  
        formData.append("password", e.target[3].value);   
    
        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            body: formData,
            credentials: "include"
        });
    
        if (response.ok) {
            navigate('/login'); 
        } else {
            const html = await response.text();
            document.documentElement.innerHTML = html; 
        }        
    };    

    return (
        <div className="min-h-screen bg-green-50 flex flex-col md:flex-row items-center justify-center px-6 py-10">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <img
                    src={Illustration3}
                    alt="Register Illustration"
                    className="w-full max-w-md mx-auto"
                />
            </div>

            <div className="bg-[#dcf5b3] rounded-xl p-8 w-full max-w-md shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-green-900 text-center">Register</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nama"
                        className="w-full px-4 py-3 rounded-xl border-none focus:outline-none text-green-800 bg-white"
                    />
                    <input
                        type="number"
                        placeholder="Usia"
                        className="w-full px-4 py-3 rounded-xl border-none focus:outline-none text-green-800 bg-white"
                    />
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
                        REGISTER
                    </button>
                </form>
                <p className="text-green-800 text-center">
                    Punya akun?{' '}
                    <span
                        className="text-green-900 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
