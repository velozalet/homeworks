export interface Car {
    id: string;
    make: 'GMC'|'Chevrolet'|'Buick'|string;
    model: string;
    year: number;
    bodyStyle: 'Hatch'|'SUV'|'Sedan'|string;
    color: string;
    mileage: number;
    transmission: 'Auto'|'Manual'|string;
    fuelType: 'Gas'|'Diesel'|string;
    price: number; 
    images: string[]; //array of image URLs for multiple images 
    vin: string;
    carfaxClear: boolean;
    noAccident: boolean;
    oneOwner: boolean;
    description:string;
    options: string[]; //array of items Car Options
    safety: string[]; //array of items Car Safety 
}