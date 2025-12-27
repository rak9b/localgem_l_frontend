import { Tour, User, BlogPost, Story, PassportStamp, Offer } from '@/types';

export const CATEGORIES = [
    "All",
    "Food & Drink",
    "History & Culture",
    "Art & Museums",
    "Nature & Outdoors",
    "Nightlife",
    "Photography",
    "Shopping"
];

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'Elena Rossi',
        email: 'elena@guide.com',
        role: 'GUIDE',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Born and raised in Rome. I love showing people the secret corners of the Eternal City that tourists usually miss.',
        location: 'Rome, Italy',
        languages: ['English', 'Italian', 'Spanish'],
        joinedDate: 'Jan 2023',
        isPro: true
    },
    {
        id: 'u2',
        name: 'Kenji Tanaka',
        email: 'kenji@guide.com',
        role: 'GUIDE',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Street food enthusiast and history buff. Let’s explore Tokyo’s culinary scene together!',
        location: 'Tokyo, Japan',
        languages: ['English', 'Japanese'],
        joinedDate: 'Mar 2023'
    },
    {
        id: 'u3',
        name: 'Sarah Jenkins',
        email: 'sarah@tourist.com',
        role: 'TOURIST',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Avid traveler looking for authentic experiences.',
        location: 'New York, USA',
        joinedDate: 'Jun 2023'
    },
    {
        id: 'u4',
        name: 'Admin User',
        email: 'admin@localgems.com',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Platform Administrator',
        location: 'HQ',
        joinedDate: 'Jan 2023'
    }
];

export const MOCK_TOURS: Tour[] = [
    {
        id: '1',
        title: 'Hidden Jazz Bars of Rome',
        description: 'Experience the vibrant nightlife of Rome like a local. We will visit 3 speakeasy bars hidden in the narrow streets of Trastevere.',
        itinerary: 'Meet at Piazza Trilussa -> First Bar (Aperitivo) -> Second Bar (Live Jazz) -> Third Bar (Late night cocktails)',
        city: 'Rome',
        country: 'Italy',
        category: 'Nightlife',
        images: ['https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        price: 45,
        duration: '3 hours',
        meetingPoint: 'Piazza Trilussa, Fountain steps',
        maxGroupSize: 6,
        guideId: 'u1',
        guideName: 'Elena Rossi',
        guideAvatar: MOCK_USERS[0].avatar,
        rating: 4.9,
        reviewCount: 124,
        languages: ['English', 'Italian'],
        coordinates: { x: 53, y: 38 }
    },
    {
        id: '2',
        title: 'Tokyo Street Food Safari',
        description: 'Taste your way through Shinjuku’s best yakitori alleys and hidden ramen shops. Come hungry!',
        itinerary: 'Shinjuku Station -> Omoide Yokocho -> Golden Gai -> Kabukicho',
        city: 'Tokyo',
        country: 'Japan',
        category: 'Food & Drink',
        images: ['https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        price: 60,
        duration: '4 hours',
        meetingPoint: 'Shinjuku Station East Exit',
        maxGroupSize: 8,
        guideId: 'u2',
        guideName: 'Kenji Tanaka',
        guideAvatar: MOCK_USERS[1].avatar,
        rating: 5.0,
        reviewCount: 89,
        languages: ['English', 'Japanese'],
        coordinates: { x: 86, y: 39 }
    },
    {
        id: '3',
        title: 'Ancient Rome Photography Walk',
        description: 'Capture the Colosseum and Forum Romanum during the golden hour. I will help you find the best angles and settings.',
        itinerary: 'Colosseum -> Roman Forum -> Capitoline Hill',
        city: 'Rome',
        country: 'Italy',
        category: 'Photography',
        images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        price: 55,
        duration: '2.5 hours',
        meetingPoint: 'Colosseum Metro Station',
        maxGroupSize: 4,
        guideId: 'u1',
        guideName: 'Elena Rossi',
        guideAvatar: MOCK_USERS[0].avatar,
        rating: 4.8,
        reviewCount: 45,
        languages: ['English', 'Italian', 'Spanish'],
        coordinates: { x: 53.5, y: 38.5 }
    },
    {
        id: '4',
        title: 'Kyoto Zen Garden Meditation',
        description: 'Find your inner peace in the secret temples of Kyoto. Includes a private meditation session with a monk.',
        itinerary: 'Ryoan-ji -> Private Temple -> Tea Ceremony',
        city: 'Kyoto',
        country: 'Japan',
        category: 'History & Culture',
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        price: 80,
        duration: '4 hours',
        meetingPoint: 'Ryoan-ji Entrance',
        maxGroupSize: 5,
        guideId: 'u2',
        guideName: 'Kenji Tanaka',
        guideAvatar: MOCK_USERS[1].avatar,
        rating: 4.9,
        reviewCount: 210,
        languages: ['English', 'Japanese'],
        coordinates: { x: 85, y: 40 }
    },
    {
        id: '5',
        title: 'New York Rooftop Bars',
        description: 'See the skyline from the best angles. We visit 3 exclusive rooftops in Manhattan with skip-the-line access.',
        itinerary: 'Midtown -> Chelsea -> Meatpacking District',
        city: 'New York',
        country: 'USA',
        category: 'Nightlife',
        images: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        price: 95,
        duration: '4 hours',
        meetingPoint: 'Times Square',
        maxGroupSize: 10,
        guideId: 'u3',
        guideName: 'Sarah Jenkins',
        guideAvatar: MOCK_USERS[2].avatar,
        rating: 4.7,
        reviewCount: 56,
        languages: ['English'],
        coordinates: { x: 28, y: 36 }
    },
    {
        id: '6',
        title: 'Parisian Pastry Workshop',
        description: 'Learn to make croissants and macarons with a local chef in a charming Montmartre kitchen.',
        itinerary: 'Market Shopping -> Baking Class -> Tasting',
        city: 'Paris',
        country: 'France',
        category: 'Food & Drink',
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        price: 110,
        duration: '3.5 hours',
        meetingPoint: 'Sacre Coeur Steps',
        maxGroupSize: 6,
        guideId: 'u1',
        guideName: 'Elena Rossi',
        guideAvatar: MOCK_USERS[0].avatar,
        rating: 5.0,
        reviewCount: 320,
        languages: ['English', 'French'],
        coordinates: { x: 50, y: 34 }
    }
];

export const MOCK_POSTS: BlogPost[] = [
    {
        id: '1',
        title: '10 Hidden Gems in Kyoto You Won’t Find in Guidebooks',
        excerpt: 'Discover secret temples, quiet tea houses, and bamboo groves away from the crowds.',
        content: '...',
        author: 'Kenji Tanaka',
        date: 'Oct 15, 2023',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'Travel Tips',
        readTime: '5 min read'
    },
    {
        id: '2',
        title: 'How to Eat Like a Local in Rome',
        excerpt: 'Skip the tourist traps near the Colosseum. Here is where real Romans eat cacio e pepe.',
        content: '...',
        author: 'Elena Rossi',
        date: 'Sep 28, 2023',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'Food & Drink',
        readTime: '4 min read'
    },
    {
        id: '3',
        title: 'The Solo Traveler’s Guide to Safety',
        excerpt: 'Essential tips for staying safe and making friends while exploring the world alone.',
        content: '...',
        author: 'Sarah Jenkins',
        date: 'Aug 10, 2023',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'Guides',
        readTime: '7 min read'
    }
];

export const MOCK_STORIES: Story[] = [
    {
        id: 's1',
        guideId: 'u1',
        guideName: 'Elena',
        guideAvatar: MOCK_USERS[0].avatar!,
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        caption: 'Sunset at the Colosseum is magical today! 🌅',
        location: 'Rome, Italy',
        timestamp: '2h ago'
    },
    {
        id: 's2',
        guideId: 'u2',
        guideName: 'Kenji',
        guideAvatar: MOCK_USERS[1].avatar!,
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        caption: 'Fresh sushi just arrived at Tsukiji Market! 🍣',
        location: 'Tokyo, Japan',
        timestamp: '4h ago'
    },
    {
        id: 's3',
        guideId: 'u3',
        guideName: 'Marco',
        guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        image: 'https://images.unsplash.com/photo-1518391846015-55a33bbb70ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        caption: 'Hiking the Dolomites. Look at this view! 🏔️',
        location: 'Bolzano, Italy',
        timestamp: '5h ago'
    },
    {
        id: 's4',
        guideId: 'u4',
        guideName: 'Sophie',
        guideAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        caption: 'Paris in the rain has a special charm ☔',
        location: 'Paris, France',
        timestamp: '6h ago'
    }
];

export const MOCK_PASSPORT_STAMPS: PassportStamp[] = [
    {
        id: 'ps1',
        city: 'ROME',
        country: 'ITA',
        date: '12 OCT 2023',
        tourTitle: 'Hidden Jazz Bars',
        color: '#e11d48',
        rotation: -5
    },
    {
        id: 'ps2',
        city: 'TOKYO',
        country: 'JPN',
        date: '05 NOV 2023',
        tourTitle: 'Street Food Safari',
        color: '#0d9488',
        rotation: 8
    },
    {
        id: 'ps3',
        city: 'PARIS',
        country: 'FRA',
        date: '20 DEC 2023',
        tourTitle: 'Louvre at Night',
        color: '#4f46e5',
        rotation: -2
    }
];

export const MOCK_OFFERS: Offer[] = [
    {
        id: 'o1',
        code: 'SUMMER25',
        title: 'Summer Vibes Sale',
        description: 'Get 25% off all beach and outdoor tours this summer.',
        discountAmount: 25,
        discountType: 'PERCENTAGE',
        expiryDate: 'Aug 31, 2025',
        minSpend: 50,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        color: 'orange'
    },
    {
        id: 'o2',
        code: 'WELCOME10',
        title: 'New Explorer Discount',
        description: 'First time here? Enjoy $10 off your first booking.',
        discountAmount: 10,
        discountType: 'FIXED',
        expiryDate: 'Dec 31, 2025',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        color: 'teal'
    },
    {
        id: 'o3',
        code: 'PARISLOVER',
        title: 'Paris Special',
        description: '15% off all tours in Paris. Experience the city of lights.',
        discountAmount: 15,
        discountType: 'PERCENTAGE',
        expiryDate: 'Oct 15, 2025',
        minSpend: 100,
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        color: 'rose'
    }
];

// --- DASHBOARD MOCK DATA ---

export const MOCK_GUIDE_STATS = {
    totalEarnings: 12450,
    monthEarnings: 1850,
    totalTours: 142,
    rating: 4.9,
    upcomingTours: [
        { id: 't1', title: 'Hidden Jazz Bars', date: 'Oct 24, 2024', time: '19:00', guests: 4, earnings: 180 },
        { id: 't2', title: 'Ancient Rome Walk', date: 'Oct 26, 2024', time: '09:00', guests: 6, earnings: 330 },
        { id: 't3', title: 'Colosseum at Night', date: 'Oct 28, 2024', time: '20:30', guests: 2, earnings: 110 }
    ],
    recentReviews: [
        { id: 'r1', user: 'Sarah J.', rating: 5, comment: 'Elena was absolutely amazing! Best tour ever.', date: '2 days ago' },
        { id: 'r2', user: 'Mike T.', rating: 5, comment: 'Incredible knowledge and very friendly.', date: '5 days ago' }
    ]
};

export const MOCK_ADMIN_STATS = {
    totalUsers: 1250,
    totalBookings: 856,
    totalRevenue: 45200,
    activeGuides: 42,
    recentActivity: [
        { id: 'a1', type: 'USER_REGISTER', details: 'New user "John Doe" registered', time: '10 mins ago' },
        { id: 'a2', type: 'BOOKING_NEW', details: 'Booking #8823 confirmed ($120)', time: '45 mins ago' },
        { id: 'a3', type: 'GUIDE_VERIFY', details: 'Guide "Marco P." requested verification', time: '2 hours ago' }
    ]
};

export const MOCK_USER_BOOKINGS = [
    {
        id: 'b1',
        tour: MOCK_TOURS[0],
        date: '2024-10-15',
        status: 'UPCOMING',
        guests: 2,
        totalPrice: 90
    },
    {
        id: 'b2',
        tour: MOCK_TOURS[1],
        date: '2024-09-20',
        status: 'COMPLETED',
        guests: 1,
        totalPrice: 60
    },
    {
        id: 'b3',
        tour: MOCK_TOURS[2],
        date: '2024-08-05',
        status: 'COMPLETED',
        guests: 4,
        totalPrice: 220
    }
];
