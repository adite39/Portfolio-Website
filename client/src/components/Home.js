import React, { useState, useEffect } from 'react';

const Home = () => {
    const [userName, setUserName] = useState('');
    const [show,setShow] = useState(false);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);

    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{userName}</h1>
                    <h2> {show ? 'Happy to see you back!' : 'We are the MERN Developer'}</h2>
                </div>
            </div>
        </>
    )
}
export default Home;