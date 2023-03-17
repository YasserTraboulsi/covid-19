import React from 'react'
import { useDispatch } from 'react-redux';
import { signout } from '../actions/userActions';

const Button = (props) => {
  const dispatch = useDispatch();
  const submitHandler = () => {
    dispatch(signout())
  }
  return (
    <button className='bg-teal-800 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-teal-400 rounded-full
    duration-500' onClick={submitHandler}>
      {props.children}
    </button>
  )
}

export default Button