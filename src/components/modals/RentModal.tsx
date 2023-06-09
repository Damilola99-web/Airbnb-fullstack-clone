'use client';
import React, { useMemo, useState } from 'react';
import { Modal } from './Modal';
import useRentModal from '@/hooks/useRentModal';
import { Heading } from './Heading';
import { categories } from '@/utils';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import Map from '../Map';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

export default function RentModal() {
	const rentModal = useRentModal();

	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageUrl: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const category = watch('category');
	const location = watch('location');
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');

	const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const onBack = () => {
		if (step > 0) {
			setStep((value) => value - 1);
		}
	};
	const onNext = () => {
		if (step < 5) {
			setStep((value) => value + 1);
		}
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create';
		}
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return 'Back';
	}, [step]);

	let bodyContent = (
		<div className=' flex flex-col gap-8 w-full'>
			<Heading
				title='Which of these best describe your place?'
				subtitle='Pick a category'
			/>
			<div className=' grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
				{categories.map((item) => (
					<div
						key={item.label}
						className=' col-span-1'
					>
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							icon={item.icon}
							label={item.label}
							selected={category === item.label}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className=' flex flex-col gap-8 w-full'>
				<Heading
					title='Where is your place located?'
					subtitle='Help guests find you'
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue('location', value)}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className=' flex flex-col gap-8 w-full'>
				<Heading
					title='Share some basics about your place'
					subtitle='What amenities do you have?'
				/>
				<Counter
					value={guestCount}
					title='Guests'
					subtitle='How many guests do you allow?'
					onChange={(value) => setCustomValue('guestCount', value)}
				/>
				<hr />
				<Counter
					value={roomCount}
					title='Rooms'
					subtitle='How many rooms do you have?'
					onChange={(value) => setCustomValue('roomCount', value)}
				/>
				<hr />
				<Counter
					value={bathroomCount}
					title='Bathrooms'
					subtitle='How many bathrooms do you have?'
					onChange={(value) => setCustomValue('bathroomCount', value)}
				/>
			</div>
		);
	}
	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className=' flex flex-col gap-8 w-full'>
				<Heading
					title='Add a photo of your place'
					subtitle='Show guests what your place looks like!'
				/>
				<ImageUpload />
			</div>
		);
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={onBack}
			title='Airbnb your Home'
			body={bodyContent}
		/>
	);
}
