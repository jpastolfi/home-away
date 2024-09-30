import AmenitiesInput from "@/components/form/AmenitiesInput";
import SubmitButton from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import ImageContainer from "@/components/properties/ImageContainer";
import { Input } from "@/components/ui/input";
import { fetchPropertyDetails, updatePropertyAction, updatePropertyImageAction } from "@/utils/actions"
import { Amenity } from "@/utils/amenities";
import { redirect } from "next/navigation";

export default async function EditRentalPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');
  const defaultAmenities: Amenity[] = JSON.parse(property.amenities);
  return (
    <section>
      <h1 className="text-2l capitalize mb-8 font-semibold">edit property</h1>
      <div className="border p-8 rouned-md">
        <ImageInputContainer text='Update Image' name={property.name} action={updatePropertyImageAction} image={property.image}>
          <Input type="hidden" name="id" value={property.id} />
        </ImageInputContainer>
        <FormContainer action={updatePropertyAction}>
          <input type="hidden" name="id" value={property.id} />
          <div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
            <FormInput name="name" type="text" label="Name (20 limit" defaultValue={property.name} />
            <FormInput name="tagline" type="text" label="Tagline (30 limit)" defaultValue={property.tagline} />
            <PriceInput defaultValue={property.price} />
            <CategoriesInput defaultValue={property.category} />
            <CountriesInput defaultValue={property.country} />
          </div>
          <TextAreaInput name="description" labelText="Description (10-100 words limit)" defaultValue={property.description} />
          <h3 className="text-lg mt-8 mb-4 font-medium">Accomodation Details</h3>
          <CounterInput title="Guests" defaultValue={property.guests} />
          <CounterInput title="Bedrooms" defaultValue={property.bedrooms} />
          <CounterInput title="Beds" defaultValue={property.beds} />
          <CounterInput title="Baths" defaultValue={property.baths} />
          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput defaultValue={defaultAmenities} />
          {/* {defaultAmenities.map((amenity) => {

          })} */}
          <SubmitButton text="edit property" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  )
}
