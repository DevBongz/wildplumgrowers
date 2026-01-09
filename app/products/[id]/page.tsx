import { notFound } from "next/navigation"
import { getProductByHandle, getProducts } from "@/lib/shopify"
import { ProductClient } from "@/components/product/product-client"
import { Footer } from "@/components/footer"

export const revalidate = 3600 // Revalidate every hour

// Generate static params for known products
export async function generateStaticParams() {
  const products = await getProducts({ first: 50 })
  return products.map((product) => ({
    id: product.handle,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = await getProductByHandle(resolvedParams.id)

  if (!product) {
    notFound()
  }

  // Get related products (same type, excluding current)
  const allProducts = await getProducts({ first: 20 })
  const isAccessory = product.tags.some(t => 
    t.toLowerCase().includes('accessories') || t.toLowerCase().includes('spray')
  )
  
  const relatedProducts = allProducts
    .filter((p) => {
      if (p.handle === product.handle) return false
      const pIsAccessory = p.tags.some(t => 
        t.toLowerCase().includes('accessories') || t.toLowerCase().includes('spray')
      )
      return pIsAccessory === isAccessory
    })
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-charcoal pt-20">
      <ProductClient product={product} relatedProducts={relatedProducts} />
      <Footer />
    </div>
  )
}
