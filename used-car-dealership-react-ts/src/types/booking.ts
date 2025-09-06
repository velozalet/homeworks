export interface Booking {
    createdAt: string | null;  //store as ISO string
    contactByEmail: boolean; 
    contactByPhone: boolean;
    email: string;
    name: string;
    phone: string;
    message: string;
    id: string;
    make: string;
    model: string;
    mileage: number;
    year: number;
    vin: string; 
    price: number;  
    status: string;
}