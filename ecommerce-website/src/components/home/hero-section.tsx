import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

export function HeroSection() {
  const features = [
    {
      icon: Star,
      text: 'Premium Quality',
    },
    {
      icon: Shield,
      text: 'Secure Shopping',
    },
    {
      icon: Truck,
      text: 'Fast Delivery',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Premium
                <span className="text-primary block">Quality Products</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Shop the latest trends with confidence. Premium quality, 
                unbeatable prices, and exceptional service guaranteed.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/categories" className="btn-outline">
                Browse Categories
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-muted border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Join 10,000+ happy customers
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:h-[600px] animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl" />
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Premium shopping experience"
              fill
              className="object-cover rounded-3xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Floating Cards */}
            <div className="absolute top-8 right-8 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-sm">
                <div className="font-medium">Free Shipping</div>
                <div className="text-muted-foreground">On orders over $50</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}