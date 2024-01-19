/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	DietFeels = "diet_feels",
	DietFoods = "diet_foods",
	Diets = "diets",
	Feedings = "feedings",
	Foods = "foods",
	PetWeights = "pet_weights",
	Pets = "pets",
	ScheduleEntries = "schedule_entries",
	ScheduleEntryFeedings = "schedule_entry_feedings",
	Schedules = "schedules",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum DietFeelsFeelOptions {
	"hungry" = "hungry",
	"great" = "great",
}
export type DietFeelsRecord = {
	diet: RecordIdString
	feel: DietFeelsFeelOptions
}

export enum DietFoodsUnitOptions {
	"can" = "can",
	"grams" = "grams",
}
export type DietFoodsRecord = {
	diet: RecordIdString
	food: RecordIdString[]
	quantity: number
	unit: DietFoodsUnitOptions
}

export type DietsRecord = {
	is_active?: boolean
	pet: RecordIdString
	total_daily?: number
}

export type FeedingsRecord = {
	feeder: RecordIdString
	food: RecordIdString
	note?: string
	pet: RecordIdString
	quantity: number
	schedule_entry?: RecordIdString
}

export enum FoodsCategoryOptions {
	"wet" = "wet",
	"dry" = "dry",
}
export type FoodsRecord = {
	brand?: string
	calories?: number
	category: FoodsCategoryOptions
	name: string
}

export type PetWeightsRecord = {
	pet: RecordIdString
	weight?: number
}

export enum PetsAnimalTypeOptions {
	"cat" = "cat",
	"dog" = "dog",
	"bird" = "bird",
}
export type PetsRecord = {
	animal_type: PetsAnimalTypeOptions
	birthdate?: IsoDateString
	current_weight?: number
	name: string
	owner: RecordIdString[]
}

export enum ScheduleEntriesUnitOptions {
	"grams" = "grams",
	"can" = "can",
}
export type ScheduleEntriesRecord = {
	food: RecordIdString
	quantity: number
	schedule: RecordIdString
	time: IsoDateString
	unit: ScheduleEntriesUnitOptions
}

export type ScheduleEntryFeedingsRecord = {
	feeder: RecordIdString
	is_done?: boolean
	pet: RecordIdString
	schedule_entry: RecordIdString
	time?: IsoDateString
}

export type SchedulesRecord = {
	diet: RecordIdString
	is_active?: boolean
	note?: string
	pet: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type DietFeelsResponse<Texpand = unknown> = Required<DietFeelsRecord> & BaseSystemFields<Texpand>
export type DietFoodsResponse<Texpand = unknown> = Required<DietFoodsRecord> & BaseSystemFields<Texpand>
export type DietsResponse<Texpand = unknown> = Required<DietsRecord> & BaseSystemFields<Texpand>
export type FeedingsResponse<Texpand = unknown> = Required<FeedingsRecord> & BaseSystemFields<Texpand>
export type FoodsResponse<Texpand = unknown> = Required<FoodsRecord> & BaseSystemFields<Texpand>
export type PetWeightsResponse<Texpand = unknown> = Required<PetWeightsRecord> & BaseSystemFields<Texpand>
export type PetsResponse<Texpand = unknown> = Required<PetsRecord> & BaseSystemFields<Texpand>
export type ScheduleEntriesResponse<Texpand = unknown> = Required<ScheduleEntriesRecord> & BaseSystemFields<Texpand>
export type ScheduleEntryFeedingsResponse<Texpand = unknown> = Required<ScheduleEntryFeedingsRecord> & BaseSystemFields<Texpand>
export type SchedulesResponse<Texpand = unknown> = Required<SchedulesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	diet_feels: DietFeelsRecord
	diet_foods: DietFoodsRecord
	diets: DietsRecord
	feedings: FeedingsRecord
	foods: FoodsRecord
	pet_weights: PetWeightsRecord
	pets: PetsRecord
	schedule_entries: ScheduleEntriesRecord
	schedule_entry_feedings: ScheduleEntryFeedingsRecord
	schedules: SchedulesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	diet_feels: DietFeelsResponse
	diet_foods: DietFoodsResponse
	diets: DietsResponse
	feedings: FeedingsResponse
	foods: FoodsResponse
	pet_weights: PetWeightsResponse
	pets: PetsResponse
	schedule_entries: ScheduleEntriesResponse
	schedule_entry_feedings: ScheduleEntryFeedingsResponse
	schedules: SchedulesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'diet_feels'): RecordService<DietFeelsResponse>
	collection(idOrName: 'diet_foods'): RecordService<DietFoodsResponse>
	collection(idOrName: 'diets'): RecordService<DietsResponse>
	collection(idOrName: 'feedings'): RecordService<FeedingsResponse>
	collection(idOrName: 'foods'): RecordService<FoodsResponse>
	collection(idOrName: 'pet_weights'): RecordService<PetWeightsResponse>
	collection(idOrName: 'pets'): RecordService<PetsResponse>
	collection(idOrName: 'schedule_entries'): RecordService<ScheduleEntriesResponse>
	collection(idOrName: 'schedule_entry_feedings'): RecordService<ScheduleEntryFeedingsResponse>
	collection(idOrName: 'schedules'): RecordService<SchedulesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
