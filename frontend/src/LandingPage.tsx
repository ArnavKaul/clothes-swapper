import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import { Card } from "./components/ui/card"
import { useEffect, useCallback } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const productCards = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: `./images/img${i + 1}.jpg`,
  title: `Product ${i + 1}`
}));

const categories = [
  "Sporty",
  "Bohemian", // Added back based on previous discussion
  "Grunge",   // Added back based on previous discussion
  "Preppy",
  "Punk",
  "Streetwear",
  "Classic",
  "Casual"
];

const images = ['./images/banner1.jpg', './images/banner2.jpg']

export default function LandingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  // Ensure emblaApi is available before attempting to call its methods
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  // This useEffect isn't strictly necessary for basic button clicks,
  // but it's where you'd add listeners for carousel events or debugging
  useEffect(() => {
    if (emblaApi) {
      // Optional: Add a listener to log slide changes for debugging
      emblaApi.on('select', () => {
        console.log('Current slide index:', emblaApi.selectedScrollSnap())
      })
      // Optional: Clean up listener on unmount
      return () => {
        emblaApi.off('select', () => {
          console.log('Listener removed')
        })
      }
    }
  }, [emblaApi]) // Dependency array ensures it re-runs if emblaApi changes (rarely)

  return (
    <body className="bg-neutral-950 min-h-screen">
      <main className="max-w-screen-xl mx-auto space-y-10 p-8">

        <section className="flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-800">Clothes Swapper</div>
          <div className="flex gap-2">
            <Input placeholder="Search..." className="w-64 bg-pink-600 text-white" />
            <Button className="bg-pink-700 text-white hover:bg-pink-600">Search</Button>
          </div>
        </section>

       <section className="bg-neutral-950 p-6 rounded-xl">
  <div className="relative rounded-lg">
    {/* Carousel container with emblaRef */}
    <div className="overflow-hidden embla" ref={emblaRef}>
      <div className="flex embla__container">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="embla__slide flex-[0_0_100%] min-w-0"
          >
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>

    {/* LEFT ARROW (outside) */}
    {/* LEFT ARROW (pushed further left) */}
<button
  onClick={scrollPrev}
  className="absolute top-1/2 -left-20 -translate-y-1/2 transform bg-pink-800 p-3 rounded-full text-white z-10 hover:bg-pink-700"
  aria-label="Previous slide"
>
  <ChevronLeft size={20} />
</button>

{/* RIGHT ARROW (pushed further right) */}
<button
  onClick={scrollNext}
  className="absolute top-1/2 -right-20 -translate-y-1/2 transform bg-pink-800 p-3 rounded-full text-white z-10 hover:bg-pink-700"
  aria-label="Next slide"
>
  <ChevronRight size={20} />
</button>

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
          <h2 className="text-xl font-semibold text-pink-800 mb-4">Product Listings</h2>
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