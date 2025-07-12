import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import { Card } from "./components/ui/card"
import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"

const productCards = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: `./images/img${i + 1}.jpg`,
  title: `Product ${i + 1}`
}));

const categories = [
  "Sporty",

  "Preppy",
  "Punk",
  "Streetwear",
  "Classic",
  "Casual"
];
const images = ['/images/banner1.jpg', '/images/banner2.jpg']

export default function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      // Optional: autoplay or customize
    }
  }, [emblaApi])

export default function LandingPage() {
  return (
   
<body className="bg-neutral-950">
   <main className="max-w-screen-xl mx-auto space-y-10 ">
    
    <section className="flex justify-between items-center">
      <div className="text-2xl font-bold text-pink-800">Clothes Swapper</div>
      <div className="flex gap-2">
        <Input placeholder="Search..." className="w-64 bg-slate-800 text-white" />
        <Button className="bg-neutral-500 text-neutral-950 hover:bg-neutral-500">Search</Button>
      </div>
    </section>

     <div className="overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="flex">
        {images.map((src, idx) => (
          <div className="flex-[0_0_100%]" key={idx}>
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-4 text-pink-800">Categories</h2>
     <div className="grid grid-cols-3 gap-4">
  {categories.map((categoryName, index) => (
    <Card key={index} className="p-4 text-center bg-pink-800 text-white">
      {categoryName}
    </Card>
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
      <h2 className="text-xl font-semibold  text-pink-800 mb-4">Product Listings</h2>
      <div className="grid grid-cols-4 gap-6">
        {productCards.map((product) => (
          <Card key={product.id} className="p-4 text-center bg-neutral-950 text-pink-800">
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-2 h-32 object-contain"
            />
            <div className="text-sm font-medium">{product.title}</div>
          </Card>
        ))}
      </div>
    </section>

    <div className="flex justify-center gap-4">
      <Button variant="outline" className="bg-pink-800 text-white">Previous</Button>
      <Button variant="default" className="bg-pink-800 text-white">1</Button>
      <Button variant="outline" className="bg-pink-800 text-white">Next</Button>
    </div>
  </main>
  </body>

 
  )
}
