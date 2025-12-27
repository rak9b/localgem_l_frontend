export type UserRole = 'GUEST' | 'TOURIST' | 'GUIDE' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    bio?: string;
    location?: string;
    languages?: string[];
    joinedDate: string;
    isPro?: boolean;
}

export interface Tour {
    id: string;
    title: string;
    description: string;
    itinerary: string;
    city: string;
    country: string;
    category: string;
    images: string[];
    price: number;
    duration: string;
    meetingPoint: string;
    maxGroupSize: number;
    guideId: string;
    guideName: string;
    guideAvatar?: string;
    rating: number;
    reviewCount: number;
    languages: string[];
    coordinates?: { x: number; y: number };
    reviews?: Review[];
    guide?: User;
}

export interface Booking {
    id: string;
    tourId: string;
    tourTitle: string;
    tourImage: string;
    touristId: string;
    touristName: string;
    date: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    totalPrice: number;
    guests: number;
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    category: string;
    readTime: string;
}

export interface Story {
    id: string;
    guideId: string;
    guideName: string;
    guideAvatar: string;
    image: string;
    caption: string;
    location: string;
    timestamp: string;
    viewed?: boolean;
}

export interface PassportStamp {
    id: string;
    city: string;
    country: string;
    date: string;
    tourTitle: string;
    color: string;
    rotation: number;
}

export interface Offer {
    id: string;
    code: string;
    title: string;
    description: string;
    discountAmount: number;
    discountType: 'PERCENTAGE' | 'FIXED';
    expiryDate: string;
    minSpend?: number;
    image: string;
    color: string;
}
