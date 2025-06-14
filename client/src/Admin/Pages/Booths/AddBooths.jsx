import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const AddBooths = () => {
    const [boothName, setboothName] = useState("")
    const [floorId, setfloorId] = useState("")
    const [floors, setfloors] = useState([])
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const responsee = await axios.get('http://localhost:5000/api/addbooth/');
                setfloors(responsee.data.floor);

            } catch (error) {
                console.error('Failed to fetch floors:', error);
            }
        };

        fetchFloors();
    }, []);


    const HandleBoothSubmit = async (e) => {
        e.preventDefault();
        const BoothData = {
            boothName: boothName,
            floorId: floorId
        }

        try {
            const FetchBooth = await axios.post("http://localhost:5000/api/addbooth", BoothData)
            if (FetchBooth.status == 201) {
                setError("")
                setSuccess(FetchBooth.data.success)

            } else {
                alert('Failed to Add Booth.');
            }

        } catch (error) {
            setError(error.response.data.error)
        }
    }

    // for container
    const gradientStyleforcontainer = {
        background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
    };
    // for content in container
    const gradientStyleforcontent = {
        background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
    }

    const gradientStyleforbutton = {
        background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
    };

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className='app-container' style={gradientStyleforcontainer}>
                <div className='app-content' style={{ height: '100vh' }}>
                    <div class="content-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Add Booths</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can add booths.</h5>
                                        </div>
                                        <div className='card-body'>
                                            <div>
                                                <div className='example-content'>
                                                    {
                                                        Success ? (
                                                            <div class="alert alert-success" role="alert">
                                                                {Success}
                                                            </div>
                                                        ) : ""
                                                    }

                                                    {
                                                        Error ? (
                                                            <div class="alert alert-danger" role="alert">
                                                                {Error}
                                                            </div>
                                                        ) : ""
                                                    }

                                                    <form className='row g-3' onSubmit={HandleBoothSubmit}>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Booth Number</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setboothName(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Floor</label>
                                                            <select
                                                                className="form-control"
                                                                value={floorId}
                                                                onChange={(e) => { setfloorId(e.target.value); alert(e.target.value) }}

                                                            >
                                                                <option value="">Select Floor</option>
                                                                {floors.map((floor) => (
                                                                    <option key={floor._id} value={floor._id}>
                                                                        {floor.floorname}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="col-12">
                                                            <button type="submit" className="btn text-white" style={gradientStyleforbutton}>Add Booth</button>
                                                        </div>




                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default AddBooths