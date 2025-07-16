import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAppStore from '../store/useAppStore';

const loginSchema = z.object({
    countryCode: z.string().min(1, "Country code is required"),
    email: z.string().email("Invalid email address"),
});

const Login = () => {
    const navigate = useNavigate();
    const login = useAppStore((state) => state.login);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,idd');
                const countryData = response.data.map(country => ({
                    name: country.name.common,
                    dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
                })).sort((a, b) => a.name.localeCompare(b.name));
                setCountries(countryData);
            } catch (err) {
                setError("Failed to fetch country data.");
                toast.error("Failed to fetch country data.");
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const onSubmit = (data) => {
        console.log("Login data:", data);
        // Simulate OTP send
        toast.promise(
            new Promise(resolve => setTimeout(() => {
                resolve();
            }, 1000)),
            {
                loading: 'Sending OTP...',
                success: <b>OTP sent to {data.email}!</b>,
                error: <b>Could not send OTP.</b>,
            }
        ).then(() => {
            login({ email: data.email }); // Store user data in Zustand
            navigate('/verify');
        });
    };

    if (loading) return <div className="login-container"><div className="login-box">Loading countries...</div></div>;
    if (error) return <div className="login-container"><div className="login-box">Error: {error}</div></div>;

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="google-logo" />
                <h1>Sign in</h1>
                <p>Use your Google Account</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("countryCode")}>
                        {countries.map((country, index) => (
                            <option key={index} value={country.dialCode}>
                                {country.name} ({country.dialCode})
                            </option>
                        ))}
                    </select>
                    {errors.countryCode && <p className="error-message">{errors.countryCode.message}</p>}
                    <input type="email" placeholder="Email or phone" {...register("email")} />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                    <div className="links">
                        <Link to="/">Forgot email?</Link>
                    </div>
                    <button type="submit">Next</button>
                </form>
                <div className="links">
                    <Link to="/">Create account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;