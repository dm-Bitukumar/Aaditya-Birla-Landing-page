import { Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";
import CustomSquareRadioWithIconV1 from "../../../../components/Form/CustomSquareRadioWIthIconV1";

const BusinessAddressBox = ({ data = {}, handleDataChange }) => {
  const defaultMessage = "Please enter address, unable to fetch right now.";
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [lastSavedAddress, setLastSavedAddress] = useState(defaultMessage);
  const [addressError, setAddressError] = useState("");
  const [selectedAddressType, setSelectedAddressType] = useState(
    data.address_type || ""
  );

  useEffect(() => {
    if (
      data.confirm_business_address &&
      data.confirm_business_address !== defaultMessage
    ) {
      setLastSavedAddress(data.confirm_business_address);
      setEditedAddress(data.confirm_business_address);
      handleDataChange(
        "confirm_business_address",
        data.confirm_business_address
      );
    }
  }, [data.confirm_business_address]);

  useEffect(() => {
    if (data.address_type) {
      setSelectedAddressType(data.address_type);
    }
  }, [data.address_type]);

  const handleEditClick = () => {
    setEditedAddress(lastSavedAddress);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editedAddress.trim();

    if (!trimmed || trimmed === defaultMessage) {
      setAddressError("Please enter a valid business address.");
      return;
    }

    setAddressError("");
    handleDataChange("confirm_business_address", trimmed);
    setLastSavedAddress(trimmed);
    setIsEditing(false);
  };

  return (
    <>
      <div>
        {/* Business Address Section */}
        <div
          className="mb-3 border p-3 rounded-md bg-white"
          style={{
            borderColor: "#000000",
            width: "340px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p className="text-xs font-normal text-gray-500 mb-1">
            Business Address
          </p>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedAddress}
                onChange={(e) => {
                  setEditedAddress(e.target.value);
                  if (
                    addressError &&
                    e.target.value.trim() !== defaultMessage &&
                    e.target.value.trim() !== ""
                  ) {
                    setAddressError("");
                  }
                }}
                className={`border rounded-md p-2 w-full text-sm ${
                  addressError ? "border-red-500" : ""
                }`}
                placeholder="Enter your business address"
              />
              {addressError && (
                <p className="text-red-500 text-xs mt-1">{addressError}</p>
              )}
            </>
          ) : (
            <p className="text-gray-600 text-xs font-semibold">
              {lastSavedAddress}
            </p>
          )}
        </div>

        {/* Edit Button Outside */}
        {!isEditing && (
          <div className="flex justify-start mt-2 ml-4">
            <button
              className="flex items-center gap-1 px-4 py-1 border rounded-full text-xs font-medium text-gray-800 hover:bg-gray-100 transition"
              onClick={handleEditClick}
            >
              <Pencil size={14} /> Edit Address
            </button>
          </div>
        )}

        {/* Save & Cancel Buttons (Only in Edit Mode) */}
        {isEditing && (
          <div className="flex justify-end mt-2">
            <button
              className="text-blue-500 text-xs font-medium mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-gray-500 text-xs font-medium"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <hr className="mt-3" />

      {/* Address Type (Using Simple Radio Buttons) */}
      <div className="mt-3">
        <p className="pl-4 text-sm font-semibold mb-1">
          Business Address Type <span className="text-red-500">*</span>
        </p>
        <div
          className="flex justify-start gap-3"
          style={{ width: "340px", margin: "0 auto" }}
        >
          {["Owned", "Rented"].map((option) => (
            <label
              key={option}
              className={`flex items-center rounded-md py-2 px-3 cursor-pointer transition`}
              onClick={() => {
                setSelectedAddressType(option);
                handleDataChange("address_type", option);
              }}
            >
              <input
                type="radio"
                name="address_type"
                value={option}
                checked={selectedAddressType === option}
                onChange={() => {}}
                style={{
                  accentColor: selectedAddressType === option ? "blue" : "gray",
                  transform: "scale(1.3)",
                }}
              />
              <span className="ml-2 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default BusinessAddressBox;
