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
import useLoginModalStore from '@/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LoginModal() {
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
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);
		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setLoading(false);

			if (callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className='flex flex-col gap-4 w-full'>
			<Heading
				title='Welcome back'
				subtitle='Login to your account'
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
					First time using Airbnb?{' '}
					<span
						onClick={toggle}
						className='text-rose-500 hover:underline cursor-pointer font-semibold'
					>
						Create an account
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={loading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}

export default LoginModal;
