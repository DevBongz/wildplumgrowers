import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';

export async function GET() {
  // Log environment variables (masked for security)
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  console.log('Shopify Config:', {
    domain: domain ? `${domain.substring(0, 10)}...` : 'NOT SET',
    tokenPresent: !!token,
    tokenLength: token?.length || 0,
  });

  if (!domain || !token) {
    return NextResponse.json({
      success: false,
      error: 'Missing environment variables',
      config: {
        domainSet: !!domain,
        tokenSet: !!token,
      }
    }, { status: 500 });
  }

  try {
    const products = await getProducts({});
    return NextResponse.json({ 
      success: true, 
      productCount: products.length,
      products: products.slice(0, 3), // Show first 3 products
      message: products.length === 0 
        ? 'Connection successful! No products found in your Shopify store yet.'
        : `Found ${products.length} product(s)`
    });
  } catch (error: unknown) {
    console.error('Shopify API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : String(error),
    }, { status: 500 });
  }
}

