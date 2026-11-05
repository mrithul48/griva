"use client";
import { Star } from "lucide-react";

function Rating({rating,}: {rating: number;}) {
  return (
    <div className="mt-2 flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={`${
            star <= rating
              ? "fill-[#2563EB] text-[#2563EB]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default Rating;