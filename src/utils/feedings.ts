import type {
  FeedingsResponse,
  FoodsResponse,
  ScheduleEntriesResponse,
  ScheduleEntryFeedingsResponse,
} from "../types/pocketbase";

export async function computePetScheduleFoodGivenPercentage(
  requiredFood: [string, number],
  givenFood: [string, number]
) {
  const [, requiredQuantity] = requiredFood;
  const [, givenQuantity] = givenFood;

  return (givenQuantity / requiredQuantity) * 100;
}

export async function getGivenFeedingsByPetId({
  feedings,
  scheduleEntryFeedings,
}: {
  feedings: FeedingsResponse<{ food: FoodsResponse }>[];
  scheduleEntryFeedings: ScheduleEntryFeedingsResponse<{
    schedule_entry: ScheduleEntriesResponse<{
      food: FoodsResponse;
    }>;
  }>[];
}) {
  return feedings
    .map((f) => ({
      food: f.expand?.food,
      quantity: f.quantity,
    }))
    .concat(
      scheduleEntryFeedings.map((sf) => ({
        food: sf.expand?.schedule_entry?.expand?.food,
        quantity: sf.expand?.schedule_entry?.quantity!,
      }))
    )
    .reduce((acc, feeding) => {
      const foodName = feeding.food?.name as string;
      const quantity = feeding.quantity;

      if (!acc[foodName]) acc[foodName] = 0;
      acc[foodName] += quantity;

      return acc;
    }, {} as Record<string, number>);
}
