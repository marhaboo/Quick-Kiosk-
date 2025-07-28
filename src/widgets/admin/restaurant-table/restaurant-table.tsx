"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { putResRequest, delResRequest, getResRequest } from "@/app/entities/res-request/api/api";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useEffect } from "react";

function getStatusBadge(status: string) {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case "accepted":
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          Принято
        </span>
      );
    case "rejected":
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          Отклонено
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          В ожидании
        </span>
      );
  }
}

const RequestList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, error } = useSelector((state: RootState) => state.resRequest);

  useEffect(() => {
    dispatch(getResRequest());
  }, [dispatch,getResRequest]);

  return (
    <div className="space-y-4">
      {loading && <p className="text-white">Загрузка...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      {requests.map((restaurant, index) => (
        <div
          key={restaurant.id}
          className="p-6 hover:bg-gray-800/30 transition-all duration-300 animate-fade-in-up glass-effect"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{restaurant.name}</h3>
                  <p className="text-gray-400">{restaurant.ownerFullName}</p>
                  <p className="text-gray-500 text-sm">
                    {restaurant.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {getStatusBadge(restaurant.status)}

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() =>
                    dispatch(putResRequest({ id: restaurant.id, status: "Accepted" }))
                  }
                  className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 hover:scale-110 transition-all duration-300 glass-effect"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => dispatch(delResRequest(restaurant.id))}
                  className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-200"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
