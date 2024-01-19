import type {
  FoodsResponse,
  ScheduleEntriesResponse,
  ScheduleEntryFeedingsResponse,
  SchedulesResponse,
} from "../types/pocketbase";

export async function getRequiredScheduleFood(
  scheduleEntries: ScheduleEntriesResponse<{
    food: FoodsResponse;
    schedule: SchedulesResponse;
  }>[]
) {
  return scheduleEntries.reduce((acc, entry) => {
    const petId = entry.expand?.schedule?.pet as string;
    const foodName = entry.expand?.food?.name as string;
    const quantity = entry.quantity;

    if (!acc[petId]) acc[petId] = {};
    if (!acc[petId][foodName]) acc[petId][foodName] = 0;

    acc[petId][foodName] += quantity;

    return acc;
  }, {} as Record<string, Record<string, number>>);
}

export async function getGivenScheduleFood(
  scheduleEntryFeedings: ScheduleEntryFeedingsResponse<{
    schedule_entry: ScheduleEntriesResponse<{
      food: FoodsResponse;
      schedule: SchedulesResponse;
    }>;
  }>[]
) {
  return scheduleEntryFeedings
    .filter((sef) => sef.is_done)
    .reduce((acc, entry) => {
      const petId = entry.expand?.schedule_entry?.expand?.schedule
        ?.pet as string;
      const foodName = entry.expand?.schedule_entry?.expand?.food
        ?.name as string;
      const quantity = entry.expand?.schedule_entry?.quantity as number;

      if (!acc[petId]) acc[petId] = {};
      if (!acc[petId][foodName]) acc[petId][foodName] = 0;
      acc[petId][foodName] += quantity;

      return acc;
    }, {} as Record<string, Record<string, number>>);
}

export async function computePetScheduleFoodGivenPercentage(
  requiredFood: [string, number],
  givenFood: [string, number]
) {
  const [, requiredQuantity] = requiredFood;
  const [, givenQuantity] = givenFood;

  return (givenQuantity / requiredQuantity) * 100;
}
