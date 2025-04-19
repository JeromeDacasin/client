import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './EmblaCarousel.css';

const EmblaCarousel = ({ slides, autoplayInterval = 3000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    let timer = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayInterval);

    const stopAutoplay = () => clearInterval(timer);
    const restartAutoplay = () => {
      stopAutoplay();
      timer = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);
    };

    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('blur', restartAutoplay);
    emblaApi.on('dragEnd', restartAutoplay);
    emblaApi.on('scroll', restartAutoplay);

    return () => {
      stopAutoplay();
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('pointerDown', stopAutoplay);
        emblaApi.off('blur', restartAutoplay);
        emblaApi.off('dragEnd', restartAutoplay);
        emblaApi.off('scroll', restartAutoplay);
      }
    };
  }, [emblaApi, autoplayInterval, onSelect]);

  const DotButton = ({ selected, onClick }) => (
    <button
      className={`embla__dot ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
    ></button>
  );

  return (
    <div className="embla-wrapper"> {/* Added a wrapper for layout */}
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <img className="embla__slide__img" src={slide.image} alt={`Slide ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
          ))}
        </div>
      </div>
      {slides[selectedIndex]?.belowData && (
        <div className="embla__below-data">
          {slides[selectedIndex].belowData}
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;