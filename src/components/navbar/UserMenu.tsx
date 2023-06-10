'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from './Avatar';
import { useCallback, useState } from 'react';
import { MenuItem } from './MenuItem';
import userRegisterModalStore from '@/hooks/useRegisterModal';
import useLoginModalStore from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import useRentModal from '@/hooks/useRentModal';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const registerModal = userRegisterModalStore();
	const loginModal = useLoginModalStore();
	const rentModal = useRentModal();

	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		return rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className=' relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={onRent}
					className=' hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className='p-4 md:py-2 md-px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
				>
					<AiOutlineMenu size={20} />
					{currentUser && (
						<div className='hidden md:block'>
							<Avatar src={currentUser?.image} />
						</div>
					)}
				</div>
			</div>
			{isOpen && (
				<div className=' absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? (
							<>
								<MenuItem
									label='My trips'
									onclick={() => {}}
								/>
								<MenuItem
									label='My favourites'
									onclick={() => {}}
								/>
								<MenuItem
									label='My reservations'
									onclick={() => {}}
								/>
								<MenuItem
									label='My properties'
									onclick={() => {}}
								/>
								<MenuItem
									label='Airbnb my home'
									onclick={rentModal.onOpen}
								/>
								<hr />
								<MenuItem
									label='Sign out'
									onclick={() => {
										signOut();
									}}
								/>
							</>
						) : (
							<>
								<MenuItem
									label='Login'
									onclick={() => {
										loginModal.onOpen();
									}}
								/>
								<MenuItem
									label='Sign up'
									onclick={() => {
										registerModal.onOpen();
									}}
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
