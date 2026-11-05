import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceDecreaseSection from "@/components/PriceDecreaseSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 dark:bg-black">
            <Hero />
            <PriceIncreaseSection />
            <PriceDecreaseSection />
            <AllProducts />
        </div>
    );
}