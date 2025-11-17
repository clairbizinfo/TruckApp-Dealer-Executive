import axiosInstance from "../axiosInstance/axiosInstance";

export const getProfileDetails = async () => {
    try {
        const response = await axiosInstance.get("/executive/profile");
        return response.data;
    } catch (error) {
        console.log("Error fetching profile details:", error);
        throw error;
    }
}

export const updateProfileDetails = async (profileData: any) => {
    try {
        const response = await axiosInstance.put("/executive/profile", profileData);
        return response;
    }
    catch (error) {
        console.log("Error updating profile details:", error);
        throw error;
    }
}
