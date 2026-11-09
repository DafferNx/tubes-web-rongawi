import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent } from '@/shared/ui/SearchPrimitives';

function pickRecipes(recipes) {
  const pool = [...recipes];
  return Array.from({ length: Math.min(3, pool.length) }, () => {
    const index = Math.floor(Math.random() * pool.length);
    return pool.splice(index, 1)[0];
  });
}

export default function RecipeCarousel({ recipes, onSearch }) {
  const [slides] = useState(() => pickRecipes(recipes));
  const [autoplay] = useState(() => Autoplay({
    delay: 4500,
    stopOnFocusIn: false,
    playOnInit: false,
  }));
  const [viewport, api] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [interacting, setInteracting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!api) return;
    if (paused || interacting) autoplay.stop();
    else autoplay.play();
  }, [api, autoplay, interacting, paused]);

  useEffect(() => {
    if (!api) return;
    const updateIndex = () => setActiveIndex(api.selectedScrollSnap());
    api.on('select', updateIndex);
    return () => { api.off('select', updateIndex); };
  }, [api]);

  return (
    <section aria-label="Inspirasi masak" aria-roledescription="carousel" className="mt-5">
      {/* shadcn Carousel: Embla untuk geser slide. */}
      <div ref={viewport} className="overflow-hidden rounded-2xl"
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)} onBlur={() => setInteracting(false)}>
        <div className="flex touch-pan-y">
          {slides.map((recipe, index) => (
            <div key={recipe.id} inert={index !== activeIndex} className="min-w-0 flex-[0_0_100%]">
              {/* shadcn Card: foto dan ringkasan resep. */}
              <Card className="overflow-hidden sm:grid sm:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=800&h=450&q=80`}
                  alt="" className="aspect-[2/1] w-full object-cover sm:aspect-auto sm:h-52" />
                <CardContent className="flex flex-col justify-center sm:px-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-800">Inspirasi masak</p>
                  <h2 className="mt-2 font-serif text-3xl text-green-950">{recipe.name}</h2>
                  <p className="mt-1 text-sm text-stone-600">{recipe.category} · Resep dari {recipe.author}</p>
                  {/* shadcn Button: cari resep dari slide. */}
                  <Button className="mt-4 self-start" onClick={() => onSearch(recipe.name)}>Cari resep ini</Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {/* shadcn Button: kontrol carousel. */}
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button variant="ghost" aria-label="Resep sebelumnya" onClick={() => api?.scrollPrev()}>‹</Button>
        <Button variant="ghost" aria-label={paused ? 'Putar otomatis' : 'Jeda autoplay'}
          onClick={() => setPaused(!paused)}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d={paused ? 'M8 5v14l12-7Z' : 'M7 5h3v14H7zm7 0h3v14h-3z'} />
          </svg>
        </Button>
        <Button variant="ghost" aria-label="Resep berikutnya" onClick={() => api?.scrollNext()}>›</Button>
      </div>
    </section>
  );
}
