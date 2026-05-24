import type { DbLink, DbPage } from "@/lib/db/schema";
import LinkCard from "./LinkCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function LinksSection({
  links,
  page,
}: {
  links: DbLink[];
  page: DbPage;
}) {
  const layout = page.layout ?? "STACK";

  if (layout === "GRID") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} page={page} />
        ))}
      </div>
    );
  }
  if (layout === "CAROUSEL") {
    return (
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {links.map((link) => (
            <CarouselItem
              key={link.id}
              className="
              pl-2
              basis-[88%]
              md:basis-[70%]
            "
            >
              <LinkCard link={link} page={page} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
  // if (layout === "BENTO") {
  //   return (
  //     <div
  //       className="
  //       grid
  //       grid-cols-6
  //       auto-rows-[120px]
  //       gap-3
  //     "
  //     >
  //       {links.map((link, index) => {
  //         const variants = [
  //           "col-span-6 row-span-2", // hero
  //           "col-span-3 row-span-1",
  //           "col-span-3 row-span-1",
  //           "col-span-4 row-span-2",
  //           "col-span-2 row-span-1",
  //           "col-span-2 row-span-1",
  //           "col-span-6 row-span-1",
  //         ];
  //
  //         return (
  //           <div key={link.id} className={variants[index % variants.length]}>
  //             <LinkCard link={link} page={page} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  if (layout === "MINIMAL") {
    return (
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            className="
              block py-3
              border-b border-white/10
              hover:translate-x-2
              transition
            "
          >
            {link.label}
          </a>
        ))}
      </div>
    );
  }

  if (layout === "IMMERSIVE") {
    return (
      <div className="space-y-8">
        {links.map((link) => (
          <div key={link.id} className="min-h-[60vh]">
            <LinkCard link={link} page={page} />
          </div>
        ))}
      </div>
    );
  }

  // STACK (default)
  return (
    <div className="space-y-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} page={page} />
      ))}
    </div>
  );
}
