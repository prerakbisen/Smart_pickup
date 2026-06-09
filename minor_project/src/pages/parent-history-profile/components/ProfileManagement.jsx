import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    guardianName: "Dr. Rishank",
    email: "dr.rishank@email.com",
    phone_number: "+91 7418523659",
    address: "123 Oak Street, Hyderabad, India",
    emergencyContact: "+91 8541269740",
    emergencyName: "Rishank"
  });

  const [vehicles, setVehicles] = useState([
    { id: 1, number: "ABC-1234", isPrimary: true, make: "Toyota", model: "Camry", color: "Silver" },
    { id: 2, number: "XYZ-5678", isPrimary: false, make: "Honda", model: "Civic", color: "Blue" }
  ]);

  const [errors, setErrors] = useState({});

  const guardianPhoto = uploadedImage || "/public/assets/images/icons8-administrator-male-80.png";
  const guardianPhotoAlt = "Professional headshot of man with shoulder-length brown hair wearing navy blue blazer smiling warmly at camera";

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.guardianName?.trim()) {
      newErrors.guardianName = "Guardian name is required";
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData?.phone_number?.trim()) {
      newErrors.phone_number = "phone_number number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowConfirmDialog(true);
    }
  };

  const confirmSave = () => {
    // API integration point: Save profile data
    setIsEditing(false);
    setShowConfirmDialog(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
  };

  const handleImageUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      if (file?.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader?.result);
      };
      reader?.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const file = e?.dataTransfer?.files?.[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    handleImageUpload(file);
  };

  const setPrimaryVehicle = (vehicleId) => {
    setVehicles(prev => prev?.map(v => ({
      ...v,
      isPrimary: v?.id === vehicleId
    })));
  };

  const removeVehicle = (vehicleId) => {
    if (vehicles?.length === 1) {
      alert('You must have at least one vehicle registered');
      return;
    }
    if (window.confirm('Are you sure you want to remove this vehicle?')) {
      setVehicles(prev => prev?.filter(v => v?.id !== vehicleId));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Profile Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update your account information and vehicle details
            </p>
          </div>
          {!isEditing ? (
            <Button
              variant="default"
              iconName="Edit"
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-border shadow-elevated">
                  <Image
                    src={guardianPhoto}
                    alt={guardianPhotoAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef?.current?.click()}
                    className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-elevated hover:bg-primary/90 transition-colors"
                    aria-label="Change photo"
                  >
                    <Icon name="Camera" size={20} />
                  </button>
                )}
              </div>

              {isEditing && (
                <div className="w-full mt-6">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <Icon name="Upload" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
                    <p className="text-sm text-foreground font-medium mb-1">
                      Drop photo here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 5MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="guardianName"
                  type="text"
                  value={formData?.guardianName}
                  onChange={handleInputChange}
                  error={errors?.guardianName}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  error={errors?.email}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="phone_number Number"
                  name="phone_number"
                  type="tel"
                  value={formData?.phone_number}
                  onChange={handleInputChange}
                  error={errors?.phone_number}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="Home Address"
                  name="address"
                  type="text"
                  value={formData?.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Emergency Contact Name"
                  name="emergencyName"
                  type="text"
                  value={formData?.emergencyName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Emergency Contact phone_number"
                  name="emergencyContact"
                  type="tel"
                  value={formData?.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Registered Vehicles</h3>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => alert('Add vehicle functionality - API integration point')}
                  >
                    Add Vehicle
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {vehicles?.map((vehicle) => (
                  <div
                    key={vehicle?.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Car" size={24} color="var(--color-primary)" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground font-data">{vehicle?.number}</p>
                          {vehicle?.isPrimary && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {vehicle?.color} {vehicle?.make} {vehicle?.model}
                        </p>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        {!vehicle?.isPrimary && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPrimaryVehicle(vehicle?.id)}
                          >
                            Set Primary
                          </Button>
                        )}
                        <button
                          onClick={() => removeVehicle(vehicle?.id)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          aria-label="Remove vehicle"
                        >
                          <Icon name="Trash2" size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border shadow-elevated max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to save these changes to your profile? This will update your account information.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmSave}
              >
                Confirm Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;