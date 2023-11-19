"use client";

import { SafeItem, SafeUser, SafeRestaurant, SafeReview } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useState, useMemo, useCallback } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import Footer from "@/app/components/Footer";
import UpdateButton from "@/app/components/UpdateButton";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantReviews from "./RestaurantReviews";
import RestaurantResults from "./RestaurantResults";

import useLoginModal from "@/app/hooks/useLoginModal";
import useEditSellModal from "@/app/hooks/useEditSellModal";
import EditSellModal from "@/app/components/modals/EditSellModal";
import useSellModal from "@/app/hooks/useSellModal";
import useReserveModal from "@/app/hooks/useReserveModal";
import Image from "next/image";

import { v4 as uuidv4 } from "uuid";

interface RestaurantClientProps {
  reservations?: Reservation[];
  restaurant: SafeRestaurant;
  currentUser?: SafeUser | null;
}
const TABS = [
  "Service",
  "Food Quality",
  "Price",
  "Transportation",
  "Restaurant Environment & Hygiene",
];

interface RestaurantResultsProps {
  Positive: string[] | null;
  Negative: string[] | null;
  Score: number | null;
}

const RestaurantClient: React.FC<RestaurantClientProps> = ({
  reservations,
  restaurant,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const editSellModal = useEditSellModal();

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  const onEdit = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open the reserve confirm modal
    editSellModal.onOpen();
  }, [currentUser, loginModal, editSellModal]);

  const category = useMemo(() => {
    return categories.find(
      (restaurants) => restaurants.label === restaurant.category
    );
  }, [restaurant.category]);

  interface OpeningHours {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  }

  interface Review {
    id: number;
    text: string;
    restaurantId: string;
  }

  function formatOpeningHours(hours: any): OpeningHours {
    // Default opening hours
    const defaultHours = {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "Closed",
      Thursday: "Closed",
      Friday: "Closed",
      Saturday: "Closed",
      Sunday: "Closed",
    };

    if (typeof hours === "object" && hours !== null) {
      // Assume hours is an object with days as keys and string as values
      return {
        Monday: hours.Monday || defaultHours.Monday,
        Tuesday: hours.Tuesday || defaultHours.Tuesday,
        Wednesday: hours.Wednesday || defaultHours.Wednesday,
        Thursday: hours.Thursday || defaultHours.Thursday,
        Friday: hours.Friday || defaultHours.Friday,
        Saturday: hours.Saturday || defaultHours.Saturday,
        Sunday: hours.Sunday || defaultHours.Sunday,
      };
    }

    // If hours is not an object or is null, return default hours
    return defaultHours;
  }

  function formatReviews(reviews: any): Review[] | null {
    const restaurantId = uuidv4();
    if (
      Array.isArray(reviews) &&
      reviews.every(
        (review) =>
          typeof review === "object" && "id" in review && "text" in review
      )
    ) {
      return reviews.map((review) => ({
        id: review.id,
        text: review.text,
        restaurantId: restaurantId,
      }));
    }

    return null;
  }

  // Usage in your component
  const openingHours = formatOpeningHours(restaurant.hours);
  const formattedReviews = formatReviews(restaurant.reviews);
  const gmap = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
  const businessId = restaurant.business_id
  const default_image = '/images/restaurant_images/' + businessId + "/image.jpg";
  const parseComments = (
    type: string,
    restaurant: any
  ): RestaurantResultsProps => {
    if (!restaurant.results) {
      return {
        Positive: null,
        Negative: null,
        Score: null,
      };
    }
    const posComments = restaurant.results[type].Positive.map(
      (result: number) => restaurant.reviews[result - 1].text
    );
    const negComments = restaurant.results[type].Negative.map(
      (result: number) => restaurant.reviews[result - 1].text
    );
    return {
      Positive: posComments,
      Negative: negComments,
      Score: restaurant.results[type].Score,
    };
  };
  const serviceComments = parseComments("Service", restaurant);
  const hygieneComments = parseComments("Hygiene", restaurant);
  const tasteComments = parseComments("Taste", restaurant);
  const locationComments = parseComments("Location", restaurant);
  const priceComments = parseComments("Price", restaurant);

    return (
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col pt-10 gap-8">
            {/* Images */}
            <div className=" flex w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden rounded-2xl relative">
              <Image fill src={ default_image } alt={restaurant.name || ""} className="object-cover w-full" />
            </div>

            {/* Name and Map */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 ">
              <div className="col-span-6">
                <RestaurantInfo
                  isOpen={restaurant.is_open || 0}
                  name={restaurant.name ?? ""}
                  openingHours={openingHours}
                  address={
                    restaurant.address +
                    ", " +
                    restaurant.city +
                    ", " +
                    restaurant.state +
                    ", " +
                    restaurant.postal_code
                  }
                  categories={restaurant.categories}
                  stars={restaurant.stars || 0}
                />
              </div>

            {/* Google Maps - Colin */}
            <div className="col-span-6">
              <iframe
                width="100%"
                height="500"
                src={`https://www.google.com/maps/embed/v1/place?key=${gmap}&q=${restaurant.latitude},${restaurant.longitude}&zoom=18`}
              ></iframe>
            </div>
          </div>

          {/* Tabs for Reviews */}
          <div className="flex mb-4 justify-center">
            {TABS.map((tabName) => (
              <button
                key={tabName}
                onClick={() => handleTabClick(tabName)}
                className={`px-4 py-2 rounded-xl ${
                  activeTab === tabName ? "bg-gray-200" : ""
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-2">
              <div className="text-center text-lg">Positive</div>
              <div className="text-center text-lg">Negative</div>
            </div>
            <div className="flex-grow overflow-x-auto">
              {activeTab === "Service" && (
                <RestaurantResults {...serviceComments} />
              )}
              {activeTab === "Food Quality" && (
                <RestaurantResults {...tasteComments} />
              )}
              {activeTab === "Price" && (
                <RestaurantResults {...priceComments} />
              )}
              {activeTab === "Transportation" && (
                <RestaurantResults {...locationComments} />
              )}
              {activeTab === "Restaurant Environment & Hygiene" && (
                <RestaurantResults {...hygieneComments} />
              )}
            </div>
          </div>
          <div className="text-center text-lg">All Reviews</div>
          <div className="flex flex-col overflow-x-auto">
            <RestaurantReviews
              
              reviews={formattedReviews}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RestaurantClient;
