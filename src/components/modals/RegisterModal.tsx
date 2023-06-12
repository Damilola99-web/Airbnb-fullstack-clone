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
import { toast } from 'react-hot-toast';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import useLoginModalStore from '@/hooks/useLoginModal';

function RegisterModal() {
	const registerModal = userRegisterModalStore();
	const loginModal = useLoginModalStore();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

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
				toast.success('Account created successfully.');
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.message || 'Something went wrong.');
			});
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

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
			<Input
				id='name'
				label='Name'
				disabled={loading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				label='Password'
				disabled={loading}
				register={register}
				errors={errors}
				required
				type='password'
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onclick={() => {
					signIn('google');
				}}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onclick={() => {
					signIn('github');
				}}
			/>
			<div className=' text-neutral-500 justify-center mt-4 flex font-light'>
				<p>
					Already have an account?{' '}
					<span
						onClick={toggle}
						className='text-rose-500 hover:underline cursor-pointer font-semibold'
					>
						Log in
					</span>
				</p>
			</div>
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
			footer={footerContent}
		/>
	);
}

export default RegisterModal;
