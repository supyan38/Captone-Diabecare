import { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Illustration7 from '../assets/medicine-cuate.png';

const CekGulaDarah = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        bmi: '',
        age: '',
        glucose_level: '',
        family_history: '',
        smoker: '',
        physical_activity: '',
        gender: '', 
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error('Gagal prediksi:', error);
        }
    };

    return (
        <div className="bg-green-50 min-h-screen p-4 md:p-8">
            <header className="bg-[#dcf5b3] rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="Diabecare Logo" className="w-10 h-10" />
                        <h1 className="text-xl font-bold text-[#792d6d]">DIABECARE</h1>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-6 text-green-900 font-semibold">
                        <Link to="/dashboard">DASHBOARD</Link>
                        <Link to="/cek-gula-darah" className="font-bold">CEK GULA DARAH</Link>
                    </nav>
                </div>

                {menuOpen && (
                    <nav className="flex flex-col mt-4 space-y-2 md:hidden text-green-900 font-semibold">
                        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>DASHBOARD</Link>
                        <Link to="/cek-gula-darah" onClick={() => setMenuOpen(false)} className="font-bold">CEK GULA DARAH</Link>
                    </nav>
                )}
            </header>

            <div className="bg-[#dcf5b3] rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-10">
                <img
                    src={Illustration7}
                    alt="Dokter"
                    className="w-full max-w-xs md:max-w-sm"
                />

                <form
                    onSubmit={handleSubmit}
                    className="w-full lg:w-2/3 grid grid-cols-1 gap-4 text-green-900 font-bold"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="mb-1">BMI</span>
                            <input type="number" name='bmi' value={formData.bmi} className="rounded-xl px-4 py-2 bg-white focus:outline-none" placeholder="Contoh: 23.5" onChange={handleChange} />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1">USIA</span>
                            <input type="number" name='age' value={formData.age} className="rounded-xl px-4 py-2 bg-white focus:outline-none" placeholder="Contoh: 22" onChange={handleChange} />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1">TINGKAT GLUKOSA</span>
                            <input type="number" name='glucose_level' value={formData.glucose_level} className="rounded-xl px-4 py-2 bg-white focus:outline-none" placeholder="Contoh: 110" onChange={handleChange} />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1">RIWAYAT KELUARGA</span>
                            <select className="rounded-xl px-4 py-2 bg-white" name="family_history" value={formData.family_history} onChange={handleChange}>
                                <option value="">Pilih</option>
                                <option value="ya">Ya</option>
                                <option value="tidak">Tidak</option>
                            </select>
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1">PEROKOK</span>
                            <select className="rounded-xl px-4 py-2 bg-white" name='smoker' value={formData.smoker} onChange={handleChange}>
                                <option value="">Pilih</option>
                                <option value="ya">Ya</option>
                                <option value="tidak">Tidak</option>
                            </select>
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1">TINGKAT AKTIVITAS FISIK</span>
                            <select className="rounded-xl px-4 py-2 bg-white" name='physical_activity' value={formData.physical_activity} onChange={handleChange}>
                                <option value="">Pilih</option>
                                <option value="rendah">Rendah</option>
                                <option value="sedang">Sedang</option>
                                <option value="tinggi">Tinggi</option>
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span className="mb-1">Jenis Kelamin</span>
                            <select className="rounded-xl px-4 py-2 bg-white" name='gender' value={formData.gender} onChange={handleChange}>
                                <option value="">Pilih</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-800 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition mt-6"
                        >
                            SUBMIT
                        </button>
                    </div>

                    {result && (
                        <div className="mt-4 p-4 bg-white rounded-xl text-green-900">
                            <p><strong>Hasil:</strong> {result.risk_level}</p>
                            <p><strong>Probabilitas:</strong> {result.probability}</p>
                        </div>
                    )}
                    
                </form>
            </div>
        </div>
    );
};

export default CekGulaDarah;
