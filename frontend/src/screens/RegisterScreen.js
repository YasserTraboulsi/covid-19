import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';




export default function RegisterScreen(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: signin action
        if (password !== confirmpassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
        if (error) {
            console.log(error)
        }
    }, [navigate, userInfo, error]);
    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>

            <div className='bg-teal-400  flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto rounded-lg bg-teal-800 p-8 px-8' onSubmit={submitHandler}>
                    <h2 className='text-4xl text-white font-bold text-center'>Create Account</h2>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant='danger'>{error}</MessageBox>}
                    <div className='flex flex-col text-slate-300 py-2'>
                        <label>Name</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"
                            required
                            onChange={(e) => setName(e.target.value)} />
                    </div>
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
                    <div className='flex flex-col text-slate-300 py-2'>
                        <label>Password</label>
                        <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between text-slate-300 py-2'>
                        Already have an account? {' '}
                        <Link className='text-gray-100 hover:font-semibold' to={`/signin`}>Sign-In</Link>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>

                </form>
            </div>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src="./graph.gif" alt="" />
            </div>
        </div>
    )
}
