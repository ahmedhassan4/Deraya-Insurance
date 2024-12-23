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
import { IoCheckmarkCircleSharp, IoCloseCircle } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  console.log("slides", slides);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla mb-10">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item) => {
            return (
              <div className="embla__slide relative" key={item.id}>
                {item?.most_popular ? (
                  <div className="bg-[#BCC0C6] px-[14px] py-[4px] rounded-[4px] text-white text-center absolute top-0 right-0 font-poppins text-[10px]">
                    Most Popular
                  </div>
                ) : (
                  ""
                )}
                <Image
                  src={item.partner.logo}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="mt-3 w-28 "
                />
                <div className="mt-3">
                  <Text className="font-bold mb-2 text-lg">
                    {item.partner.name}
                  </Text>
                  <Text className="text-[#6B7280] text-sm">
                    {" "}
                    Starting from{" "}
                    <span className="font-bold"> ${item.price.amount}</span>
                  </Text>
                  <Text className="text-[#6B7280] text-sm">
                    {" "}
                    {item.details[0].title}
                  </Text>
                </div>
                <div className="mt-3">
                  <div className="mt-5">
                    {item.details.map((detail: any, detailIndex: number) => (
                      <div key={detailIndex}>
                        {detail.bullets.map(
                          (service: any, bulletIndex: number) => (
                            <div
                              key={bulletIndex}
                              className="flex items-start gap-2 mt-1 mb-3"
                            >
                              {service.is_included ? (
                                <IoCheckmarkCircleSharp
                                  color={"#B5BE34"}
                                  className="flex-0"
                                />
                              ) : (
                                <IoCloseCircle color="red" />
                              )}
                              <Text className="text-[#6B7280] text-sm flex-1">
                                {service.text}
                              </Text>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {item?.most_popular && item?.name === "Bupa" && (
                  <Link href="https://insurance.deraya.net/offers/1">
                    <Text className="flex items-center text-[#B5BE34] cursor-pointer hover:underline">
                      Get an instant quote
                      <BsArrowRight className="ms-2" color="#B5BE34" />
                    </Text>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {slides.length > 2 && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
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
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
