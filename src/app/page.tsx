import Image from "next/image";
import { Inter } from "next/font/google";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingParams } from "@/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "@/actions/getCurrentUser";
import { SafeListing } from "@/types";

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();

  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: SafeListing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
