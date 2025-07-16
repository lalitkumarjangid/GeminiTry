import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import useAppStore from '../store/useAppStore';

const otpSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

const Verify = () => {
    const navigate = useNavigate();
    const login = useAppStore((state) => state.login);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(otpSchema),
    });

    const onSubmit = (data) => {
        console.log("OTP data:", data);
        // Simulate OTP verification
        toast.promise(
            new Promise(resolve => setTimeout(() => {
                resolve();
            }, 1000)),
            {
                loading: 'Verifying OTP...',
                success: <b>OTP verified!</b>,
                error: <b>Invalid OTP.</b>,
            }
        ).then(() => {
            login({ /* user data if available after verification */ }); // Mark as authenticated
            navigate('/app');
        });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="google-logo" />
                <h1>Enter the code</h1>
                <p>We've sent a verification code to your email address.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Enter code" {...register("otp")} />
                    {errors.otp && <p className="error-message">{errors.otp.message}</p>}
                    <button type="submit">Verify</button>
                </form>
            </div>
        </div>
    );
};

export default Verify;