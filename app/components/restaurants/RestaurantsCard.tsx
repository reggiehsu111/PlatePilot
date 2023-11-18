"use client";

import { SafeUser, SafeRestaurant } from "@/app/types";
import Image from "next/image";
import SaveButton from "../SaveButton";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Button from "../Button";
import Avatar from "../Avatar";
import { CardMode } from "@/app/types/constants";

interface RestaurantsCardProps {
  data: SafeRestaurant & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
  mode?: CardMode;
}

const RestaurantsCard: React.FC<RestaurantsCardProps> = ({
  data,
  currentUser,
  disabled,
  actionLabel,
  actionId = "",
  onAction,
  mode,
}) => {
  const isSold = mode === CardMode.SOLD;
  // Wrapper element for disabling link
  const WrapperElement = isSold ? "div" : "a";

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 w-full">
        <div className="relative">
          <WrapperElement
            href={isSold ? undefined : `/restaurants/${data.id}`}
            className="col-span-1 cursor-pointer group h-full"
            onClick={isSold ? (e) => e.preventDefault() : undefined}
          >
            <div className="flex items-start">
              <div className="w-5/6 font-bold text-lg">{data.name}</div>
            </div>
            <div className="text-neutral-500">{data.category}</div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row justify-start gap-1">
                <div className="flex font-bold text-yellow-600">★</div>
                <div className="flex">{data.stars}</div>
              </div>
            </div>
          </WrapperElement>
          <div className="absolute top-1 right-1">
            <SaveButton small itemId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex mt-auto">
        {(mode == CardMode.PROFILE_ALL ||
          mode == CardMode.PROFILE_RESERVED_SOLD) &&
          onAction &&
          actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
      </div>
    </div>
  );
};

export default RestaurantsCard;
