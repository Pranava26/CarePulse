import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/users/check');
            set({authUser: res.data});
        } catch (error) {
            console.log('Error in checkAuth', error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async(userData) => {
        try {
            const res = await axiosInstance.post('/users', userData);
            set({authUser: res.data.user});
        } catch (error) {
            console.log('Error in Signup', error);
        }
    }
}))