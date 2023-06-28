import BestSelling from "@/components-home/BestSelling";
import Hero from "@/components-home/Hero";
import MonthlyBook from "@/components-home/MonthlyBook";
import NewRelease from "@/components-home/NewRelease";
import PopularBook from "@/components-home/PopularBook";
import { getBooksByCategory } from "@/lib-api";

export default async function Home() {
  const bestSellings = await getBooksByCategory("best-selling", 1, 10);
  const popularBooks = await getBooksByCategory("editor-choice", 1, 10);

  return (
    <>
      <Hero />
      <BestSelling bestSellings={bestSellings} />
      <MonthlyBook />
      <NewRelease />
      <PopularBook popularBooks={popularBooks} />
    </>
  );
}
