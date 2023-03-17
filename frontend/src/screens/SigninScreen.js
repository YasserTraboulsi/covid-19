import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: signin action
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);
    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src="./covide.gif" alt="covid-19" />
            </div>

            <div className='bg-teal-400 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto rounded-lg bg-teal-800 p-8 px-8' onSubmit={submitHandler}>
                    <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant='danger'>{error}</MessageBox>}
                    <div className='flex flex-col text-slate-300 py-2'>
                        <label>Email</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col text-slate-300 py-2'>
                        <label>Password</label>
                        <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between text-slate-300 py-2'>
                        {/* <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <p>Forgot Password</p> */}
                        Don't have an account? {' '}
                        <Link className='text-gray-100 hover:font-semibold' to={`/register`}>Create</Link>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGNIN</button>

                </form>
            </div>
        </div>
    )
}
