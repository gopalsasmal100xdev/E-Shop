/* eslint-disable react/prop-types */
import { SERVER_URL } from "../../constants/data";

const RegisterToast = ({ avatar, name }) => {
  return (
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-10 rounded-full"
            src={`${SERVER_URL}/${avatar}`}
            alt="RegisterUser"
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">Welcome {name}</p>
          <p className="mt-1 text-sm text-gray-500">
            Thank you for register our E-Shop
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterToast;
