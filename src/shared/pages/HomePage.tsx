import { Image, Link } from "@nextui-org/react";

const images = [
  {
    src: "https://acdn.mitiendanube.com/stores/002/976/142/products/bokura2618-263e8504e9c19a0a8117261981106273-1024-1024.webp",
    alt: "T-shirts",
    href: "/categories/t-shirts",
  },
  {
    src: "https://acdn.mitiendanube.com/stores/002/976/142/products/bokura3437-11d7064039d7d15a1517262544221364-1024-1024.webp",
    alt: "Pants",
    href: "/categories/pants",
  },
  {
    src: "https://acdn.mitiendanube.com/stores/002/976/142/products/bokura4959-b67a738439b69beada17261962796026-1024-1024.webp",
    alt: "Outerwear",
    href: "/categories/outerwear",
  },
];

export function HomePage() {
  return (
    <section className="grid h-full max-h-full w-full grid-cols-12 gap-4 p-6 lg:h-screenMinusNavbar">
      {images.map((image, index) => (
        <article key={index} className={"col-span-12 lg:col-span-4"}>
          <Link href={image.href} className={"relative h-full w-full outline-0 hover:!opacity-100"}>
            <Image
              alt={image.alt}
              className={
                "h-full w-full rounded-none object-cover lg:!h-[calc(100dvh-(3rem+100px))]"
              }
              src={image.src}
              classNames={{
                wrapper: "!max-w-full w-full",
                img: "!duration-700 hover:scale-110 ease-linear",
              }}
              isZoomed={true}
            />
            <div
              className={
                "absolute bottom-1 z-10 flex h-16 w-full items-center rounded-bl-xl rounded-br-xl bg-primary/50 bg-gradient-to-r from-primary/70 via-primary/10 to-transparent p-4"
              }
            >
              <span className={"text-lg font-bold tracking-tight text-white"}>{image.alt}</span>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}
