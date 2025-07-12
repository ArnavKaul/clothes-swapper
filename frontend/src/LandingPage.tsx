import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import { Card } from "./components/ui/card"
// import Image from "next/image"

export default function LandingPage() {
  return (
    <main className="p-6 space-y-10">
  
      <section className="flex justify-between items-center">
        <div className="text-2xl font-bold">Clothes Swapper</div>
        <div className="flex gap-2">
          <Input placeholder="Search..." className="w-64" />
          <Button>Search</Button>
        </div>
      </section>

      
      <section className="bg-slate-800 p-6 rounded-xl">
        <div className="text-white text-center text-xl">Image Carousel / Banner here</div>
      </section>

      
      <section>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array(6).fill(null).map((_, i) => (
            <Card key={i} className="p-4 text-center">Category {i + 1}</Card>
          ))}
        </div>
      </section>

      
      <Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>

      
      <section>
        <h2 className="text-xl font-semibold mb-4">Product Listings</h2>
        <div className="grid grid-cols-4 gap-6">
          {Array(8).fill(null).map((_, i) => (
            <Card key={i} className="p-4 h-40 text-center">Product {i + 1}</Card>
          ))}
        </div>
      </section>

     
      <div className="flex justify-center">
       
        <Button variant="outline">Previous</Button>
        <Button variant="default" className="mx-2">1</Button>
        <Button variant="outline">Next</Button>
      </div>
    </main>
  )
}
