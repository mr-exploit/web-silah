import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewLaporan = () => {
  const [review, setReview] = useState([]);

  useEffect(()=>{
    getReview();
  },[]);

  const { user } = useSelector((state) => state.auth);

  const getReview = async() =>{
    const response = await axios.get("http://server.silah.website:5000/perbaikan");
    setReview(response.data);
}

  return (
    <div>
      <h1 className="title">Review Laporan Fasilitas</h1>
        <h2 className="subtitle">List of laporan...</h2>
        {user && user.role === "user" && (
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    {/* <th>Tanggal</th> */}
                    <th>Topik Fasilitas</th>
                    <th>Deskripsi Fasilitas</th>
                    <th>Created By</th>
                    <th>Status Validasi</th>
                    <th>Keterangan Validasi</th>
                    <th>Action</th>
                </tr>
          </thead>
            <tbody>
              {review.map((Perbaikan, index) =>(
                <tr key={Perbaikan.uuid}>
                    <td>{index + 1}</td>
                    <td><b>{Perbaikan.judulper}</b></td>
                    <td>{Perbaikan.descper}</td>
                    <td>{Perbaikan.user.name}</td>
                    <td>{Perbaikan.validasiper}</td>
                    <td>{Perbaikan.keteranganper}</td>
                    <td>
                    {user && Perbaikan.validasiper === "ditolak" &&
                    <Link to={`/laporan/fasilitas/edit/${Perbaikan.uuid}`} className="button is-small is-info mr-3">Edit Kerusakan</Link>
                    }
                    
                      <Link to={`/laporan/fasilitas/reviewlaporan/details/${Perbaikan.uuid}`} className="button is-small has-background-success is-info ">Details Validasi</Link>
                    </td>
                </tr>
              ))}
            </tbody>
        </table> 
        )}


        {user && user.role === "admin" &&(
          <table className='table is-striped is-fullwidth'>
          <thead>
              <tr>
                  <th>No</th>
                  {/* <th>Tanggal</th> */}
                  <th>Topik Fasilitas</th>
                  <th>Deskripsi Fasilitas</th>
                  <th>Created By</th>
                  <th>Status Validasi</th>
                  <th>Keterangan Validasi</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {review.map((Perbaikan, index) =>(
              <tr key={Perbaikan.uuid}>
                <td>{index + 1}</td>
                <td><b>{Perbaikan.judulper}</b></td>
                <td>{Perbaikan.descper}</td>
                <td>{Perbaikan.user.name}</td>
                <td>{Perbaikan.validasiper}</td>
                <td>{Perbaikan.keteranganper}</td>
                <td>
                    <Link to={`/laporan/fasilitas/reviewlaporan/details/${Perbaikan.uuid}`} className="button is-small is-info mr-3">Details Validasi</Link>
       
                </td> 
              </tr>
            ))}
          </tbody>
      </table>
        )}
    </div>
  )
}

export default ReviewLaporan;