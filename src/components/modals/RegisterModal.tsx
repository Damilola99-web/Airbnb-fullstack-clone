'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useCallback, useState } from 'react';
import userRegisterModalStore from '@/hooks/useRegisterModal';
import { Modal } from './Modal';
import { Heading } from './Heading';
import { Input } from '../inputs/Input';

function RegisterModal() {
	const registerModal = userRegisterModalStore();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);
		axios
			.post('/api/auth/register', data)
			.then((res) => {
				setLoading(false);
				registerModal.onClose();
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const bodyContent = (
		<div className='flex flex-col gap-4 w-full'>
			<Heading
				title='Welcome to Airbnb'
				subtitle='Create an account'
			/>
			<Input
				id='email'
				label='Email'
				disabled={loading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	return (
		<Modal
			disabled={loading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
}

export default RegisterModal;
