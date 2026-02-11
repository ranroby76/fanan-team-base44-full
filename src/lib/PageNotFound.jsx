import React from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import DynamicPack from '@/pages/DynamicPack';
import ProductPage from '@/components/ProductPage';
import Layout from '@/Layout';


export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });

    // Check if URL matches a dynamic pack pattern (ends with "Pack") OR a product page_slug
    const { data: dynamicMatch, isLoading: dynamicLoading } = useQuery({
        queryKey: ['checkDynamicRoute', pageName],
        queryFn: async () => {
            // First check if it's a pack URL
            if (pageName.toLowerCase().endsWith('pack')) {
                const packSlug = pageName.replace(/Pack$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const allPacks = await base44.entities.PackPrice.list();
                
                const pack = allPacks.find(p => {
                    const normalizedPackName = p.pack_name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    return normalizedPackName === packSlug || 
                           normalizedPackName.includes(packSlug) ||
                           packSlug.includes(normalizedPackName);
                });
                if (pack) return { type: 'pack', data: pack };
            }
            
            // Then check if it's a product page_slug
            const products = await base44.entities.Product.filter({ page_slug: pageName.toLowerCase() });
            if (products && products.length > 0) {
                return { type: 'product', data: products[0] };
            }
            
            return null;
        },
        staleTime: 300000,
    });

    // If it's a valid dynamic route, render the appropriate component wrapped in Layout
    if (dynamicLoading) {
        return (
            <Layout currentPageName="Loading">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }
    
    if (dynamicMatch?.type === 'pack') {
        return (
            <Layout currentPageName="DynamicPack">
                <DynamicPack />
            </Layout>
        );
    }
    
    if (dynamicMatch?.type === 'product') {
        return (
            <Layout currentPageName="Product">
                <ProductPage slug={pageName.toLowerCase()} />
            </Layout>
        );
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    {/* 404 Error Code */}
                    <div className="space-y-2">
                        <h1 className="text-7xl font-light text-muted-foreground">404</h1>
                        <div className="h-0.5 w-16 bg-border mx-auto"></div>
                    </div>
                    
                    {/* Main Message */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-medium text-foreground">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The page <span className="font-medium text-foreground">"{pageName}"</span> could not be found in this application.
                        </p>
                    </div>
                    
                    {/* Admin Note */}
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>
                                <div className="text-left space-y-1">
                                    <p className="text-sm font-medium text-foreground">Admin Note</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        This could mean that the AI hasn't implemented this page yet. Ask it to implement it in the chat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary border border-primary rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}