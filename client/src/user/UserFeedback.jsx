import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function UserFeedback() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));
console.log(auth);



const submitfeedback = () => {
    let params = {
        title: title,
        description: description,
        user_id: auth._id,
        email: auth.email
    };

    fetch('http://localhost:5000/Admin/addfeedback', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then((res) => res.json())
        .then((result) => {
            if (result.message) {
                toast.success('Feedback submitted successfully!');
            } else {
                toast.error('Failed to submit feedback.');
            }
        })
        .catch((error) => {
            toast.error('An error occurred. Please try again.');
        });
};

    return (
        <>
        <ToastContainer />
        <div className="container-fluid pt-4 px-4" >
            <div className="col-sm-12 col-xl-12">
                <div className=" h-100 p-4 mb-3" style={{backgroundColor:"#fff2d74d", borderRadius:"50px 10px"}}>
                    <h2 className="mb-5" style={{marginLeft:"300px"}}>Add Feedback</h2>
                    <div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Subject</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name='title'
                                        className="form-control"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        name='description'
                                        className="form-control"
                                        rows="4"
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <button type="button" onClick={submitfeedback} className="btn btn-success w-100">Submit</button>
                            </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default UserFeedback;