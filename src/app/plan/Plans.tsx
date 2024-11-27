"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Text } from "rizzui";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src="/investment.svg"
                alt={item.title}
                width={20}
                height={20}
                className="mt-3 w-28 "
              />
              <div className="mt-3">
                <Text className="font-bold mb-2 text-lg">{item.title}</Text>
                <Text className="text-[#6B7280] text-sm">
                  {" "}
                  Starting from{" "}
                  <span className="font-bold"> ${item.pricing}</span>
                </Text>
                <Text className="text-[#6B7280] text-sm">
                  {" "}
                  Annual Ceiling of
                  <span className="font-bold"> ${item.annualCeiling}</span>
                </Text>
              </div>
              <div className="mt-3">
                <div className="mt-5">
                  {item.services.map((services: string[], index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 mt-1 mb-3"
                    >
                      <IoCheckmarkCircleSharp
                        color="#B5BE34"
                        className="flex-0"
                      />
                      <Text className=" text-[#6B7280] text-sm flex-1 ">
                        {services}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
