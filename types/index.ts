export type RootStackParamList = {
    Login: undefined;
    Otp: { id: string; mobileNo: string } | undefined;
    Details: { mobileNo: string } | undefined;
    Main: undefined;
    Profile: undefined;
    Home: undefined;
    Enquiry: undefined;
    AddTruck: undefined;
    Dashboard: undefined;
    AddTruckForm: undefined;
    AddEnquiry: undefined;
    EnquiryDetails: undefined;
};

export type BottomTabParamList = {
    Home: undefined;
    Dashboard: undefined;
    Enquiry: undefined;
    AddTruck: undefined;
};

export interface JWTResponse {
    jwtToken: string;
    username: string;
}