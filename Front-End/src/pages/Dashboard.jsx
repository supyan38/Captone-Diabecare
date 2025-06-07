import md5 from 'md5';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import stress from '../assets/stress-bro.png';
import eating from '../assets/eating-food.png';
import sleep from '../assets/insomnia-bro.png';
import jogging from '../assets/jogging-bro.png';
import medicine from '../assets/medicine-bro.png';
import education from '../assets/education-bro.png';
import { useNavigate, Link } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [user, setUser] = useState({
        name: '',
        age: '',
        email: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const [chartData, setChartData] = useState([]); 
    const [riskLevel, setRiskLevel] = useState('');

    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon`;

    const handleLogout = () => {
        navigate('/login');
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const fetchUserData = async () => {
        setUser({ name: '', age: '', email: '' });
    };

    const fetchChartData = async () => {
        setChartData([]); 
        setRiskLevel(''); 
    };

    useEffect(() => {
        fetchUserData();
        fetchChartData();
    }, []);

    return (
        <div className="bg-green-50 min-h-screen p-4 md:p-8">
            <header className="bg-[#dcf5b3] rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="Diabecare Logo" className="w-10 h-10" />
                        <h1 className="text-xl font-bold text-[#792d6d]">DIABECARE</h1>
                    </div>

                    <div className="md:hidden">
                        {isMenuOpen ? (
                            <X className="w-8 h-8 text-green-900" onClick={() => setIsMenuOpen(false)} />
                        ) : (
                            <Menu className="w-8 h-8 text-green-900" onClick={() => setIsMenuOpen(true)} />
                        )}
                    </div>

                    <nav className="hidden md:flex space-x-6 text-green-900 font-semibold items-center">
                        <Link to="/dashboard" className="font-bold">DASHBOARD</Link>
                        <Link to="/cek-gula-darah">CEK GULA DARAH</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-green-800 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl"
                        >
                            LOGOUT
                        </button>
                    </nav>
                </div>

                {isMenuOpen && (
                    <div className="mt-4 flex flex-col space-y-2 md:hidden text-green-900 font-semibold">
                        <Link to="/dashboard" className="font-bold" onClick={() => setIsMenuOpen(false)}>DASHBOARD</Link>
                        <Link to="/cek-gula-darah" onClick={() => setIsMenuOpen(false)}>CEK GULA DARAH</Link>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleLogout();
                            }}
                            className="bg-green-800 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl"
                        >
                            LOGOUT
                        </button>
                    </div>
                )}
            </header>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-[#dcf5b3] rounded-xl p-6 space-y-4 text-green-900 md:w-1/5">
                    <h2 className="font-bold text-lg mb-6">PROFIL</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={gravatarUrl}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-green-700 mb-4"
                        />
                        <div className="space-y-2 w-full">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleInputChange}
                                        placeholder="Nama"
                                        className="w-full px-3 py-1 rounded-xl border"
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        value={user.age}
                                        onChange={handleInputChange}
                                        placeholder="Usia"
                                        className="w-full px-3 py-1 rounded-xl border"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-green-900">NAMA</span>
                                        <span className="bg-white px-3 py-1 rounded-xl font-bold">{user.name || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-green-900">USIA</span>
                                        <span className="bg-white px-3 py-1 rounded-xl font-bold">{user.age || '-'}</span>
                                    </div>
                                </>
                            )}
                            <button
                                onClick={handleEditToggle}
                                className="w-full bg-green-800 text-white py-2 rounded-xl font-bold hover:bg-green-700 mt-4"
                            >
                                {isEditing ? 'SIMPAN' : 'EDIT'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#dcf5b3] rounded-xl p-6 text-green-900 md:w-4/5 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-4/5">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#792d6d" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/5 bg-white rounded-xl p-4 text-center shadow-md border border-green-300">
                        <p className="font-bold text-lg mb-2">RESIKO DIABETES</p>
                        <p className="text-green-800 font-bold text-2xl">{riskLevel || '-'}</p>
                        <p className="mt-2 text-sm text-gray-600">Berdasarkan grafik mingguan</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
                <img src={education} alt="Education" className="w-full max-w-2xl" />
            </div>

            <div className="bg-[#dcf5b3] rounded-xl p-6 grid gap-6 text-green-900 mb-10 mt-6">
                <div className="flex flex-col items-center md:flex-row gap-6">
                    <img src={jogging} alt="Exercise" className="mb-4 w-full max-w-xs" />
                    <div className="bg-green-300 rounded-xl p-4 w-full">
                        <p>
                            <strong>Aktivitas Fisik untuk Mencegah dan Mengelola Diabetes</strong>: Olahraga 
                            memiliki peran penting dalam meningkatkan sensitivitas insulin, membantu tubuh 
                            mengontrol kadar gula darah, dan mengurangi risiko komplikasi diabetes. Aktivitas 
                            fisik seperti jalan cepat, bersepeda, dan latihan kekuatan dapat membantu 
                            membakar glukosa dan meningkatkan metabolisme. Selain manfaat fisiologis, 
                            olahraga juga berkontribusi dalam manajemen stres dan kualitas tidur yang lebih 
                            baik, sehingga memberikan dampak positif secara menyeluruh pada kesehatan 
                            penderita diabetes.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6">
                    <img src={eating} alt="Food" className="mb-4 w-full max-w-xs" />
                    <div className="bg-green-300 rounded-xl p-4 w-full">
                        <p>
                            <strong>Pola Makan Sehat untuk Pengelolaan Diabetes</strong>: Asupan makanan 
                            memiliki pengaruh besar terhadap stabilitas kadar gula darah, dan pola makan yang 
                            seimbang dapat membantu mengelola risiko diabetes. Penderita diabetes dianjurkan 
                            untuk mengonsumsi makanan rendah indeks glikemik, kaya serat, dan tinggi protein 
                            untuk menjaga keseimbangan energi. Karbohidrat kompleks seperti gandum utuh, 
                            sayuran hijau, dan protein tanpa lemak sangat direkomendasikan, sementara 
                            konsumsi gula sederhana serta lemak trans harus dibatasi. Pola makan yang teratur 
                            dan terkontrol juga dapat membantu mencegah lonjakan gula darah yang berisiko 
                            bagi penderita diabetes.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6">
                    <img src={stress} alt="Food" className="mb-4 w-full max-w-xs" />
                    <div className="bg-green-300 rounded-xl p-4 w-full">
                        <p>
                            <strong>Manajemen Stres dan Risiko Diabetes</strong>: Stres yang berkelanjutan 
                            dapat meningkatkan kadar hormon seperti kortisol dan adrenalin, yang mengganggu 
                            keseimbangan gula darah dan meningkatkan risiko resistensi insulin. Oleh karena 
                            itu, strategi manajemen stres seperti meditasi, olahraga rutin, dan tidur yang 
                            cukup sangat penting untuk menjaga kesehatan metabolisme. Selain itu, aktivitas 
                            relaksasi seperti pernapasan dalam dan yoga dapat membantu menstabilkan kadar 
                            gula darah dan mengurangi beban mental yang sering dialami penderita diabetes.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6">
                    <img src={sleep} alt="Food" className="mb-4 w-full max-w-xs" />
                    <div className="bg-green-300 rounded-xl p-4 w-full">
                        <p>
                            <strong>Tidur yang Cukup untuk Mengendalikan Diabetes</strong>: Kualitas tidur 
                            yang buruk dapat menyebabkan gangguan metabolisme glukosa, meningkatkan hormon 
                            lapar, serta mengurangi sensitivitas insulin, sehingga berkontribusi pada 
                            peningkatan risiko diabetes tipe 2. Untuk meningkatkan kualitas tidur, penting 
                            untuk menjaga jadwal tidur yang teratur, menghindari paparan cahaya biru sebelum 
                            tidur, serta memastikan lingkungan tidur yang nyaman dengan suhu ruangan yang 
                            optimal dan minim gangguan eksternal.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6">
                    <img src={medicine} alt="Food" className="mb-4 w-full max-w-xs" />
                    <div className="bg-green-300 rounded-xl p-4 w-full">
                        <p>
                            <strong>Obat-Obatan untuk Pengelolaan Diabetes</strong>: Pengobatan diabetes 
                            bertujuan untuk menjaga kadar gula darah agar tetap stabil dan mencegah 
                            komplikasi jangka panjang. Berbagai jenis obat tersedia sesuai dengan kondisi 
                            dan kebutuhan pasien. Metformin adalah pilihan utama bagi banyak penderita 
                            diabetes tipe 2 karena meningkatkan sensitivitas insulin dan mengurangi produksi 
                            glukosa di hati. Sulfonilurea bekerja dengan merangsang pankreas untuk 
                            menghasilkan lebih banyak insulin, sedangkan inhibitor SGLT2 membantu 
                            mengeluarkan glukosa berlebih melalui urin. Untuk kasus diabetes tipe 1, serta 
                            beberapa kondisi diabetes tipe 2 yang lebih kompleks, terapi insulin diperlukan 
                            untuk menjaga keseimbangan kadar gula darah secara efektif.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="text-center text-green-900 py-4 bg-[#dcf5b3] rounded-xl">
                Copyright: Diabecare Team 2025
            </footer>
        </div>
    );
};

export default Dashboard;
