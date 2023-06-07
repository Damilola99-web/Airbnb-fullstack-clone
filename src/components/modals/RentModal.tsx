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
		<div className=' flex flex-col gap-8'>
			<Heading
				title='Which of these best describe your place?'
				subtitle='Pick a category'
			/>
			<div className=' grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto w-full'>
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
			<div className=' flex flex-col gap-8'>
				<Heading
					title='Where is your place located?'
					subtitle='Help guests find you'
				/>
				<CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
				<Map />
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