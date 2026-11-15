import SplitPayDemo from "@/components/demos/SplitPayDemo";
import PriceManagerDemo from "@/components/demos/PriceManagerDemo";
import AdvisioDemo from "@/components/demos/AdvisioDemo";

export default function ProductDemo({ slug }: { slug: string }) {
  switch (slug) {
    case "split-pay":
      return <SplitPayDemo />;
    case "wapf-price-manager":
      return <PriceManagerDemo />;
    case "advisio-ai":
      return <AdvisioDemo />;
    default:
      return null;
  }
}
