'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import messages from '@/messages.json'
import Autoplay from "embla-carousel-autoplay"

const Home = () => {
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
  <section className="text-center mb-8 md:mb-12">
    <h1 className="text-3xl md:text-5xl font-bold">Dive into the world of Anonymous Conversation</h1>
    <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Mystery Message - Where your Identity remains a secret.</p>
  </section>

  <Carousel
    plugins={[Autoplay({ delay: 2000 })]}
    className="w-full"
  >
    <CarouselContent>
      {messages.map((message, index) => (
        <CarouselItem key={index}>
          <div className="p-2">
            <Card>
              <CardHeader className="text-lg md:text-xl font-semibold text-center">
                {message.title}
              </CardHeader>
              <CardContent className="flex aspect-[3/1] items-center justify-center p-2">
                <span className="text-xl md:text-2xl">{message.content}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</main>

    <footer className="text-center p-4 md:p-6">
     @ 2023 Mystery Message. All rights reversed
    </footer>
    </>
  )
}

export default Home
