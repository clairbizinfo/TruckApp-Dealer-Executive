export type RootStackParamList = {
    Login: undefined;
    Otp: { id: string; mobileNo: string } | undefined;
    Details: { mobileNo: string } | undefined;

    Main: undefined;
    Profile: undefined;
    Home: undefined;

    Dashboard: undefined;          // tab route
    DashboardScreen: undefined;    // internal route

    Enquiry: undefined;            // tab route
    EnquiryScreen: undefined;      // internal route

    AddTruck: undefined;
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