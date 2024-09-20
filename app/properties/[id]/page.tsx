import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ShareButton from "@/components/properties/ShareButton";
import { fetchPropertyDetails } from "@/utils/actions"
import { redirect } from "next/navigation";

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests }
  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton propertyId={property.id} name={property.name} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
    </section>
  )
}
