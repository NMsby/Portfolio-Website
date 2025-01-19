export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    verificationLink: string;
    category: 'technical' | 'professional' | 'achievement';
    skills: string[];
    description?: string;
    status: 'completed' | 'in-progress' | 'expired';
    featured: boolean;
    dateAdded: string;
}

export interface FilterOptions {
    status?: 'completed' | 'in-progress' | 'expired' | 'all';
    featured?: boolean;
}