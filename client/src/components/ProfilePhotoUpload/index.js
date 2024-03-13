import React, { useState, useEffect } from "react";
import { useUploadImageMutation } from "../../Api/UploadImage";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { Box } from "@mui/material";
import { useLazyGetImageQuery } from "../../Api/GetProfileImg";

const ProfilePhotoUpload = ({ onCreate }) => {
  //first extact the current logged in user
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const [uploadImage, setUploadImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [uploadProfile] = useUploadImageMutation();
  const [getImage] = useLazyGetImageQuery();

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
  // };

  useEffect(() => {
    // fetchProfileImage(userId);

    // getImageDatafromserver();
    getImageData(userId);
  }, [userId]);

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

  const getImageData = async (userId) => {
    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const res = await getImage(userId).unwrap();
   
      // Convert response to Blob
      const imageData = await res.blob();
   
      // Create URL for the blob data
      const imageUrl = URL.createObjectURL(imageData);
   
      console.log("Image URL>>>>>>>>>>>>>>:", imageUrl);
   
      setProfileImage(imageUrl);
    } catch (error) {
      handleError(error);
    }
  };
  const onFileChange = (e) => {
    console.log("files>>>>>>>>>>>>>>", e.target.files);
    setUploadImage(e.target.files[0]);
  };

  //   const handlePhoto = () => {
  //     console.log("sanjnajanjanjan");
  //     <FormControl type="file" name="file" playerholder="Upload profile picture" onChange={onFileChange} />;
  //   };

  const handlePhoto = () => {
    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "file";
    //   fileInput.onChange = onFileChange();
    fileInput.addEventListener("change", onFileChange);

    // Simulate a click on the file input
    fileInput.click();
    if (uploadImage) {
      // Check if uploadImage is not null
      const formData = new FormData();
      formData.append("photo", uploadImage);

      // Call the uploadImageMutation function with formData
      uploadProfile(formData)
        .then((res) => {
          console.log(res, "res>>>>>>>>>>>>>>>>");
          toast.success("Image uplaoded successfully");
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  console.log("profile image>>>>>>>>>>>>>", profileImage);
  return (
    <div className="container">
      <Form>
        {/* <FormGroup>
          <FormLabel>Picture</FormLabel>
          <FormControl type="file" name="file" playerholder="Upload profile picture" onChange={onFileChange} />
        </FormGroup> */}
        {/* <Button variant="btn btn-primary" type="submit">
          Add
        </Button> */}
      </Form>
      <Box
        component="img"
        src={profileImage}
        sx={{
          height: "200px",
          width: "200px",
          border: "1px solid black",
          borderRadius: "100px",
        }}
      ></Box>
      <div>
        <button
          onClick={() => {
            handlePhoto();
          }}
        >
          {user.photo ? "Edit Profile" : "Add Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
