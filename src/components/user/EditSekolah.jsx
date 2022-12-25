import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const FormEditSekolah = () => {
    const [nameScholl,  setNameScholl] = useState("");
    const [Npsn, setNpsn] = useState("");
    const [pengelola, setpengelolaan] = useState("");
    const [tingkatan, setTingkatan] = useState("");
    const [alamat, setAlamat] = useState("");
    const [nohp,  setNohp] = useState("");
    const [kepsek,  setKepsek] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    
    useEffect(()=>{
        const getUserById = async () =>{
            try {
                const response = await axios.get(`http://server.silah.website:5000/datasekolah/${id}`);
                setNameScholl(response.data.nameScholl);
                setNpsn(response.data.npsn);
                setpengelolaan(response.data.pengelolaan);
                setTingkatan(response.data.tingkatan);
                setAlamat(response.data.alamat);
                setNohp(response.data.noHp);
                setKepsek(response.data.nameKs);

 
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    }, [id]);

    const UpdateValidasi = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("namescholl", nameScholl);
        formData.append("Npsn", Npsn);
        formData.append("pengelola", pengelola);
        formData.append("tingkatan", tingkatan);
        formData.append("alamat", alamat);
        formData.append("nohp", nohp);
        formData.append("kepsek", kepsek);
        try {
            await axios.patch(`http://server.silah.website:5000/datasekolah/${id}`,formData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/datasekolah");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };

  return (
    <div>
       <h1 className="title mt-5">Edit Data Sekolah</h1>

        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={UpdateValidasi}>
                <p className="has-text-center">{msg}</p>
                    <div className="field">
                        <label className="label">Nama Sekolah</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={nameScholl} 
                            onChange={(e)=> setNameScholl(e.target.value)}
                            placeholder='Name' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">NPSN</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={Npsn} 
                            onChange={(e)=> setNpsn(e.target.value)}
                            placeholder='Name' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nama Sekolah</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={nameScholl} 
                            onChange={(e)=> setNameScholl(e.target.value)}
                            placeholder='Name' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Pengelola Sekolah</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={pengelola} onChange={(e)=> setpengelolaan(e.target.value)}>
                                <option></option>
                                <option value="Swasta">Swasta</option>
                                <option value="negeri">Negeri</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tingkatan Sekolah</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={tingkatan} onChange={(e)=> setTingkatan
                                    (e.target.value)}>
                                <option></option>
                                <option value="TK">TK</option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Alamat</label>
                        <div className="control">
                            <input 
                            type="text" 
                            
                            className="input"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)} 
                            placeholder='Alamat Sekolah' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nomor Handphone</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={nohp}
                            onChange={(e) => setNohp(e.target.value)}
                            placeholder='Nomor Sekolah' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kepala Sekolah</label>
                        <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={kepsek}
                            onChange={(e) => setKepsek(e.target.value)}
                            placeholder='Nama Kepala Sekolah ' />
                            
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success mt-3">
                                Update Data Sekolah
                            </button>    
                        </div>
                    </div>
                </form> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditSekolah;
