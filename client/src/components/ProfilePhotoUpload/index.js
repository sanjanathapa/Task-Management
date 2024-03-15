import React, { useCallback, useEffect, useState } from "react";
import { useUploadImageMutation } from "../../Api/UploadImage";
import { FormControl } from "react-bootstrap";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { Box } from "@mui/material";
import { useLazyGetImageQuery } from "../../Api/GetProfileImg";

const ProfilePhotoUpload = () => {
  //first extact the current logged in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [profileImage, setProfileImage] = useState(null);

  const [uploadProfile] = useUploadImageMutation();
  const [getImage] = useLazyGetImageQuery();

  const onFileChange = (e) => {
    const file = e.target.files[0];

    handlePhoto(file);
  };

  const fetchImage = useCallback(async () => {
    try {
      const res = await getImage(user._id);

      setProfileImage(res.data.imageUrl);
    } catch (error) {
      console.log("error fetching image", error);
    }
  }, [getImage, user._id]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const handlePhoto = (uploadImage) => {
    if (uploadImage) {
      const formData = new FormData();
      formData.append("photo", uploadImage);

      uploadProfile(formData)
        .then((res) => {
          toast.success(res.data.message ?? "Image uplaoded successfully");
          fetchImage();
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  return (
    <div className="container">
      <Box
        component="img"
        src={profileImage}
        sx={{
          height: "200px",
          width: "200px",
          border: "1px solid black",
          borderRadius: "100px",
        }}
      />

      <label className="btn btn-primary">
        <FormControl
          type="file"
          name="file"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        {user.photo ? "Edit Profile" : "Add Profile"}
      </label>
    </div>
  );
};

export default ProfilePhotoUpload;

// const [getImage] = useLazyGetImageQuery();

// const fetchProfileImage = async (id) => {
//   try {
//     // Replace 'YOUR_TOKEN' with the actual token value
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1amp3YWxAZ21haWwuY29tIiwiaWF0IjoxNzEwMzE1NTE2LCJleHAiOjE3MTA0MDE5MTZ9.cJpOj-c-THAQOg6TfqDVf5CBdSm95vkUpbeCNh7U8jM";

//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);

//     const response = await fetch(`http://localhost:5000/api/v1/profile?id=${userId}`, {
//       method: "GET",
//       headers: headers,
//     });

//     const imageData = await response.blob();
//     const imageUrl = URL.createObjectURL(imageData);
//     console.log("Image URL:", imageUrl);
//     setProfileImage(imageUrl);
//   } catch (error) {
//     console.error("Error fetching profile image:", error);
//   }
// };\\

// const getImageData = async (userId) => {
//   console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   try {
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//     const res = await getImage(userId);
//     console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res);

//     // Check if the response is successful (status code 200)
//     if (res.status === 200) {
//       // Convert response data to Blob
//       const imageData = await res.blob();

//       // Create URL for the blob data
//       const imageUrl = URL.createObjectURL(imageData);

//       console.log("Image URL>>>>>>>>>>>>>>:", imageUrl);

//       // setProfileImage(imageUrl);
//     } else {
//       // Handle non-successful responses
//       console.error(`Failed to fetch image: ${res.status}`);
//     }
//   } catch (error) {
//     // Handle any errors that occur during the request
//     handleError(error);
//   }
// };

// useEffect(() => {
//   // fetchProfileImage(userId);

//   // getImageDatafromserver();
//   getImageData(userId);
// }, [userId, getImageData]);

// const getImageDatafromserver = () => {
//   if (user.photo) {
//     getImageData(id);
//     console.log(id, "Samfkdfksdfndfnjk");
//   }
// };
// const getImageData = (userId) => {
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   getImage(userId)
//     .unwrap()
//     .then((res) => {
//       const imageData = res.blob();
//       const imageUrl = URL.createObjectURL(imageData);
//       console.log("Image URL>>>>>>>>>>>>>>:", imageUrl);
//       setProfileImage(imageUrl);
//     })
//     .catch((error) => {
//       handleError(error);
//     });
// };
