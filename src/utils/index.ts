import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBoatFishing, GiCactus, GiCastle, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';

export const categories = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is close to the beach',
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property has windmills',
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This property is modern',
	},
	{
		label: 'Country',
		icon: TbMountain,
		description: 'This property is in the countryside',
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'This property has a pool',
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'This property is on an island',
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is close to a lake',
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property has skiing activities',
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This property is in a castle',
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This property has camping activities',
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is on a desert',
	},
];