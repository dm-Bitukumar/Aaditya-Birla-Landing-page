import React, { useState, useEffect } from "react";

const BusinessAddressBox = ({ data = {}, handleDataChange }) => {
  const defaultMessage = "Please enter address, unable to fetch right now.";
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [lastSavedAddress, setLastSavedAddress] = useState(defaultMessage);
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
      handleDataChange("confirm_business_address", data.confirm_business_address);
    }
  }, [data.confirm_business_address]);

  useEffect(() => {
    setSelectedAddressType(data.address_type || "");
  }, [data.address_type]);

  const handleEditClick = () => {
    setEditedAddress(lastSavedAddress);
    setIsEditing(true);
  };

  const handleSave = () => {
    const newAddress = editedAddress.trim() || defaultMessage;

    handleDataChange("confirm_business_address", newAddress);
    setLastSavedAddress(newAddress);
    setIsEditing(false);
  };

  return (
    <div className="mb-3 border p-3 rounded-lg bg-white shadow-md">
      <p className="font-semibold text-xs">Confirm Business Address</p>
      <p className="text-gray-500 text-[10px]">
        We have fetched the below address from your GST certificate, please
        confirm or edit.
      </p>

      {/* Business Address Section */}
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-gray-700">
            Current Business Address
          </p>
          {!isEditing && (
            <button
              className="text-blue-500 text-xs font-medium"
              onClick={handleEditClick}
            >
              Edit Address
            </button>
          )}
        </div>

        {/* Address Display / Edit Mode */}
        <div className="mt-1">
          {isEditing ? (
            <input
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              className="border rounded-md p-2 w-full text-sm"
              placeholder="Enter your business address"
            />
          ) : (
            <p className="text-gray-600 text-sm">{lastSavedAddress}</p>
          )}
        </div>

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

      {/* Address Type (Using Simple Radio Buttons) */}
      <div className="mt-3">
        <p className="text-xs font-semibold mb-1">Address Type</p>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="address_type"
              value="Owned"
              checked={selectedAddressType === "Owned"}
              onChange={(e) => {
                setSelectedAddressType(e.target.value);
                handleDataChange("address_type", e.target.value);
              }}
              className="form-radio text-blue-600"
            />
            <span className="text-xs">Owned</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="address_type"
              value="Rented"
              checked={selectedAddressType === "Rented"}
              onChange={(e) => {
                setSelectedAddressType(e.target.value);
                handleDataChange("address_type", e.target.value);
              }}
              className="form-radio text-blue-600"
            />
            <span className="text-xs">Rented</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BusinessAddressBox;
