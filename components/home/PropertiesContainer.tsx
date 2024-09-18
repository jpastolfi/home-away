import { fetchProperties } from "@/utils/actions"
import EmptyList from "./EmptyList"
import PropertiesList from "./PropertiesList"
import { PropertyCardProps } from '../../utils/types';

export default async function PropertiesContainer({ category, search }: { category?: string, search?: string }) {
  const properties: PropertyCardProps[] = await fetchProperties({ category, search });
  if (properties.length === 0) {
    return (
      <EmptyList heading="No results" message="Try changing or removing some of your filters." btnText="clear filters" />
    )
  }

  return <PropertiesList properties={properties} />
}
