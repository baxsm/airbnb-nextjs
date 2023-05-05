import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import { FC } from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";

interface ListingPageProps {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: ListingPageProps }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if(!listing) {
    return (
        <EmptyState />
    )
  }

  return (
    <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
  );
};

export default ListingPage;
