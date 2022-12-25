import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const FormSekolah = () => {
    const [list_sekolah, setDatasekolah] = useState([]);

  useEffect(()=>{
    getDataSekolah();
  },[]);

  const { user } = useSelector((state) => state.auth);

  const getDataSekolah = async () =>{
      const response = await axios.get('http://server.silah.website:5000/datasekolah');
      setDatasekolah(response.data);
  };

  const deleteUser = async (id) =>{ //userId
      await axios.delete(`http://server.silah.website:5000/datasekolah/${id}`);//{userId}
      getDataSekolah();
  };

  return (
    <div>
        {/* User */}
        {user && user.role === "user" && (
        <div >
            <h1 className="title">Data Sekolah</h1>
            <h2 className="subtitle">List of sekolah...</h2>
            <h2 className="subtitle has-text-danger">Data Sekolah Cukup 1 Kali saja di Tambahkan</h2>

            <Link to="/datasekolah/add" className="button is-primary mb-2">
                Add New
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Sekolah</th>
                        <th>NPSN</th>
                        <th>Penanggung Jawab</th>
                        <th>pengelola</th>
                        <th>tingkatan</th>
                        <th>Alamat</th>
                        <th>Nomor Hp</th>
                        <th>Kepala Sekolah</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list_sekolah.map((DataSekolah, index) => (
                    <tr key={DataSekolah.uuid}>
                        <td>{index+1}</td>
                        <td>{DataSekolah.nameScholl}</td>
                        <td>{DataSekolah.npsn}</td>
                        <td>{DataSekolah.user.name}</td>
                        <td>{DataSekolah.pengelolaan}</td>
                        <td>{DataSekolah.tingkatan}</td>
                        <td>{DataSekolah.alamat}</td>
                        <td>{DataSekolah.noHp}</td>
                        <td>{DataSekolah.nameKs}</td>
                        <td>
                        <Link to={`/datasekolah/edit/${DataSekolah.uuid}`} className="button is-small is-info mr-3">Edit</Link>
                        <button onClick={()=> deleteUser(DataSekolah.uuid) } className="button is-small is-danger">Delete</button>
                        </td>   
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
            
        )}

        {/* Admin */}
        {user && user.role === "admin" && (
        <div className="mt-3">
            <h1 className="title">Data Sekolah</h1>
            <h2 className="subtitle">List of sekolah...</h2>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Sekolah</th>
                        <th>NPSN</th>
                        <th>Penanggung Jawab</th>
                        <th>pengelola</th>
                        <th>tingkatan</th>
                        <th>Alamat</th>
                        <th>Nomor Hp</th>
                        <th>Kepala Sekolah</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list_sekolah.map((DataSekolah, index) => (
                    <tr key={DataSekolah.uuid}>
                        <td>{index+1}</td>
                        <td>{DataSekolah.nameScholl}</td>
                        <td>{DataSekolah.npsn}</td>
                        <td>{DataSekolah.user.name}</td>
                        <td>{DataSekolah.pengelolaan}</td>
                        <td>{DataSekolah.tingkatan}</td>
                        <td>{DataSekolah.alamat}</td>
                        <td>{DataSekolah.noHp}</td>
                        <td>{DataSekolah.nameKs}</td>
                        <td>
                        {/* <Link to={`/datasekolah/edit/${DataSekolah.uuid}`} className="button is-small is-info mr-3">Edit</Link> */}
                        <button onClick={()=> deleteUser(DataSekolah.uuid) } className="button is-small is-danger">Delete</button>
                        </td>   
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
    </div>
  )
}

export default FormSekolah;