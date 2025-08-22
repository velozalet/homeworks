export type MileageRange = { label:string; min:number; max?:number };

export const mileageRanges: MileageRange[] = [
    { label: "10k - 25k", min: 10000, max: 25000 },
    { label: "25k - 40k", min: 25000, max: 40000 },
    { label: "40k - 60k", min: 40000, max: 60000 },
    { label: "60k - 85k", min: 60000, max: 85000 },
    { label: "86k & over", min: 86000 }, //no max
];
