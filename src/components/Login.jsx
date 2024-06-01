import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;
    if (username === 'admin' && password === 'password123') {
      setIsAuthenticated(true);
      navigate('/');
      alert('Logged in Successfull')
    } else {
      setError('username', { type: 'manual', message: 'Invalid username or password' });
      setError('password', { type: 'manual', message: 'Invalid username or password' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 dark:bg-gray-800 text-black dark:text-white">
      <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-sm shadow-black dark:shadow-white w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errors.username && <div className="text-red-500 mb-4">{errors.username.message}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-900 dark:text-gray-300">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
            
            <p className='text-gray-700'>Username: admin</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-900 dark:text-gray-300">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
            
            <p className='text-gray-700'>Password: password123</p>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
