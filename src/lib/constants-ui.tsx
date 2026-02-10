import type { ReactNode } from "react";
import {
  Wifi,
  Droplets,
  Car,
  UtensilsCrossed,
  WashingMachine,
  Snowflake,
  Flame,
  TreePine,
  Sun,
  PawPrint,
  Beef,
  Waves,
  Building2,
  Home,
  TreePalm,
  Mountain,
  Lamp,
  Warehouse,
  Hotel,
} from "lucide-react";
import { AMENITIES_DATA, PROPERTY_TYPES_DATA } from "./constants";

export type { ChipItemData } from "./constants";

const ICON_SIZE = 16;

export interface ChipItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const AMENITY_ICONS: Record<string, ReactNode> = {
  wifi: <Wifi size={ICON_SIZE} />,
  pool: <Droplets size={ICON_SIZE} />,
  parking: <Car size={ICON_SIZE} />,
  kitchen: <UtensilsCrossed size={ICON_SIZE} />,
  washer: <WashingMachine size={ICON_SIZE} />,
  ac: <Snowflake size={ICON_SIZE} />,
  heating: <Flame size={ICON_SIZE} />,
  garden: <TreePine size={ICON_SIZE} />,
  balcony: <Sun size={ICON_SIZE} />,
  pet_friendly: <PawPrint size={ICON_SIZE} />,
  bbq: <Beef size={ICON_SIZE} />,
  sea_view: <Waves size={ICON_SIZE} />,
};

const PROPERTY_ICONS: Record<string, ReactNode> = {
  apartment: <Building2 size={ICON_SIZE} />,
  house: <Home size={ICON_SIZE} />,
  villa: <TreePalm size={ICON_SIZE} />,
  cabin: <Mountain size={ICON_SIZE} />,
  studio: <Lamp size={ICON_SIZE} />,
  loft: <Warehouse size={ICON_SIZE} />,
  guesthouse: <Hotel size={ICON_SIZE} />,
};

export const AMENITIES: ChipItem[] = AMENITIES_DATA.map((a) => ({
  ...a,
  icon: AMENITY_ICONS[a.id],
}));

export const PROPERTY_TYPES: ChipItem[] = PROPERTY_TYPES_DATA.map((p) => ({
  ...p,
  icon: PROPERTY_ICONS[p.id],
}));
