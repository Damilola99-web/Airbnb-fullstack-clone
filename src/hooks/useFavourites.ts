"use client"
import { SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useLoginModalStore from './useLoginModal';
import { MouseEvent, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

interface IUseFavourites {
	listingId: string;
	currentUser?: SafeUser | null;
}

export const useFavourites = ({ listingId, currentUser }: IUseFavourites) => {
	const router = useRouter();
	const loginModal = useLoginModalStore();

	const hasFavourited = useMemo(() => {
		const list = currentUser?.favouriteIds || [];

		return list.includes(listingId);
	}, [listingId, currentUser]);

	const toggleFavourites = useCallback(
		async (e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;
				if (hasFavourited) {
					request = () => axios.delete(`/api/favourites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favourites/${listingId}`);
				}
				await request();
				router.refresh();
				toast.success('Success');
			} catch (error) {
				toast.error('Something went wrong');
			}
		},
		[currentUser, hasFavourited, listingId, loginModal, router]
	);

	return {
		hasFavourited,
		toggleFavourites,
	};
};
