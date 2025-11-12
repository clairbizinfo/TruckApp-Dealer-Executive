import axiosInstance from '../../services/axiosInstance/axiosInstance';
import { JWTResponse } from '../../types/index';

export const registerMobile = async (mobileNo: string): Promise<{ id: string } | null> => {
    const resp = await axiosInstance.post('/register', null, { params: { mobileNo } });
    console.log('Register mobile response:', resp.data);
    return resp.data ?? null;
};


export const validateOtp = async (id: string, mobileNo: string, otp: string): Promise<JWTResponse> => {
    console.log('Validating OTP with id:', id, 'mobileNo:', mobileNo, 'otp:', otp);
    const resp = await axiosInstance.post('/validate', null, { params: { id, mobileNo, otp } });
    console.log(resp.data);
    return resp.data;
};
