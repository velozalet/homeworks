export interface Contact {
    createdAt: string | null;  //store as ISO string
    id: string;
    email: string;
    name: string;
    phone: string;
    message: string;
    status: string;
}